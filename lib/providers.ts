import { Provider } from '@/types';
import providersData from '@/data/providers.json';

// Support both shapes:
// - legacy: providers.json is an array
// - new: { last_reviewed: string, providers: Provider[] }
const providersRaw: any = providersData as any;
const providers: Provider[] = Array.isArray(providersRaw)
  ? (providersRaw as Provider[])
  : ((providersRaw.providers as Provider[]) || []);

export function getProviderById(id: string): Provider | undefined {
  return providers.find(provider => provider.id === id);
}

export function getAllProviders(): Provider[] {
  return providers;
}

export function getProvidersByRegion(region: 'au' | 'nz'): Provider[] {
  const regionField = region === 'au' ? 'au_serving' : 'nz_serving';
  return providers.filter(provider => provider[regionField as keyof Provider] as boolean);
}

export function filterProviders(filters: {
  region?: 'au' | 'nz';
  funding?: string[];
  features?: string[];
}): Provider[] {
  let filtered = providers;

  // Filter by region
  if (filters.region) {
    const regionField = filters.region === 'au' ? 'au_serving' : 'nz_serving';
    filtered = filtered.filter(provider => provider[regionField as keyof Provider] as boolean);
  }

  // Filter by funding methods
  if (filters.funding && filters.funding.length > 0) {
    filtered = filtered.filter(provider => {
      return filters.funding!.some(fundingMethod => {
        const fundingField = getFundingField(fundingMethod, filters.region || 'au');
        return provider.funding[fundingField];
      });
    });
  }

  // Filter by features
  if (filters.features && filters.features.length > 0) {
    filtered = filtered.filter(provider => {
      if (filters.features!.includes('smsf') && !provider.smsf_support) return false;
      if (filters.features!.includes('advanced') && !provider.advanced_features) return false;
      if (filters.features!.includes('demo') && !provider.demo_mode) return false;
      return true;
    });
  }

  return filtered;
}

function getFundingField(fundingMethod: string, region: 'au' | 'nz'): string {
  if (fundingMethod === 'bank_transfer') {
    return region === 'au' ? 'aud_payid_bank' : 'nzd_bank_transfer';
  }
  if (fundingMethod === 'card_buy') {
    return region === 'au' ? 'aud_card_buy' : 'nzd_card_buy';
  }
  return '';
}