import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, AlertTriangle } from 'lucide-react';
import Footer from '@/components/Footer';
import ResultsList from '@/components/ResultsList';
import { matchProviders } from '@/lib/matchEngine';
import { QuizAnswers } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exchange Results | Crypto Matches for AU/NZ',
  description: 'Crypto exchange matches based on your preferences for Australia and New Zealand.',
};

interface ResultsPageProps {
  searchParams: {
    currency?: string;
    experience_level?: string;
    funding?: string;
    priority?: string;
  };
}

export default function ResultsPage({ searchParams }: ResultsPageProps) {
  // Sanitize quiz answers from search params
  const allowedCurrency = new Set(['aud', 'nzd']);
  const allowedExperienceLevel = new Set(['beginner', 'intermediate', 'advanced']);
  const allowedFunding = new Set(['bank_transfer', 'card_buy']);
  const allowedPriority = new Set(['fees', 'ease', 'coins', 'advanced']);

  const rawFunding = searchParams.funding?.split(',') || [];
  const funding = rawFunding.filter((f) => allowedFunding.has(f));

  const currency = allowedCurrency.has(String(searchParams.currency))
    ? (searchParams.currency as 'aud' | 'nzd')
    : 'aud';

  const experience_level = allowedExperienceLevel.has(String(searchParams.experience_level))
    ? (searchParams.experience_level as 'beginner' | 'intermediate' | 'advanced')
    : 'beginner';

  const priority = allowedPriority.has(String(searchParams.priority))
    ? (searchParams.priority as 'fees' | 'ease' | 'coins' | 'advanced')
    : 'fees';

  const answers: QuizAnswers = {
    currency,
    experience_level,
    funding,
    priority,
  };

  // Get matching results
  const results = matchProviders(answers);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/quiz">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Quiz
                  </Link>
                </Button>
              </div>
              <div className="h-6 w-px bg-gray-300 hidden md:block" />
            </div>
            <Link href="/" className="flex items-center space-x-2 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">CuratedCryptoInsights</span>
            </Link>
            
            <nav className="hidden md:flex space-x-4">
              <Link href="/methodology" className="text-sm text-gray-600 hover:text-gray-900">
                Methodology
              </Link>
              <Link href="/affiliate-disclosure" className="text-sm text-gray-600 hover:text-gray-900">
                Affiliate Disclosure
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">

        {/* Affiliate Disclosure Banner */}
        <div className="mb-6">
          <div className="flex items-center justify-center p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-900 text-center">
              We may earn a commission if you click a partner link or sign up with a provider through our site. This doesn’t influence our matching or rankings.{' '}
              <Link href="/affiliate-disclosure" className="underline">Learn more</Link>.
            </p>
          </div>
        </div>

        <Suspense fallback={
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="flex space-x-2">
                <div className="h-6 w-20 bg-gray-200 rounded"></div>
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-md animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        }>
          <ResultsList results={results} answers={answers} />
        </Suspense>
      </main>

      {/* Disclaimer */}
      <section className="py-8 bg-amber-50 border-y border-amber-200 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start space-x-3 p-4 bg-white/60 rounded-lg border border-amber-200">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Important Disclaimers</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>No Endorsement or Recommendation:</strong> We don’t endorse cryptocurrency or any
                    particular provider, product, or service. Results are informational only and are not a
                    recommendation to trade, invest, or use any service.
                  </p>
                  <p>
                    <strong>General Advice Warning:</strong> This information is general only and doesn't 
                    consider your objectives, financial situation or needs. Consider independent advice.
                  </p>
                  <p>
                    <strong>Revenue Disclosure:</strong> We may earn commissions from partner exchanges. 
                    This doesn't influence our matching algorithm or rankings.
                  </p>
                  <p>
                    <strong>Coverage:</strong> Not all exchanges are listed. We focus on AUSTRAC-registered exchanges and 
                    NZ-registered providers for spot crypto trading only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
