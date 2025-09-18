import { QuizAnswers, Provider, MatchResult, ExcludedProvider } from '@/types';
import providersData from '@/data/providers.json';
import config from '@/data/config.json';

// Support both shapes:
// - legacy: providers.json is an array
// - new: { last_reviewed: string, providers: Provider[] }
const providersRaw: any = providersData as any;
const providers: Provider[] = Array.isArray(providersRaw)
  ? (providersRaw as Provider[])
  : ((providersRaw.providers as Provider[]) || []);

export function matchProviders(answers: QuizAnswers): MatchResult[] {
  const experienceConfig = config.experience_scoring[answers.experience_level];
  // Start with providers serving the selected currency
  const currencyFilter = answers.currency === 'aud' ? 'au_serving' : 'nz_serving';
  let eligibleProviders = providers.filter(provider => provider[currencyFilter as keyof Provider] as boolean);

  // Apply hard eligibility filters
  eligibleProviders = eligibleProviders.filter(provider => {
    // Currency-specific funding requirements
    if (answers.funding.includes('bank_transfer')) {
      const fundingField = answers.currency === 'aud' ? 'aud_payid_bank' : 'nzd_bank_transfer';
      if (!provider.funding[fundingField]) return false;
    }

    if (answers.funding.includes('card_buy')) {
      const fundingField = answers.currency === 'aud' ? 'aud_card_buy' : 'nzd_card_buy';
      if (!provider.funding[fundingField]) return false;
    }


    // No hard requirement for advanced features; score boosts handled later

    return true;
  });

  // Calculate scores and reasons
  const results: MatchResult[] = eligibleProviders.map(provider => {
    let score = 0;
    const reasons: string[] = [];

    // Currency support reasons
    if (answers.currency === 'aud' && provider.au_serving) {
      reasons.push('Serves Australian customers');
    }
    if (answers.currency === 'nzd' && provider.nz_serving) {
      reasons.push('Serves New Zealand customers');
    }

    // Funding method reasons
    if (answers.funding.includes('bank_transfer')) {
      const fundingField = answers.currency === 'aud' ? 'aud_payid_bank' : 'nzd_bank_transfer';
      if (provider.funding[fundingField]) {
        reasons.push(`Supports ${answers.currency.toUpperCase()} bank transfer`);
      }
    }

    if (answers.funding.includes('card_buy')) {
      const fundingField = answers.currency === 'aud' ? 'aud_card_buy' : 'nzd_card_buy';
      if (provider.funding[fundingField]) {
        reasons.push(`Supports ${answers.currency.toUpperCase()} card purchases`);
      }
    }


    // Priority-based scoring with experience-aware interpretation
    switch (answers.priority) {
      case 'coins':
        const coinsScore = provider.coins_supported / 100; // Normalize to reasonable range
        // Experience-based coin selection interpretation
        if (answers.experience_level === 'beginner') {
          // Beginners might get overwhelmed by too many options
          const cap = experienceConfig.coins_cap || 1.5;
          score += Math.min(coinsScore, cap);
          const sweetSpot = experienceConfig.coins_sweet_spot;
          if (sweetSpot && provider.coins_supported > sweetSpot.min && provider.coins_supported <= sweetSpot.max) {
            reasons.push('Good selection of major coins without overwhelming choices');
          }
        } else if (answers.experience_level === 'advanced') {
          // Advanced users benefit more from extensive selection
          const bonus = experienceConfig.coins_bonus || 1.2;
          score += coinsScore * bonus;
          if (provider.coins_supported > 200) {
            reasons.push('Extensive range of coins including altcoins');
          }
        } else {
          // Intermediate users
          score += coinsScore;
          if (provider.coins_supported > 100) {
            reasons.push('Wide range of coins available');
          }
        }
        break;
      case 'fees':
        const feeScore = getFeeScore(provider.fee_info);
        // Experience-based fee interpretation
        if (answers.experience_level === 'beginner') {
          // Beginners value simple, transparent fee structures
          score += feeScore;
          if (feeScore > 1.5) {
            reasons.push('Competitive and transparent fees');
          }
          // Strong penalty for complex platforms when fees are priority for beginners
          if (provider.advanced_features) {
            score -= 1;
          } else if (provider.ease_of_setup >= 4 && feeScore > 1.2) {
            reasons.push('Simple platform with good fees');
          } else if (provider.ease_of_setup >= 4) {
            reasons.push('Straightforward platform');
          }
        } else if (answers.experience_level === 'advanced') {
          // Advanced users might accept complexity for better fees
          const feeWeight = experienceConfig.fee_weight || 1.3;
          score += feeScore * feeWeight;
          if (feeScore > 1.5) {
            reasons.push('Excellent fee structure for active traders');
          }
        } else {
          // Intermediate users
          score += feeScore;
          if (feeScore > 1.5) {
            reasons.push('Competitive fee structure');
          }
          if (provider.advanced_features) {
            score -= 0.3; // Mild penalty for complexity
          }
        }
        break;
      case 'ease':
        const easeScore = provider.ease_of_setup;
        // Experience-based ease interpretation
        if (answers.experience_level === 'beginner') {
          // Ease is crucial for beginners
          const easeMultiplier = experienceConfig.ease_multiplier || 1.5;
          score += easeScore * easeMultiplier;
          if (easeScore >= 4) {
            reasons.push('User-friendly for beginners');
          }
          // Strong penalty for complexity
          if (provider.advanced_features) {
            const penalty = experienceConfig.complexity_penalty || 1.5;
            score -= penalty;
            reasons.push('Simplicity prioritized over complexity');
          }
        } else if (answers.experience_level === 'advanced') {
          // Advanced users still value ease but can handle complexity
          const easeMultiplier = experienceConfig.ease_multiplier || 0.8;
          score += easeScore * easeMultiplier;
          if (easeScore >= 4 && provider.advanced_features) {
            reasons.push('Complex interface with powerful features');
          }
        } else {
          // Intermediate users
          score += easeScore;
          if (easeScore >= 4) {
            reasons.push('Easy account setup');
          }
          if (provider.advanced_features) {
            score -= 0.5; // Moderate penalty for complexity
          }
        }
        break;
      case 'advanced':
        if (answers.experience_level === 'beginner') {
          // Beginners asking for advanced features - guide them carefully
          if (provider.advanced_features && provider.ease_of_setup >= 3) {
            score += 1; // Reduced score
            reasons.push('Advanced features with beginner-friendly design');
          } else if (!provider.advanced_features) {
            // Don't penalize simple platforms heavily for beginners
            score += 0.5;
            reasons.push('Simple platform to start with, room to grow');
          }
        } else if (answers.experience_level === 'advanced') {
          // Advanced users really benefit from advanced features
          if (provider.advanced_features) {
            const featuresBonus = experienceConfig.features_bonus || 3;
            score += featuresBonus;
            reasons.push('Professional-grade trading features');
          }
        } else {
          // Intermediate users
          if (provider.advanced_features) {
            score += 2;
            reasons.push('Advanced features available as you grow');
          }
        }
        break;
    }

    // General experience level adjustments (beyond priority-specific scoring)
    switch (answers.experience_level) {
      case 'beginner':
        // Additional boost for extremely easy platforms
        if (provider.ease_of_setup >= 4.5) {
          score += 0.5;
          // Only add reason if ease wasn't the priority (to avoid duplicate messages)
          if (answers.priority !== 'ease') {
            reasons.push('User-friendly for beginners');
          }
        }
        // Penalty for providers with poor setup scores
        if (provider.ease_of_setup < 3) {
          score -= 1;
        }
        break;
      case 'intermediate':
        // Boost for balanced platforms (good ease + some features)
        if (provider.ease_of_setup >= 3.5 && provider.advanced_features) {
          const balancedBonus = experienceConfig.balanced_bonus || 0.3;
          score += balancedBonus;
          reasons.push('Good balance of usability and features');
        }
        break;
      case 'advanced':
        // Boost for established platforms (advanced users value stability)
        const establishmentThreshold = experienceConfig.establishment_threshold || 2018;
        if (provider.established_year <= establishmentThreshold) {
          score += 0.2;
          reasons.push('Established and mature platform');
        }
        // Small penalty for overly simple platforms unless they have good features
        if (!provider.advanced_features && provider.ease_of_setup > 4.5) {
          score -= 0.2;
        }
        break;
    }

    // Additional contextual reasons based on experience + provider characteristics
    if (answers.experience_level === 'beginner') {
      // Warn beginners about complex platforms they might encounter
      if (provider.advanced_features && provider.ease_of_setup < 3.5) {
        reasons.push('Note: This is a more complex platform - consider starting simple');
      }
      // Highlight beginner-friendly aspects
      if (provider.ease_of_setup >= 4 && provider.coins_supported <= 100) {
        reasons.push('Great starting point with essential coins');
      }
    } else if (answers.experience_level === 'intermediate') {
      // Help intermediate users understand growth potential
      if (provider.advanced_features && provider.ease_of_setup >= 3) {
        reasons.push('Room to grow as your trading skills develop');
      }
    } else if (answers.experience_level === 'advanced') {
      // Highlight sophisticated features for advanced users
      if (provider.advanced_features && provider.coins_supported > 150) {
        reasons.push('Comprehensive platform for serious traders');
      }
      if (!provider.advanced_features) {
        reasons.push('Simple platform - may lack advanced trading tools');
      }
    }

    // Note: Do not add reasons for features that didn't contribute to filtering or scoring

    return {
      provider,
      score,
      reasons,
      isTopMatch: false, // Will be set later
    };
  });

  // Sort by score (descending), then by tie-breakers
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;

    // Tie-breaker 1: More funding capabilities (currency-specific)
    const fundingKeys =
      answers.currency === 'aud'
        ? ['aud_payid_bank', 'aud_card_buy']
        : ['nzd_bank_transfer', 'nzd_card_buy'];
    const aFundingCount = fundingKeys.filter(
      (k) => (a.provider.funding as any)[k]
    ).length;
    const bFundingCount = fundingKeys.filter(
      (k) => (b.provider.funding as any)[k]
    ).length;
    if (bFundingCount !== aFundingCount) return bFundingCount - aFundingCount;

    // Tie-breaker 2: Experience-appropriate platform complexity
    if (answers.experience_level === 'beginner') {
      // Beginners: prefer simpler platforms
      if (a.provider.advanced_features !== b.provider.advanced_features) {
        return a.provider.advanced_features ? 1 : -1; // non-advanced first
      }
      // Then by ease of setup (higher first)
      if (a.provider.ease_of_setup !== b.provider.ease_of_setup) {
        return b.provider.ease_of_setup - a.provider.ease_of_setup;
      }
    } else if (answers.experience_level === 'advanced') {
      // Advanced users: prefer feature-rich platforms
      if (a.provider.advanced_features !== b.provider.advanced_features) {
        return b.provider.advanced_features ? -1 : 1; // advanced first
      }
      // Then by establishment (older first for stability)
      if (a.provider.established_year !== b.provider.established_year) {
        return a.provider.established_year - b.provider.established_year;
      }
    } else {
      // Intermediate: balanced approach - ease matters but features are good
      if (a.provider.ease_of_setup !== b.provider.ease_of_setup) {
        return b.provider.ease_of_setup - a.provider.ease_of_setup;
      }
    }

    // Tie-breaker 3: Priority-specific preferences
    if (answers.priority === 'ease') {
      // Already handled in experience-level logic above, but add coins as secondary
      if (a.provider.coins_supported !== b.provider.coins_supported) {
        return a.provider.coins_supported - b.provider.coins_supported; // fewer coins for ease
      }
    }

    if (answers.priority === 'advanced') {
      // Already handled in experience-level logic above
    }

    if (answers.priority === 'coins') {
      if (a.provider.coins_supported !== b.provider.coins_supported) {
        return b.provider.coins_supported - a.provider.coins_supported; // more coins first
      }
    }


    // Tie-breaker 5: Alphabetical
    return a.provider.name.localeCompare(b.provider.name);
  });

  // Mark top matches
  results.forEach((result, index) => {
    result.isTopMatch = index < config.ui.top_n;
  });

  return results;
}

