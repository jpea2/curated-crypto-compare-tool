'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import ProviderCard from './ProviderCard';
import { Provider } from '@/types';
import Link from 'next/link';

interface ResultsListProps {
  providers: Provider[];
  region?: 'au' | 'nz';
}

export default function ResultsList({ providers, region }: ResultsListProps) {
  const [sortBy, setSortBy] = useState<'name' | 'coins' | 'fees' | 'established'>('name');
  const [showFilters, setShowFilters] = useState(true);

  // Filter states
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [selectedDepositMethods, setSelectedDepositMethods] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Filter and sort providers
  const filteredAndSortedProviders = useMemo(() => {
    let filtered = [...providers];

    // Apply currency filters
    if (selectedCurrencies.length > 0) {
      filtered = filtered.filter(provider => {
        return selectedCurrencies.some(currency => {
          if (currency === 'aud') return provider.au_serving;
          if (currency === 'nzd') return provider.nz_serving;
          return false;
        });
      });
    }

    // Apply deposit method filters
    if (selectedDepositMethods.length > 0) {
      filtered = filtered.filter(provider => {
        return selectedDepositMethods.some(method => {
          return provider.funding[method as keyof typeof provider.funding];
        });
      });
    }

    // Apply feature filters
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(provider => {
        return selectedFeatures.every(feature => {
          if (feature === 'smsf') return provider.smsf_support;
          if (feature === 'advanced') return provider.advanced_features;
          if (feature === 'demo') return provider.demo_mode;
          return false;
        });
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'coins':
        return filtered.sort((a, b) => b.coins_supported - a.coins_supported);
      case 'established':
        return filtered.sort((a, b) => a.established_year - b.established_year);
      case 'fees':
        return filtered.sort((a, b) => a.name.localeCompare(b.name)); // Simple fallback
      default:
        return filtered;
    }
  }, [providers, selectedCurrencies, selectedDepositMethods, selectedFeatures, sortBy]);

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCurrencies([]);
    setSelectedDepositMethods([]);
    setSelectedFeatures([]);
  };

  // Check if any filters are active
  const hasActiveFilters = selectedCurrencies.length > 0 || selectedDepositMethods.length > 0 || selectedFeatures.length > 0;

  return (
    <div className="space-y-8">
      {/* Comparison Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md border-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            {filteredAndSortedProviders.length} of {providers.length} Crypto Exchange{providers.length !== 1 ? 's' : ''}
            {region && ` in ${region === 'au' ? 'Australia' : 'New Zealand'}`}
          </h2>

          <div className="flex flex-wrap gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="coins">Sort by Coins Supported</option>
              <option value="established">Sort by Established Date</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={hasActiveFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : ''}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && <span className="ml-1">({selectedCurrencies.length + selectedDepositMethods.length + selectedFeatures.length})</span>}
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid md:grid-cols-3 gap-6">

              {/* Currency Filter */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Currency</h4>
                <div className="space-y-2">
                  {[
                    { id: 'aud', label: 'Australian Dollar (AUD)', count: providers.filter(p => p.au_serving).length },
                    { id: 'nzd', label: 'New Zealand Dollar (NZD)', count: providers.filter(p => p.nz_serving).length }
                  ].map((currency) => (
                    <div key={currency.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={currency.id}
                        checked={selectedCurrencies.includes(currency.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCurrencies([...selectedCurrencies, currency.id]);
                          } else {
                            setSelectedCurrencies(selectedCurrencies.filter(c => c !== currency.id));
                          }
                        }}
                      />
                      <label htmlFor={currency.id} className="text-sm text-gray-700 cursor-pointer flex-1">
                        {currency.label} ({currency.count})
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deposit Methods Filter */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Deposit Methods</h4>
                <div className="space-y-2">
                  {[
                    { id: 'aud_payid_bank', label: 'AUD Bank Transfer/PayID', count: providers.filter(p => p.funding.aud_payid_bank).length },
                    { id: 'aud_card_buy', label: 'AUD Card Purchase', count: providers.filter(p => p.funding.aud_card_buy).length },
                    { id: 'nzd_bank_transfer', label: 'NZD Bank Transfer', count: providers.filter(p => p.funding.nzd_bank_transfer).length },
                    { id: 'nzd_card_buy', label: 'NZD Card Purchase', count: providers.filter(p => p.funding.nzd_card_buy).length }
                  ].map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={method.id}
                        checked={selectedDepositMethods.includes(method.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedDepositMethods([...selectedDepositMethods, method.id]);
                          } else {
                            setSelectedDepositMethods(selectedDepositMethods.filter(m => m !== method.id));
                          }
                        }}
                      />
                      <label htmlFor={method.id} className="text-sm text-gray-700 cursor-pointer flex-1">
                        {method.label} ({method.count})
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Filter */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                <div className="space-y-2">
                  {[
                    { id: 'smsf', label: 'SMSF Support', count: providers.filter(p => p.smsf_support).length },
                    { id: 'advanced', label: 'Advanced Features', count: providers.filter(p => p.advanced_features).length },
                    { id: 'demo', label: 'Demo Mode', count: providers.filter(p => p.demo_mode).length }
                  ].map((feature) => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature.id}
                        checked={selectedFeatures.includes(feature.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedFeatures([...selectedFeatures, feature.id]);
                          } else {
                            setSelectedFeatures(selectedFeatures.filter(f => f !== feature.id));
                          }
                        }}
                      />
                      <label htmlFor={feature.id} className="text-sm text-gray-700 cursor-pointer flex-1">
                        {feature.label} ({feature.count})
                      </label>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Exchange Grid */}
      {filteredAndSortedProviders.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProviders.map(provider => (
            <ProviderCard
              key={provider.id}
              result={{ provider, score: 0, reasons: [], isTopMatch: false }}
              showReasons={false}
              isTopMatch={false}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {hasActiveFilters ? 'No Exchanges Match Your Filters' : 'No Exchanges Found'}
          </h3>
          <p className="text-gray-600 mb-6">
            {hasActiveFilters
              ? 'Try adjusting your filter selections to see more exchanges.'
              : 'No exchanges are currently available for the selected region.'
            }
          </p>
          {hasActiveFilters ? (
            <Button onClick={clearAllFilters}>
              <X className="w-4 h-4 mr-2" />
              Clear All Filters
            </Button>
          ) : (
            <Button asChild>
              <Link href="/how-we-compare">
                Learn More About Our Comparison Criteria
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
