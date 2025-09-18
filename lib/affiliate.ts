import providersData from '@/data/providers.json';

export function getAffiliateUrl(affiliateId: string): string | null {
  const affiliateUrls: Record<string, string | undefined> = {
    independent_reserve: process.env.AFFILIATE_INDEPENDENT_RESERVE,
    coinspot: process.env.AFFILIATE_COINSPOT,
    coinstash: process.env.AFFILIATE_COINSTASH,
  };

  return affiliateUrls[affiliateId] || null;
}

export function isPartner(provider: { partner: boolean }): boolean {
  return provider.partner;
}

export function getPartnerList(): string[] {
  const raw: any = providersData as any;
  const providers = Array.isArray(raw) ? raw : raw.providers;
  if (!Array.isArray(providers)) return [];
  return providers
    .filter((p: any) => p.partner)
    .map((p: any) => p.name)
    .sort();
}