function extractBasePercent(text: string): number | undefined {
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

function mapBasePercentToScore(base: number): number {
  // Higher score = better fees
  if (base <= 0.10) return 2.0;
  if (base <= 0.25) return 1.6;
  if (base <= 0.40) return 1.5;
  if (base <= 0.50) return 1.4;
  if (base <= 0.60) return 1.2;
  if (base <= 0.85) return 1.05;
  if (base <= 1.00) return 1.0;
  return 0.8;
}

function getFeeScore(feeInfo: string): number {
  const base = extractBasePercent(feeInfo);
  if (base !== undefined) return mapBasePercentToScore(base);
  // Fallback heuristic
  if (feeInfo.includes('0.02%') || feeInfo.includes('0.1%')) return 2;
  if (feeInfo.includes('0.5%')) return 1.5;
  if (feeInfo.includes('0.6%')) return 1.2;
  if (feeInfo.includes('1%')) return 1;
  return 0.5;
}

export function getProviderById(id: string): Provider | undefined {
  return providers.find(provider => provider.id === id);
}

export function getAllProviders(): Provider[] {
  return providers;
}

export function explainNonMatches(answers: QuizAnswers): ExcludedProvider[] {
  const excluded: ExcludedProvider[] = [];
  const servesCurrencyKey = answers.currency === 'aud' ? 'au_serving' : 'nz_serving';

  for (const provider of providers) {
    const reasons: string[] = [];

    // Currency availability
    if (!provider[servesCurrencyKey as keyof Provider]) {
      reasons.push(
        answers.currency === 'aud'
          ? "Doesn't serve Australian customers"
          : "Doesn't serve New Zealand customers"
      );
    }

    // Funding requirements
    if (answers.funding.includes('bank_transfer')) {
      const fundingField = answers.currency === 'aud' ? 'aud_payid_bank' : 'nzd_bank_transfer';
      if (!provider.funding[fundingField]) {
        reasons.push(
          answers.currency === 'aud'
            ? 'No AUD bank transfer/PayID'
            : 'No NZD bank transfer'
        );
      }
    }

    if (answers.funding.includes('card_buy')) {
      const fundingField = answers.currency === 'aud' ? 'aud_card_buy' : 'nzd_card_buy';
      if (!provider.funding[fundingField]) {
        reasons.push(
          answers.currency === 'aud'
            ? 'No AUD card purchases'
            : 'No NZD card purchases'
        );
      }
    }


    // No advanced features requirement (informational only, no exclusion)

    // If any reasons present, this provider would be excluded
    // Note: providers that pass all checks are included by matchProviders
    if (reasons.length > 0) {
      excluded.push({ provider, reasons });
    }
  }

  return excluded;
}
