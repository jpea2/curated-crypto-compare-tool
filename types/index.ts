export interface QuizAnswers {
  currency: 'aud' | 'nzd';
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  funding: string[];
  priority: 'fees' | 'ease' | 'coins' | 'advanced';
}

export interface Provider {
  id: string;
  affiliate_id: string;
  name: string;
  au_serving: boolean;
  nz_serving: boolean;
  funding: {
    aud_payid_bank: boolean;
    aud_card_buy: boolean;
    nzd_bank_transfer: boolean;
    nzd_card_buy: boolean;
  };
  smsf_support: boolean;
  advanced_features: boolean;
  demo_mode: boolean;
  fee_info: string;
  partner: boolean;
  sponsored: boolean;
  promos: Promo[];
  coins_supported: number;
  ease_of_setup: number;
  established_year: number;
  custom_badge?: string;
}

export interface Promo {
  type: string;
  description: string;
  conditions: string[];
}

export interface MatchResult {
  provider: Provider;
  score: number;
  reasons: string[];
  isTopMatch: boolean;
}

export interface ExcludedProvider {
  provider: Provider;
  reasons: string[];
}

export interface Question {
  id: string;
  title: string;
  type: 'single' | 'multiple';
  required: boolean;
  options: {
    value: string;
    label: string;
  }[];
}
