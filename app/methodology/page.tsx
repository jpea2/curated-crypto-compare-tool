import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, Filter, Target, Scale } from 'lucide-react';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import providersData from '@/data/providers.json';

export const metadata: Metadata = {
  title: 'Methodology | How We Match Crypto Exchanges',
  description: 'Learn how our transparent matching algorithm filters and scores crypto exchanges in Australia and New Zealand.',
};

export default function MethodologyPage() {
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
            <Link href="/" className="flex items-center space-x-2 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">CuratedCryptoInsights</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Methodology
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            How we help AU/NZ users discover exchanges that fit their stated needs
          </p>
          {lastReviewed && (
            <p className="mt-3 text-sm text-gray-500">Data last reviewed: {lastReviewed}</p>
          )}
        </div>

        {/* Top CTA */}
        <div className="text-center mb-8">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/quiz">Try the Quiz</Link>
          </Button>
        </div>

        <div className="space-y-8">
          {/* Purpose */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Target className="h-6 w-6 mr-3 text-blue-600" />
                Purpose
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Help AU/NZ users discover exchanges that fit their stated needs. This is general 
                information only and not financial advice.
              </p>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Filter className="h-6 w-6 mr-3 text-green-600" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Inputs</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Currency preference (AUD/NZD)</li>
                  <li>Account type (Individual, SMSF, Company/Trust)</li>
                  <li>Funding methods (Bank transfer, Card, Crypto deposits)</li>
                  <li>Priority (Lowest fees, Easy setup, Wide coins, Advanced features)</li>
                  <li>Demo preference</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Data Sources</h3>
                <p className="text-gray-700 leading-relaxed">
                  Official exchange websites, regulatory registrations, and public fee schedules. 
                  Data is rechecked periodically for accuracy.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Hard Filters</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>AU/NZ availability and regulatory compliance</li>
                  <li>AUSTRAC registration (AU) or NZ registration (NZ) where applicable</li>
                  <li>Required funding rails (bank transfer, card support)</li>
                  <li>SMSF eligibility (if requested)</li>
                  <li>Advanced features (if prioritized)</li>
                  <li>Demo mode (if requested)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Scoring</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  After filtering, remaining exchanges are scored based on how well they match your priorities:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Lowest fees:</strong> Exchanges with more competitive fee structures score higher</li>
                  <li><strong>Easy setup:</strong> Based on account opening complexity and user experience</li>
                  <li><strong>Wide coins:</strong> Number of supported cryptocurrencies</li>
                  <li><strong>Advanced features:</strong> Availability of advanced trading features</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Tie-breakers</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  When exchanges have equal scores, we use these tie-breakers in order:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>More funding capabilities (broader payment options)</li>
                  <li>Has advanced features (if you prioritized advanced features)</li>
                  <li>Has demo mode (if you requested demo access)</li>
                  <li>Alphabetical order (for complete consistency)</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Coverage & Limitations */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Scale className="h-6 w-6 mr-3 text-purple-600" />
                Coverage & Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What We Cover</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>AUSTRAC-registered Digital Currency Exchanges (Australia)</li>
                  <li>NZ-registered providers (New Zealand, where applicable)</li>
                  <li>Spot cryptocurrency trading only</li>
                  <li>Major exchanges serving retail customers</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What We Don't Cover</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Every crypto exchange that exists</li>
                  <li>Derivatives, futures, or lending platforms</li>
                  <li>Unregistered or offshore-only exchanges</li>
                  <li>Private or institutional-only services</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Independence</h3>
                <p className="text-gray-700 leading-relaxed">
                  Compensation from partners never changes our matching rules or filtering criteria. 
                  Partner status is clearly disclosed, and our algorithm treats all exchanges equally 
                  based on your stated preferences.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-800 mb-3">Important Notes</h3>
            <ul className="list-disc pl-6 space-y-2 text-amber-700">
              <li>This is general information only - not financial or investment advice</li>
              <li>Always verify current fees, features, and terms directly with exchanges</li>
              <li>Regulatory status and available features can change</li>
              <li>Consider your own financial situation and seek independent advice</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/quiz">Try the Quiz</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
