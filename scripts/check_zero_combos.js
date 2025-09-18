const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('data/providers.json', 'utf-8'));
const providers = Array.isArray(raw) ? raw : raw.providers;
const config = JSON.parse(fs.readFileSync('data/config.json', 'utf-8'));

const currencies = config.questions.find(q => q.id === 'currency').options.map(o => o.value);
const accountTypes = config.questions.find(q => q.id === 'account_type').options.map(o => o.value);
const fundingOptions = config.questions.find(q => q.id === 'funding').options.map(o => o.value);
const priorities = config.questions.find(q => q.id === 'priority').options.map(o => o.value);
const wantsDemo = config.questions.find(q => q.id === 'wants_demo').options.map(o => o.value);

function getFundingField(currency, type) {
  if (type === 'bank_transfer') return currency === 'aud' ? 'aud_payid_bank' : 'nzd_bank_transfer';
  if (type === 'card_buy') return currency === 'aud' ? 'aud_card_buy' : 'nzd_card_buy';
  return null;
}

function matches(provider, answers) {
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

  // No hard requirement for advanced features; only used for scoring
  
  return true;
}

function powerSet(arr) {
  const res = [];
  const n = arr.length;
  for (let mask = 1; mask < (1 << n); mask++) {
    const subset = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) subset.push(arr[i]);
    }
    res.push(subset);
  }
  return res;
}

const nonEmptyFundingCombos = powerSet(fundingOptions);

const zeroCombos = [];
let total = 0;

for (const currency of currencies) {
  for (const account_type of accountTypes) {
    for (const funding of nonEmptyFundingCombos) {
      for (const priority of priorities) {
        for (const wants_demo of wantsDemo) {
          const answers = { currency, account_type, funding, priority, wants_demo };
          total++;
          const eligible = providers.filter(p => matches(p, answers));
          if (eligible.length === 0) {
            zeroCombos.push(answers);
          }
        }
      }
    }
  }
}

console.log(JSON.stringify({ totalCombos: total, zeroCount: zeroCombos.length, zeroCombos }, null, 2));
