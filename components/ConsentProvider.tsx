'use client';

import { useEffect, useRef } from 'react';
import { useConsent } from '@/hooks/useConsent';
import { loadXPixel, resetXPixel, trackPageView } from '@/lib/analytics';
import { CookieConsent } from '@/components/CookieConsent';

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const { preferences, hasConsented, isLoaded } = useConsent();
  const previousMarketingConsent = useRef(false);
  const previousHasConsented = useRef(false);

  // Handle X pixel loading based on marketing consent
  useEffect(() => {
    // Check if marketing consent just changed from false to true
    const justGaveMarketingConsent = 
      isLoaded && 
      hasConsented && 
      preferences.marketing && 
      (!previousHasConsented.current || !previousMarketingConsent.current);

    // Check if marketing consent was withdrawn
    const withdrawnMarketingConsent = 
      isLoaded && 
      hasConsented && 
      !preferences.marketing && 
      previousMarketingConsent.current;

    if (justGaveMarketingConsent) {
      loadXPixel()
        .then(() => {
          trackPageView(window.location.pathname);
        })
        .catch((error) => {
          console.error('Failed to initialize X pixel:', error);
        });
    } else if (withdrawnMarketingConsent) {
      resetXPixel();
    }

    // Update refs for next render
    previousMarketingConsent.current = preferences.marketing;
    previousHasConsented.current = hasConsented;
  }, [isLoaded, hasConsented, preferences.marketing]);

  // React to consent changes triggered elsewhere (same-tab) via a custom event
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        hasConsented: boolean;
        preferences: { marketing: boolean };
      } | undefined;
      if (!detail) return;

      // If marketing consent just became true, load pixel immediately
      if (detail.hasConsented && detail.preferences.marketing) {
        loadXPixel()
          .then(() => {
            trackPageView(window.location.pathname);
          })
          .catch((err) => console.error('Consent event init failed:', err));
      } else {
        // Consent withdrawn or limited
        resetXPixel();
      }
    };

    window.addEventListener('consent:updated', handler as EventListener);
    return () => {
      window.removeEventListener('consent:updated', handler as EventListener);
    };
  }, []);

  // Track page views on route changes (for SPA navigation)
  useEffect(() => {
    if (!isLoaded || !hasConsented || !preferences.marketing) {
      return;
    }

    const handleRouteChange = () => {
      trackPageView();
    };

    // Listen for Next.js route changes
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handleRouteChange);
      return () => window.removeEventListener('popstate', handleRouteChange);
    }
  }, [preferences.marketing, hasConsented, isLoaded]);

  return (
    <>
      {children}
      <CookieConsent />
    </>
  );
}
