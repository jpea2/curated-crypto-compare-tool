import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Search, FileText, AlertTriangle, Twitter } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center md:justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">CuratedCryptoInsights</span>
            </Link>
            <nav className="hidden md:flex space-x-6 items-center">
              <Link href="/methodology" className="text-gray-600 hover:text-gray-900">Methodology</Link>
              <Link href="/affiliate-disclosure" className="text-gray-600 hover:text-gray-900">Affiliate Disclosure</Link>
              <a
                href="https://x.com/curatedcryptoau"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-600 hover:text-gray-900"
                aria-label="Follow us on X (Twitter)"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Find crypto exchanges that match your preferences in{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Australia or New Zealand
            </span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 leading-normal md:leading-relaxed">
            Take our quick 5-question quiz to discover AUSTRAC-registered exchanges and NZ-registered providers 
            that match your currency, funding preferences, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 md:mb-12">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
              <Link href="/quiz">
                <Search className="mr-2 h-5 w-5" />
                Start Quiz
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/methodology">
                <FileText className="mr-2 h-5 w-5" />
                How It Works
              </Link>
            </Button>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-10 md:mt-16">
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Registered Only</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Only AUSTRAC-registered DCEs in Australia and NZ-registered providers in New Zealand
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardHeader>
                <Search className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Filter-Based Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our algorithm filters by your requirements then boosts matches based on your responses
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Transparent Methodology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Full disclosure of our matching criteria, partner relationships, and revenue model
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start space-x-3 p-6 bg-white/80 rounded-lg border border-amber-200">
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">General Advice Warning</h3>
                <p className="text-gray-700 leading-relaxed">
                  This site provides general information only and does not take into account your objectives, 
                  financial situation or needs. We do not provide financial product advice. Consider independent 
                  advice before acting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
