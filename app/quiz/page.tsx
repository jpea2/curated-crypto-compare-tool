import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import Footer from '@/components/Footer';
import QuizForm from '@/components/QuizForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crypto Exchange Quiz | Find Your Match in AU/NZ',
  description: 'Take our 5-question quiz to find AUSTRAC-registered exchanges and NZ-registered providers that match your preferences in Australia and New Zealand.',
};

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-20">
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
      <main className="container mx-auto px-4 py-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            See Your Matches
          </h1>
          <p className="hidden md:block text-base text-gray-600 max-w-3xl mx-auto">
            Answer 5 quick questions to discover AUSTRAC-registered exchanges and NZ-registered providers.
          </p>
        </div>

        <Suspense fallback={
          <div className="max-w-2xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-8"></div>
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <div className="h-6 bg-gray-200 rounded mb-6"></div>
                <div className="space-y-4">
                  <div className="h-12 bg-gray-100 rounded"></div>
                  <div className="h-12 bg-gray-100 rounded"></div>
                  <div className="h-12 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        }>
          <QuizForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
