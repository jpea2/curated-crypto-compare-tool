const fs = require('fs');

// Load data
const raw = JSON.parse(fs.readFileSync('data/providers.json', 'utf-8'));
const providers = Array.isArray(raw) ? raw : raw.providers;
const lastReviewed = Array.isArray(raw) ? undefined : raw.last_reviewed;
const config = JSON.parse(fs.readFileSync('data/config.json', 'utf-8'));

// Extract options from config
const currencies = config.questions.find((q) => q.id === 'currency').options.map((o) => o.value);
const accountTypes = config.questions.find((q) => q.id === 'account_type').options.map((o) => o.value);
const fundingOptions = config.questions.find((q) => q.id === 'funding').options.map((o) => o.value);
const priorities = config.questions.find((q) => q.id === 'priority').options.map((o) => o.value);
const wantsDemo = config.questions.find((q) => q.id === 'wants_demo').options.map((o) => o.value);
const TOP_N = (config.ui && config.ui.top_n) || 3;

function getFundingField(currency, type) {
  if (type === 'bank_transfer') return currency === 'aud' ? 'aud_payid_bank' : 'nzd_bank_transfer';
  if (type === 'card_buy') return currency === 'aud' ? 'aud_card_buy' : 'nzd_card_buy';
  return null;
}

function matchesHardFilters(provider, answers) {
  // Region
  if (answers.currency === 'aud' && !provider.au_serving) return false;
  if (answers.currency === 'nzd' && !provider.nz_serving) return false;

  // Funding hard filters
  if (answers.funding.includes('bank_transfer')) {
    const field = getFundingField(answers.currency, 'bank_transfer');
    if (!provider.funding || provider.funding[field] !== true) return false;
  }
  if (answers.funding.includes('card_buy')) {
    const field = getFundingField(answers.currency, 'card_buy');
    if (!provider.funding || provider.funding[field] !== true) return false;
  }

  // SMSF requirement
  if (answers.account_type === 'smsf' && provider.smsf_support !== true) return false;

  return true;
}

function extractBasePercent(text) {
  if (!text) return undefined;
  const lower = text.toLowerCase();
  const takerIdx = lower.indexOf('taker');
  if (takerIdx >= 0) {
    const slice = text.slice(takerIdx);
    const m = slice.match(/(\d+(?:\.\d+)?)%/);
    if (m) return parseFloat(m[1]);
  }
  const m2 = text.match(/(\d+(?:\.\d+)?)%/);
  if (m2) return parseFloat(m2[1]);
  return undefined;
}

function mapBasePercentToScore(base) {
  if (base <= 0.10) return 2.0;
  if (base <= 0.25) return 1.6;
  if (base <= 0.40) return 1.5;
  if (base <= 0.50) return 1.4;
  if (base <= 0.60) return 1.2;
  if (base <= 0.85) return 1.05;
  if (base <= 1.00) return 1.0;
  return 0.8;
}

function getFeeScore(feeInfo) {
  const base = extractBasePercent(feeInfo);
  if (base !== undefined) return mapBasePercentToScore(base);
  // Fallback heuristic to stay resilient
  if (feeInfo.includes('0.02%') || feeInfo.includes('0.1%')) return 2;
  if (feeInfo.includes('0.5%')) return 1.5;
  if (feeInfo.includes('0.6%')) return 1.2;
  if (feeInfo.includes('1%')) return 1;
  return 0.5;
}

function scoreAndSort(eligible, answers) {
  const results = eligible.map((provider) => {
    let score = 0;

    switch (answers.priority) {
      case 'coins':
        score += provider.coins_supported / 100;
        break;
      case 'fees':
        score += getFeeScore(provider.fee_info);
        if (provider.advanced_features) score -= 0.5; // stronger simplicity bias when fees-focused
        break;
      case 'ease':
        score += provider.ease_of_setup || 0;
        if (provider.advanced_features) {
          // Penalize complexity when user wants easy setup
          score -= 1;
        }
        break;
      case 'advanced':
        if (provider.advanced_features) score += 2;
        break;
    }

    if (answers.wants_demo === 'yes' && provider.demo_mode) score += 1;

    return { provider, score };
  });

  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;

    // Funding capability count
    const fundingKeys =
      answers.currency === 'aud'
        ? ['aud_payid_bank', 'aud_card_buy']
        : ['nzd_bank_transfer', 'nzd_card_buy'];
    const aFunding = fundingKeys.filter((k) => (a.provider.funding || {})[k]).length;
    const bFunding = fundingKeys.filter((k) => (b.provider.funding || {})[k]).length;
    if (bFunding !== aFunding) return bFunding - aFunding;

    // If ease is priority, prefer non-advanced
    if (answers.priority === 'ease') {
      if (a.provider.advanced_features !== b.provider.advanced_features) {
        return a.provider.advanced_features ? 1 : -1;
      }
    }

    // If advanced is priority, prefer advanced
    if (answers.priority === 'advanced') {
      if (a.provider.advanced_features !== b.provider.advanced_features) {
        return b.provider.advanced_features ? 1 : -1;
      }
    }

    // If wants demo, prefer demo
    if (answers.wants_demo === 'yes') {
      if (a.provider.demo_mode !== b.provider.demo_mode) {
        return b.provider.demo_mode ? 1 : -1;
      }
    }

    return a.provider.name.localeCompare(b.provider.name);
  });

  return results;
}

