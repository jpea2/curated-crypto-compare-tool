import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, FileText, AlertTriangle, Scale } from 'lucide-react';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { BUSINESS_NAME, BUSINESS_ABN, PRIVACY_EMAIL } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Terms of Service | Usage Terms & Conditions',
  description: 'Terms of service and conditions for using our AU/NZ crypto exchange finder and comparison tool.',
};

export default function TermsPage() {
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Terms and conditions for using our service
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 2025</p>
        </div>

        <div className="space-y-8">
          {/* Key Points */}
          <Card className="border-0 shadow-lg bg-amber-50 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-amber-800">
                <AlertTriangle className="h-6 w-6 mr-3" />
                Key Points - Please Read
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="list-disc pl-6 space-y-2 text-amber-800">
                <li><strong>General Information Only:</strong> We provide comparison information, not financial advice</li>
                <li><strong>No Guarantees:</strong> Information may change; verify directly with exchanges</li>
                <li><strong>Your Responsibility:</strong> Make your own informed decisions</li>
                <li><strong>Affiliate Revenue:</strong> We may earn commissions from some exchanges</li>
                <li><strong>Comparator Scope:</strong> We don't compare every provider in the market</li>
                <li><strong>AU/NZ Focus:</strong> Service designed specifically for Australian and New Zealand users</li>
              </ul>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card className="border-0 shadow-md bg-white/60">
            <CardHeader>
              <CardTitle className="text-lg">Business Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                This service is provided by {BUSINESS_NAME} (ABN {BUSINESS_ABN}). For queries about these Terms, contact us at{' '}
                <a href={'mailto:' + PRIVACY_EMAIL} className="text-blue-600 hover:underline">{PRIVACY_EMAIL}</a>.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <FileText className="h-6 w-6 mr-3 text-blue-600" />
                Our Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What We Provide</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>A comparison tool for crypto exchanges serving Australia and New Zealand</li>
                  <li>Filtering based on your stated preferences and requirements</li>
                  <li>General information about exchange features, fees, and services</li>
                  <li>Links to exchange websites (some may be affiliate links)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What We Don't Provide</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Financial advice or investment recommendations</li>
                  <li>Account opening or transaction services</li>
                  <li>Customer support for exchange-related issues</li>
                  <li>Guarantees about exchange reliability or performance</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Legal Disclaimers */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Scale className="h-6 w-6 mr-3 text-red-600" />
                Legal Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">General Advice Warning (Australia)</h3>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm leading-relaxed">
                    This website contains general information only and does not take into account your 
                    objectives, financial situation or needs. Before acting on any information, 
                    consider its appropriateness having regard to your objectives, financial situation 
                    and needs and seek independent financial advice.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">General Advice (New Zealand)</h3>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm leading-relaxed">
                    The information on this website is general information only. It does not take 
                    into account your individual circumstances, objectives, financial situation or needs. 
                    You should consider whether the information is appropriate for you and seek 
                    professional advice.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">No Liability</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  To the maximum extent permitted by law, the Service is provided “as is” and we make no warranties or guarantees.
                  Features, fees and availability may change without notice. We are not responsible for any loss or damage arising
                  from your use of any exchange or third‑party service. You must verify current information directly with providers.
                  Cryptocurrency involves significant risk. This clause is subject to the Consumer Guarantees below and does not
                  limit non‑excludable rights under the Australian Consumer Law or the New Zealand Consumer Guarantees Act 1993.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Consumer Guarantees */}
          <Card className="border-0 shadow-md bg-white/60">
            <CardHeader>
              <CardTitle className="text-lg">Consumer Guarantees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                Nothing in these Terms excludes, restricts or modifies any consumer guarantees, rights or remedies you may have under
                the Australian Consumer Law or the New Zealand Consumer Guarantees Act 1993 that cannot be lawfully excluded. To the
                extent permitted by law, and subject to those non‑excludable rights, our liability is limited as set out in these Terms.
              </p>
            </CardContent>
          </Card>

          {/* Third‑Party Sites */}
          <Card className="border-0 shadow-md bg-white/60">
            <CardHeader>
              <CardTitle className="text-lg">Third‑Party Sites</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                Our site links to third‑party websites and resources. We do not control or endorse them and are not responsible for their
                content, terms, privacy practices, products or services. You access third‑party sites at your own risk.
              </p>
            </CardContent>
          </Card>

          {/* Intellectual Property & License */}
          <Card className="border-0 shadow-md bg-white/60">
            <CardHeader>
              <CardTitle className="text-lg">Intellectual Property & License</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                The Service and all content are owned by us or our licensors. We grant you a limited, revocable, non‑exclusive,
                non‑transferable license to access and use the Service for your personal, non‑commercial use. You must not copy,
                reproduce, distribute, scrape, frame, mirror or create derivative works without our prior written consent.
              </p>
            </CardContent>
          </Card>

          {/* Eligibility & Territory */}
          <Card className="border-0 shadow-md bg-white/60">
            <CardHeader>
              <CardTitle className="text-lg">Eligibility & Territory</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                You must be at least 18 years old to use the Service. The Service is intended for users located in Australia and New Zealand.
              </p>
            </CardContent>
          </Card>

          {/* Availability & Termination */}
          <Card className="border-0 shadow-md bg-white/60">
            <CardHeader>
              <CardTitle className="text-lg">Availability & Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                We may modify, suspend or discontinue any part of the Service at any time. We may suspend or terminate your access if you
                breach these Terms or where required to comply with law.
              </p>
            </CardContent>
          </Card>

          {/* General Boilerplate */}
          <Card className="border-0 shadow-md bg-white/60">
            <CardHeader>
              <CardTitle className="text-lg">General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-700">
              <p><strong>Severability:</strong> If any provision is invalid or unenforceable, the remainder remains in effect.</p>
              <p><strong>Waiver:</strong> A failure to enforce a right is not a waiver of that right.</p>
              <p><strong>Assignment:</strong> You may not assign your rights without our written consent; we may assign without restriction.</p>
              <p><strong>Entire Agreement:</strong> These Terms constitute the entire agreement regarding the Service and supersede prior understandings.</p>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Your Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">When Using Our Service</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
                  <li>Use the service for lawful purposes only</li>
                  <li>Don't attempt to access unauthorized areas or data</li>
                  <li>Don't use automated systems to scrape our content</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Before Choosing an Exchange</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
                  <li>Verify all information directly with the exchange</li>
                  <li>Read exchange terms of service and fee schedules</li>
                  <li>Understand the risks of cryptocurrency trading</li>
                  <li>Consider seeking independent financial advice</li>
                  <li>Ensure the exchange is legally operating in your jurisdiction</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Affiliate Relationships */}
          <Card className="border-0 shadow-lg bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg text-purple-800">Affiliate Relationships</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-purple-800 text-sm leading-relaxed">
                We may earn affiliate commissions when you sign up with certain exchanges. 
                This revenue helps fund our service but does not influence our matching 
                algorithm or rankings. See our <Link href="/affiliate-disclosure" className="underline font-medium">Affiliate Disclosure</Link> for 
                complete details.
              </p>
            </CardContent>
          </Card>

          {/* Changes and Contact */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md bg-white/60">
              <CardHeader>
                <CardTitle className="text-lg">Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We may update these terms from time to time. Changes will be posted 
                  on this page with an updated date. Continued use of the service 
                  constitutes acceptance of revised terms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/60">
              <CardHeader>
                <CardTitle className="text-lg">Governing Law</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm leading-relaxed">
                  These terms are governed by Australian law. Any disputes will be 
                  subject to the jurisdiction of Australian courts.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Final Warning */}
          <div className="bg-gray-900 text-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">⚠️ Important Reminder</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Cryptocurrency trading involves significant risks including the potential loss of 
              your entire investment. Past performance is not indicative of future results. 
              Only invest what you can afford to lose and consider seeking independent financial advice.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            By using our service, you agree to these terms and conditions.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/compare-crypto-exchanges">Browse Exchanges</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
