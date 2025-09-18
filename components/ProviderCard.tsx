'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Shield, Users, Check, Gift, Coins } from 'lucide-react';
import { MatchResult } from '@/types';
import Link from 'next/link';

interface ProviderCardProps {
  result: MatchResult;
  showReasons?: boolean;
  isTopMatch?: boolean;
}

export default function ProviderCard({ result, showReasons = false, isTopMatch = false }: ProviderCardProps) {
  const { provider } = result;

  const getCurrencyBadges = () => {
    const badges = [];
    if (provider.au_serving) badges.push('AUD');
    if (provider.nz_serving) badges.push('NZD');
    return badges;
  };

  const getFeatureBadges = () => {
    const badges = [];
    if (provider.advanced_features) badges.push('Advanced');
    return badges;
  };

  const getPartnerBadges = () => {
    const badges = [];
    if (provider.partner) badges.push('Partner');
    if (provider.sponsored) badges.push('Sponsored');
    return badges;
  };

  return (
    <Card className={`h-full transition-all duration-200 hover:shadow-lg border-0 shadow-md ${
      isTopMatch ? 'ring-2 ring-blue-500 bg-blue-50/30' : 'bg-white/80'
    } backdrop-blur-sm`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{provider.name}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {/* Currency Support */}
              {getCurrencyBadges().map(currency => (
                <Badge key={currency} variant="secondary" className="bg-blue-100 text-blue-800">
                  {currency}
                </Badge>
              ))}
              
              {/* Feature Badges */}
              {getFeatureBadges().map(feature => (
                <Badge key={feature} variant="secondary" className="bg-green-100 text-green-800">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="mt-2 mb-2 text-right">
              <p className="text-sm font-bold text-gray-900">
                {provider.coins_supported}+ coins
              </p>
              <p className="text-xs text-gray-600">available to trade</p>
            </div>
            {provider.custom_badge && (
              <Badge className="bg-blue-600 text-white">
                <Check className="w-3 h-3 mr-1" />
                {provider.custom_badge}
              </Badge>
            )}
            
          </div>
        </div>

        {/* Partner/Revenue Badges */}
        <div className="flex flex-wrap gap-2">
          {getPartnerBadges().map(badge => (
            <Badge key={badge} variant="outline" className="border-purple-300 text-purple-700">
              {badge}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status warnings removed */}

        {/* Fee Information */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 flex items-center">
            <Shield className="h-4 w-4 mr-2 text-gray-600" />
            Fee Structure
          </h4>
          <p className="text-sm text-gray-600 pl-6">{provider.fee_info}</p>
        </div>

        {/* Funding Methods */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 flex items-center">
            <Users className="h-4 w-4 mr-2 text-gray-600" />
            Funding Options
          </h4>
          <div className="pl-6 space-y-1">
            {provider.funding.aud_payid_bank && (
              <p className="text-sm text-gray-600">• AUD bank transfer/PayID</p>
            )}
            {provider.funding.aud_card_buy && (
              <p className="text-sm text-gray-600">• AUD card purchases</p>
            )}
            {provider.funding.nzd_bank_transfer && (
              <p className="text-sm text-gray-600">• NZD bank transfer</p>
            )}
            {provider.funding.nzd_card_buy && (
              <p className="text-sm text-gray-600">• NZD card purchases</p>
            )}
          </div>
        </div>

        {/* Promos */}
        {provider.promos && provider.promos.length > 0 && (
          <div className="space-y-2">
            {provider.promos
              .filter(promo => promo.active)
              .map((promo, index) => (
                <div key={index} className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Gift className="h-4 w-4 text-green-600" />
                    {promo.type === 'signup_bonus' && promo.title.toLowerCase().includes('bitcoin') && (
                      <Coins className="h-4 w-4 text-orange-500" />
                    )}
                    <h4 className="text-sm font-semibold text-green-800">{promo.title}</h4>
                  </div>
                  <p className="text-xs text-green-700 mb-1">{promo.description}</p>
                  {promo.terms && (
                    <p className="text-xs text-green-600 italic">{promo.terms}</p>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="pt-4">
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <Link href={`/go/${provider.affiliate_id}`} target="_blank" rel="noopener noreferrer">
              Visit {provider.name}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Established Year */}
        <p className="text-sm font-medium text-gray-700 text-center">
          Established {provider.established_year}
        </p>
      </CardContent>
    </Card>
  );
}
