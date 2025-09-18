import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, DollarSign, Eye, Users } from 'lucide-react';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | Revenue & Partner Relationships',
  description: 'Full disclosure of our partner relationships, revenue model, and how commissions work for our crypto exchange finder.',
};

export default function AffiliateDisclosurePage() {

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
            Affiliate Disclosure
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Full transparency about our partner relationships and revenue model
          </p>
        </div>

        {/* Top CTA */}
        <div className="text-center mb-8">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/compare-crypto-exchanges">Compare Exchanges</Link>
          </Button>
        </div>

        <div className="space-y-8">
          {/* Main Disclosure */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <DollarSign className="h-6 w-6 mr-3 text-green-600" />
                Revenue Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                We may earn a commission from some providers listed on this site.
                <strong> Commissions do not affect which exchanges appear in our comparison or the order they display by default.</strong>
              </p>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Eye className="h-6 w-6 mr-3 text-blue-600" />
                How Our Revenue Model Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Commission Structure</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>When you click through to a partner exchange and create an account, we may receive a commission</li>
                  <li>Commissions are typically a one-time referral fee or small percentage of trading fees</li>
                  <li>You pay nothing extra - exchanges pay us as a customer acquisition cost</li>
                  <li>Non-partner exchanges are included and ranked equally based on your preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Comparison Independence</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our comparison logic is completely independent of revenue relationships. The system:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                  <li>Lets you filter exchanges based solely on features you select</li>
                  <li>Offers multiple sort options (default partner-first, alphabetical, coin count, established year)</li>
                  <li>Clearly labels partner and sponsored providers in the interface</li>
                  <li>Does not hide non-partner exchanges—they remain visible in every view</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Transparency Measures</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Partner status is clearly labeled on exchange cards</li>
                  <li>This disclosure is linked from every page</li>
                  <li>Our methodology is fully documented and publicly available</li>
                  <li>We include non-partner exchanges in results</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Partner List */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Users className="h-6 w-6 mr-3 text-purple-600" />
                Current Partners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We have affiliate partnerships with select cryptocurrency exchanges. Partner status is clearly indicated on individual exchange cards in your results with a "Partner" badge.
              </p>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <strong>Important:</strong> Partner relationships may change over time. Current partner status is always shown on exchange cards in our comparison.
              </p>
            </CardContent>
          </Card>

          {/* What This Means for You */}
          <Card className="border-0 shadow-lg bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-xl text-blue-800">
                What This Means for You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
              <h3 className="font-semibold text-blue-800 mb-2">✓ Our Commitments</h3>
                  <ul className="list-disc pl-4 space-y-1 text-blue-700 text-sm">
                    <li>Comparisons respond only to filters you set</li>
                    <li>Clear labeling of partner relationships</li>
                    <li>Include non-partner options</li>
                    <li>Transparent methodology</li>
                    <li>No hidden ranking boosts</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">⚠️ What You Should Know</h3>
                  <ul className="list-disc pl-4 space-y-1 text-blue-700 text-sm">
                    <li>We earn commissions from some exchanges</li>
                    <li>Always verify fees and terms directly</li>
                    <li>This is general information, not advice</li>
                    <li>Consider your own financial situation</li>
                    <li>Partner relationships may change</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Questions About Our Model?</h3>
            <p className="text-gray-700 leading-relaxed">
              We believe in complete transparency. If you have questions about how our revenue 
              model works or our relationship with any exchange, please review our{' '}
              <Link href="/how-we-compare" className="text-blue-600 hover:underline">How We Compare</Link> page for
              detailed information.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/compare-crypto-exchanges">Compare Exchanges</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
