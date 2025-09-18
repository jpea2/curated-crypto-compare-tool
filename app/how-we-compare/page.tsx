import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, Filter, Scale, Info } from 'lucide-react';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import providersData from '@/data/providers.json';

export const metadata: Metadata = {
  title: 'How We Compare | Criteria & Transparency',
  description:
    'How our comparison works for AU/NZ crypto exchanges: criteria, filters, data sources, and transparency commitments.',
};

export default function HowWeComparePage() {
  const meta: any = providersData as any;
  const lastReviewed: string | undefined = Array.isArray(meta) ? undefined : meta.last_reviewed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>
              <div className="h-6 w-px bg-gray-300 hidden md:block" />
            </div>
            <Link
              href="/"
              className="flex items-center space-x-2 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
            >
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">CuratedCryptoInsights</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How We Compare</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our approach to transparent, objective crypto exchange comparisons for Australia and New Zealand
          </p>
          {lastReviewed && (
            <p className="mt-3 text-sm text-gray-500">Data last reviewed: {lastReviewed}</p>
          )}
        </div>

        <div className="space-y-8">
          {/* What We Do */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Info className="h-6 w-6 mr-3 text-blue-600" />
                What We Do
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                We provide a side-by-side comparison of crypto exchanges available to users in Australia and New Zealand.
                You can review key features and filter to providers that match what you need. This is general information
                only — not financial advice or a recommendation.
              </p>
            </CardContent>
          </Card>

          {/* Filters & Criteria */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Filter className="h-6 w-6 mr-3 text-green-600" />
                Filters & Criteria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Filters You Can Use</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Region:</strong> Australia (AU) or New Zealand (NZ)</li>
                  <li><strong>Funding Methods:</strong> Bank transfer/PayID (AU), Card buy, and other supported rails</li>
                  <li><strong>Features:</strong> SMSF support, advanced trading features, demo access (where available)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Information We Show</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Supported currencies (AUD/NZD)</li>
                  <li>Funding options (e.g., bank transfer, card purchases)</li>
                  <li>Fee information (as published by providers)</li>
                  <li>Coin counts and notable features</li>
                  <li>Origin details (local/international) and established year</li>
                  <li>Active promotions when disclosed</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ordering & Rankings</h3>
                <p className="text-gray-700 leading-relaxed">
                  We don’t rank exchanges or provide recommendations. You decide what matters via filters, and we show matching providers side‑by‑side.
                  Where needed, we present items in a consistent order (e.g., alphabetical) for clarity.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Coverage & Transparency */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Scale className="h-6 w-6 mr-3 text-purple-600" />
                Coverage & Transparency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Scope</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>AUSTRAC‑registered DCEs (Australia) and NZ‑registered providers (New Zealand)</li>
                  <li>Spot cryptocurrency trading only</li>
                  <li>Retail‑accessible exchanges</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Sources</h3>
                <p className="text-gray-700 leading-relaxed">
                  We use official exchange websites, public fee schedules, and regulatory registers. We periodically review listings to keep them current.
                  Always verify details directly with providers before making decisions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Independence</h3>
                <p className="text-gray-700 leading-relaxed">
                  Partner relationships do not change what appears in comparisons. See our{' '}
                  <Link href="/affiliate-disclosure" className="text-blue-600 hover:underline">affiliate disclosure</Link>{' '}
                  for more on how we make money.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-800 mb-3">Important Notes</h3>
            <ul className="list-disc pl-6 space-y-2 text-amber-700">
              <li>This is general information — not financial or investment advice</li>
              <li>Details can change; confirm current fees, features, and terms with providers</li>
              <li>Consider your own situation and seek independent advice if needed</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/compare-crypto-exchanges">Start Comparing Exchanges</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

