import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, Eye, Database, Globe } from 'lucide-react';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { PRIVACY_EMAIL, BUSINESS_NAME, BUSINESS_ABN } from '@/lib/siteConfig';
import { ConsentManager } from '@/components/ConsentManager';

export const metadata: Metadata = {
  title: 'Privacy Policy | Data Protection & Your Rights',
  description: 'How we protect your privacy when using our crypto exchange finder for Australia and New Zealand.',
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            How we protect your privacy and handle your data
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: September 2025</p>
        </div>

        <div className="space-y-8">
          {/* Data Collection */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Database className="h-6 w-6 mr-3 text-blue-600" />
                What Data We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quiz Responses</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Your currency preference (AUD/NZD)</li>
                  <li>Account type preference</li>
                  <li>Funding method preferences</li>
                  <li>Priority selection</li>
                  <li>Demo mode preference</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Storage:</strong> Quiz answers are stored only in your browser's URL and session. 
                  We do not save this information to our servers or databases.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Automatically Collected</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Page views and basic usage analytics</li>
                  <li>Device type and browser information</li>
                  <li>General geographic region (country level)</li>
                  <li>Referral source (how you found our site)</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Purpose:</strong> To understand how our service is used and improve the experience.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What We Don't Collect</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Personal identifying information (name, email, phone)</li>
                  <li>Financial information</li>
                  <li>Detailed browsing history</li>
                  <li>Precise location data</li>
                  <li>Social media profiles or connections</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Data */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Eye className="h-6 w-6 mr-3 text-green-600" />
                How We Use Your Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Primary Uses</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Process your quiz responses to show matching exchanges</li>
                  <li>Improve our matching algorithm and user experience</li>
                  <li>Understand which features are most valuable to users</li>
                  <li>Ensure the service works correctly across different devices</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-gray-700">
                  We use Vercel Web Analytics to understand how visitors use our website and to
                  improve our services. This analytics service automatically collects information
                  about your visit, including pages viewed, referring websites, your approximate
                  geographic location (country/region), browser type, operating system, and device
                  information. Vercel Web Analytics does not use cookies or track you across
                  different websites. Instead, it creates a temporary, anonymous identifier from
                  your request that is automatically deleted after 24 hours, helping protect your
                  privacy. The analytics data collected is anonymized and is not used to personally
                  identify you. This information helps us understand which pages are most popular,
                  how visitors navigate our site, and where we can improve. The analytics script is
                  lightweight and privacy‑focused, designed to have minimal impact on performance
                  while respecting visitor privacy.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Third Parties */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Globe className="h-6 w-6 mr-3 text-purple-600" />
                Third Party Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Provider</h3>
                <p className="text-gray-700">
                  Our analytics is provided by Vercel Web Analytics (cookie‑less, anonymized, 24‑hour
                  temporary identifiers). See the Analytics section above for details.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Affiliate Links</h3>
                <p className="text-gray-700">
                  When you click through to an exchange, you'll be redirected through our 
                  affiliate tracking system. This allows us to earn commissions but does not 
                  share your personal information with exchanges.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">X.com Advertising and Conversion Tracking</h3>
                <p className="text-gray-700 mb-2">
                  We use X.com (formerly Twitter) advertising services and conversion tracking
                  technology, including the X Pixel, to measure the effectiveness of our
                  advertising campaigns and to show relevant ads. When you visit our website
                  after clicking one of our X.com advertisements, X may collect information
                  about your visit through tracking pixels and cookies placed on our site.
                </p>
                <p className="text-gray-700 font-medium">Information collected by X.com may include:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Your interactions with our advertisements on X.com</li>
                  <li>Pages visited on our website after clicking our ads</li>
                  <li>Actions taken on our website (such as form submissions)</li>
                  <li>Device and browser information</li>
                  <li>IP address and approximate location</li>
                  <li>Referral information from X.com</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  X processes this information to help us understand advertising effectiveness
                  and may use it for their own advertising purposes. X may share information from
                  your engagement with ads on or off X with advertisers and may combine
                  information collected through their advertising technology with other
                  information they hold about you.
                </p>
                <p className="text-gray-700 mt-2">
                  For more information about X's data practices, please see
                  {' '}<a href="https://x.com/en/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">X's Privacy Policy</a>.
                  You can opt out of X's interest‑based advertising by visiting your X privacy
                  settings or through the Digital Advertising Alliance's opt‑out tool at
                  {' '}<a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">optout.aboutads.info</a>.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Hosting Provider</h3>
                <p className="text-gray-700">
                  Our website is hosted on Vercel. To operate and secure the service, Vercel may
                  process technical information such as IP address, user‑agent, and timestamps.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="border-0 shadow-lg bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-xl text-blue-800">Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">Australian Users (Privacy Act)</h3>
                  <ul className="list-disc pl-4 space-y-1 text-blue-700 text-sm">
                    <li>Access to information we hold about you</li>
                    <li>Correction of incorrect information</li>
                    <li>Complaints about privacy breaches</li>
                    <li>Opt-out of certain data collection</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">New Zealand Users (Privacy Act)</h3>
                  <ul className="list-disc pl-4 space-y-1 text-blue-700 text-sm">
                    <li>Access to personal information</li>
                    <li>Correction of information</li>
                    <li>Privacy complaint rights</li>
                    <li>Control over information collection</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Shield className="h-6 w-6 mr-3 text-red-600" />
                Data Security & Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Measures</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>HTTPS encryption for all data transmission</li>
                  <li>Minimal data collection (only what's necessary)</li>
                  <li>No storage of personal identifying information</li>
                  <li>Regular security updates and monitoring</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Retention</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Quiz responses: Not stored (only in your browser session)</li>
                  <li>Analytics data: Aggregated data retained for 2 years</li>
                  <li>Server logs: Retained for 30 days for security purposes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Consent Manager */}
          <ConsentManager />

          {/* Contact & Changes */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md bg-white/60 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  For privacy questions, access/correction requests, or complaints, contact us at
                  {' '}<a href={`mailto:${PRIVACY_EMAIL}`} className="text-blue-600 hover:underline">{PRIVACY_EMAIL}</a>.
                  We aim to respond within 30 days.
                </p>
                <p className="text-gray-700 text-sm mt-3">
                  If we can’t resolve your complaint: AU users may contact the OAIC (www.oaic.gov.au);
                  NZ users may contact the Office of the Privacy Commissioner (www.privacy.org.nz).
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/60">
              <CardHeader>
                <CardTitle className="text-lg">Policy Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  We'll update this policy as needed and post changes here. 
                  Major changes will be highlighted on the main site.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/60">
              <CardHeader>
                <CardTitle className="text-lg">Questions?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  You can also review our <Link href="/methodology" className="text-blue-600 hover:underline">methodology page</Link> for 
                  details on how matching works.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/quiz">Start Quiz</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
