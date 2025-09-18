import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ConsentProvider } from '@/components/ConsentProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "AU/NZ Crypto Exchange's Curated | Compare & Match",
  description: 'Find AUSTRAC-registered exchanges and NZ-registered providers in Australia and New Zealand. Compare fees, features, and funding options to see exchanges that match your answers.',
  keywords: 'crypto exchange, australia, new zealand, AUSTRAC, FMA, bitcoin, cryptocurrency',
  authors: [{ name: 'CuratedCryptoInsights' }],
  openGraph: {
    title: "AU/NZ Crypto Exchange's Curated",
    description: 'Find registered crypto exchanges that match you are looking for in Australia and New Zealand.',
    type: 'website',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@curatedcryptoau',
    creator: '@curatedcryptoau',
    title: "AU/NZ Crypto Exchange's Curated | Compare & Match",
    description: 'Find AUSTRAC-registered exchanges and NZ-registered providers in Australia and New Zealand. Compare fees, features, and funding options to see exchanges that match your answers.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-screen bg-background')}>
        <ConsentProvider>
          {children}
        </ConsentProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: "CuratedCryptoInsights",
              description: 'Compare AUSTRAC-registered exchanges and NZ-registered providers',
              url: typeof window !== 'undefined' ? window.location.origin : '',
              audience: {
                '@type': 'Audience',
                geographicArea: ['Australia', 'New Zealand']
              },
              inLanguage: 'en-AU',
            }),
          }}
        />
      </body>
    </html>
  );
}
