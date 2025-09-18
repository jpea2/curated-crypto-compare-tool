import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Shield, AlertTriangle } from 'lucide-react';
import Footer from '@/components/Footer';
import ResultsList from '@/components/ResultsList';
import { getAllProviders, filterProviders } from '@/lib/providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Crypto Exchanges | Australia & New Zealand',
  description: 'Compare cryptocurrency exchanges available in Australia and New Zealand. View features, fees, and supported currencies side-by-side.',
};

interface ComparisonPageProps {
  searchParams: {
    region?: string;
    funding?: string;
    features?: string;
    sort?: string;
  };
}

export default function ComparisonPage({ searchParams }: ComparisonPageProps) {
  // Parse optional filter parameters
  const allowedRegions = new Set(['au', 'nz']);
  const allowedFunding = new Set(['bank_transfer', 'card_buy']);
  const allowedFeatures = new Set(['smsf', 'advanced', 'demo']);

  const region = allowedRegions.has(String(searchParams.region))
    ? (searchParams.region as 'au' | 'nz')
    : undefined;

  const rawFunding = searchParams.funding?.split(',') || [];
  const funding = rawFunding.filter((f) => allowedFunding.has(f));

  const rawFeatures = searchParams.features?.split(',') || [];
  const features = rawFeatures.filter((f) => allowedFeatures.has(f));

  // Get filtered providers
  const allProviders = getAllProviders();
  const filteredProviders = filterProviders({
    region,
    funding: funding.length > 0 ? funding : undefined,
    features: features.length > 0 ? features : undefined,
  });

  const providers = filteredProviders.length > 0 ? filteredProviders : allProviders;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Home
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
              We may earn a commission if you click a partner link or sign up with a provider through our site. This helps support our comparison tool.{' '}
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
          <ResultsList providers={providers} region={region} />
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
                    <strong>No Endorsement or Recommendation:</strong> We don't endorse cryptocurrency or any
                    particular provider, product, or service. This comparison tool provides factual information only
                    and is not a recommendation to trade, invest, or use any service.
                  </p>
                  <p>
                    <strong>General Advice Warning:</strong> This information is general only and doesn't
                    consider your objectives, financial situation or needs. Consider independent advice.
                  </p>
                  <p>
                    <strong>Revenue Disclosure:</strong> We may earn commissions from partner exchanges.
                    This doesn't influence the information presented in our comparison tool.
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