function powerSetNonEmpty(arr) {
  const res = [];
  const n = arr.length;
  for (let mask = 1; mask < 1 << n; mask++) {
    const subset = [];
    for (let i = 0; i < n; i++) if (mask & (1 << i)) subset.push(arr[i]);
    res.push(subset);
  }
  return res;
}

const fundingCombos = powerSetNonEmpty(fundingOptions);

const providerStats = new Map();
for (const p of providers) {
  providerStats.set(p.id, {
    name: p.name,
    appearances: 0,
    topN: 0,
    top1: 0,
    ranks: [],
    byPriority: {},
  });
}

let totalCombos = 0;
let zeroCombos = 0;
const zeroExamples = [];

for (const currency of currencies) {
  for (const account_type of accountTypes) {
    for (const funding of fundingCombos) {
      for (const priority of priorities) {
        for (const demo of wantsDemo) {
          const answers = { currency, account_type, funding, priority, wants_demo: demo };
          totalCombos++;
          const eligible = providers.filter((p) => matchesHardFilters(p, answers));
          if (eligible.length === 0) {
            zeroCombos++;
            if (zeroExamples.length < 5) zeroExamples.push(answers);
            continue;
          }

          const ranked = scoreAndSort(eligible, answers);

          ranked.forEach((r, idx) => {
            const stats = providerStats.get(r.provider.id);
            stats.appearances += 1;
            stats.ranks.push(idx + 1);
            if (idx === 0) stats.top1 += 1;
            if (idx < TOP_N) stats.topN += 1;
            stats.byPriority[priority] = (stats.byPriority[priority] || 0) + 1;
          });
        }
      }
    }
  }
}

function avg(arr) {
  if (!arr.length) return 0;
  return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);
}

// Build Markdown
let md = '';
md += '# Match Coverage Report\n\n';
md += `- Total answer combinations evaluated: ${totalCombos}\n`;
md += `- Combinations with zero eligible providers: ${zeroCombos}\n`;
md += `- Top N considered: ${TOP_N}\n\n`;
if (lastReviewed) {
  md += `- Data last reviewed: ${lastReviewed}\n\n`;
}

if (zeroExamples.length) {
  md += '## Example zero-result combinations (first 5)\n';
  zeroExamples.forEach((ex, i) => {
    md += `- ${i + 1}. ${JSON.stringify(ex)}\n`;
  });
  md += '\n';
}

md += '## Provider Appearance Summary\n\n';
md += '| Provider | Appearances | Top 1 | Top N | Avg Rank | Coins | Ease | Fees | Advanced |\n';
md += '|---|---:|---:|---:|---:|---:|---:|---:|---:|\n';
for (const [id, s] of providerStats.entries()) {
  const row = [
    s.name,
    s.appearances,
    s.top1,
    s.topN,
    avg(s.ranks),
    s.byPriority['coins'] || 0,
    s.byPriority['ease'] || 0,
    s.byPriority['fees'] || 0,
    s.byPriority['advanced'] || 0,
  ];
  md += `| ${row[0]} | ${row[1]} | ${row[2]} | ${row[3]} | ${row[4]} | ${row[5]} | ${row[6]} | ${row[7]} | ${row[8]} |\n`;
}

md += '\nGenerated by scripts/generate_match_report.js\n';

// Ensure report directory exists
if (!fs.existsSync('report')) fs.mkdirSync('report');
fs.writeFileSync('report/match_coverage.md', md);

console.log('Report written to report/match_coverage.md');

// Also write a small spot-check with representative combos
const samples = [
  { name: 'AU • Personal • Bank • Ease • No demo', a: { currency:'aud', account_type:'individual', funding:['bank_transfer'], priority:'ease', wants_demo:'no' } },
  { name: 'AU • Personal • Bank • Fees • No demo', a: { currency:'aud', account_type:'individual', funding:['bank_transfer'], priority:'fees', wants_demo:'no' } },
  { name: 'AU • Personal • Bank+Card • Fees • No demo', a: { currency:'aud', account_type:'individual', funding:['bank_transfer','card_buy'], priority:'fees', wants_demo:'no' } },
  { name: 'AU • SMSF • Bank • Ease • No demo', a: { currency:'aud', account_type:'smsf', funding:['bank_transfer'], priority:'ease', wants_demo:'no' } },
  { name: 'NZ • Personal • Bank • Ease • No demo', a: { currency:'nzd', account_type:'individual', funding:['bank_transfer'], priority:'ease', wants_demo:'no' } },
  { name: 'AU • Personal • Card • Coins • No demo', a: { currency:'aud', account_type:'individual', funding:['card_buy'], priority:'coins', wants_demo:'no' } },
];

let md2 = '# Spot-check Results (Top 3)\n\n';
for (const s of samples) {
  const eligible = providers.filter((p) => matchesHardFilters(p, s.a));
  const ranked = scoreAndSort(eligible, s.a).slice(0, 3);
  md2 += `## ${s.name}\n`;
  if (ranked.length === 0) {
    md2 += '- No eligible providers\n\n';
    continue;
  }
  ranked.forEach((r, i) => {
    md2 += `- ${i + 1}. ${r.provider.name}\n`;
  });
  md2 += '\n';
}

fs.writeFileSync('report/spot_checks.md', md2);
console.log('Spot-checks written to report/spot_checks.md');
