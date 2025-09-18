import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Provider } from '@/types';
import { Check, X } from 'lucide-react';

type ProviderWithExtras = Provider & Record<string, any>;

interface ComparisonTableProps {
  providers: ProviderWithExtras[];
}

const yesNo = (value: boolean | undefined): ReactNode => {
  if (value) {
    return (
      <span className="inline-flex items-center text-green-700">
        <Check className="h-4 w-4 mr-1" /> Yes
      </span>
    );
  }

  return (
    <span className="inline-flex items-center text-gray-600">
      <X className="h-4 w-4 mr-1" /> No
    </span>
  );
};

const formatFunding = (provider: ProviderWithExtras): ReactNode => {
  if (!provider.funding) return 'No data';

  const options: string[] = [];
  if (provider.funding.aud_payid_bank) options.push('AUD bank transfer / PayID');
  if (provider.funding.aud_card_buy) options.push('AUD card purchases');
  if (provider.funding.nzd_bank_transfer) options.push('NZD bank transfer');
  if (provider.funding.nzd_card_buy) options.push('NZD card purchases');

  return options.length > 0 ? (
    <ul className="space-y-1 text-sm text-gray-700">
      {options.map(option => (
        <li key={option}>{option}</li>
      ))}
    </ul>
  ) : (
    <span className="text-gray-500">Not available</span>
  );
};

const formatFeatures = (provider: ProviderWithExtras): ReactNode => {
  const features: string[] = [];
  if (provider.smsf_support) features.push('SMSF support');
  if (provider.advanced_features) features.push('Advanced trading');
  if (provider.demo_mode) features.push('Demo access');

  return features.length > 0 ? (
    <ul className="space-y-1 text-sm text-gray-700">
      {features.map(feature => (
        <li key={feature}>{feature}</li>
      ))}
    </ul>
  ) : (
    <span className="text-gray-500">No special features listed</span>
  );
};

const formatPromos = (provider: ProviderWithExtras): ReactNode => {
  const promos = Array.isArray(provider.promos)
    ? provider.promos.filter((promo: any) => promo?.active)
    : [];

  if (promos.length === 0) {
    return <span className="text-gray-500">No active promotions</span>;
  }

  return (
    <ul className="space-y-1 text-sm text-gray-700">
      {promos.map((promo: any, index: number) => (
        <li key={`${promo.title ?? 'promo'}-${index}`}>
          <span className="font-medium text-gray-900">{promo.title}</span>
          {promo.description && <span className="block text-gray-600">{promo.description}</span>}
        </li>
      ))}
    </ul>
  );
};

const formatOrigin = (provider: ProviderWithExtras): string => {
  if (provider.exchange_origin === 'local') {
    if (provider.au_serving && provider.nz_serving) return 'Local (AU & NZ)';
    if (provider.au_serving) return 'Local (Australia)';
    if (provider.nz_serving) return 'Local (New Zealand)';
    return 'Local';
  }

  if (provider.exchange_origin === 'international') {
    return 'International';
  }

  return 'Not specified';
};

const formatPartnerStatus = (provider: ProviderWithExtras): ReactNode => {
  if (provider.partner) {
    return <Badge className="bg-purple-100 text-purple-700">Partner</Badge>;
  }

  if (provider.sponsored) {
    return <Badge className="bg-amber-100 text-amber-700">Sponsored</Badge>;
  }

  return <span className="text-gray-500">No partner relationship</span>;
};

const rows: { label: string; render: (provider: ProviderWithExtras) => ReactNode }[] = [
  {
    label: 'Coins supported',
    render: provider => (provider.coins_supported ? provider.coins_supported.toLocaleString() : 'Not specified'),
  },
  {
    label: 'Fee information',
    render: provider => provider.fee_info ?? 'Not specified',
  },
  {
    label: 'Available in Australia',
    render: provider => yesNo(provider.au_serving),
  },
  {
    label: 'Available in New Zealand',
    render: provider => yesNo(provider.nz_serving),
  },
  {
    label: 'Funding options',
    render: provider => formatFunding(provider),
  },
  {
    label: 'Key features',
    render: provider => formatFeatures(provider),
  },
  {
    label: 'Partner status',
    render: provider => formatPartnerStatus(provider),
  },
  {
    label: 'Promotions',
    render: provider => formatPromos(provider),
  },
  {
    label: 'Established',
    render: provider => (provider.established_year ? `Since ${provider.established_year}` : 'Not specified'),
  },
  {
    label: 'Origin',
    render: provider => formatOrigin(provider),
  },
];

export default function ComparisonTable({ providers }: ComparisonTableProps) {
  if (!providers || providers.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-48 px-4 py-3 text-left font-semibold text-gray-700">Criteria</th>
            {providers.map(provider => (
              <th key={provider.id} className="px-4 py-3 text-left font-semibold text-gray-900">
                <div className="space-y-2">
                  <div className="text-lg font-bold text-gray-900">{provider.name}</div>
                  <div className="flex flex-wrap gap-2">
                    {provider.partner && <Badge className="bg-purple-100 text-purple-700">Partner</Badge>}
                    {provider.sponsored && <Badge className="bg-amber-100 text-amber-700">Sponsored</Badge>}
                    {provider.custom_badge && (
                      <Badge className="bg-blue-100 text-blue-700">{provider.custom_badge}</Badge>
                    )}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map(row => (
            <tr key={row.label} className="align-top">
              <th className="px-4 py-3 text-left font-medium text-gray-700 w-48">{row.label}</th>
              {providers.map(provider => (
                <td key={`${provider.id}-${row.label}`} className="px-4 py-3 text-gray-900">
                  {row.render(provider)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

