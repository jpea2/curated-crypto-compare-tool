import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft, MoveRight } from 'lucide-react';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology (Moved) | How We Compare',
  description: 'This page has moved. Learn how our comparison works.',
};

export default function MethodologyMovedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between relative">
            <div className="hidden md:block">
              <Button asChild variant="ghost" size="sm">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
            <Link href="/" className="flex items-center space-x-2 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">CuratedCryptoInsights</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">This page has moved</h1>
        <p className="text-gray-700 mb-8">
          Our methodology content now lives on the updated How We Compare page.
        </p>
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/how-we-compare">
            Go to How We Compare
            <MoveRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </main>

      <Footer />
    </div>
  );
}
