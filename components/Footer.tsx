import Link from 'next/link';
import { Shield, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="h-4 w-4" />
              <span className="font-semibold">CuratedCryptoInsights</span>
            </div>
            <p className="text-gray-400">
              Discover registered crypto exchanges in Australia and New Zealand.
            </p>
            <div className="mt-3">
              <a
                href="https://x.com/curatedcryptoau"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-400 hover:text-white"
                aria-label="Follow us on X (Twitter)"
              >
                <Twitter className="h-4 w-4 mr-2" />
                @curatedcryptoau
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/methodology" className="hover:text-white">Methodology</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-white">Affiliate Disclosure</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Coverage</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>AUSTRAC registered DCEs</li>
              <li>NZ-registered providers</li>
              <li>Spot trading only</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-xs text-gray-400">
          <p>&copy; 2025 CuratedCryptoInsights. General information only.</p>
        </div>
      </div>
    </footer>
  );
}