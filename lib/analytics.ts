'use client';

// X Pixel Configuration
const X_PIXEL_ID = process.env.NEXT_PUBLIC_X_PIXEL_ID || '';

// Track if X pixel has been loaded
let isXPixelLoaded = false;

// Declare global twq function for TypeScript
declare global {
  interface Window {
    twq: any;
  }
}

/**
 * Load X.com (Twitter) Pixel if marketing consent is given
 */
export function loadXPixel(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!X_PIXEL_ID) {
      console.warn('X Pixel ID not configured');
      reject(new Error('X Pixel ID not configured'));
      return;
    }

    if (isXPixelLoaded || typeof window === 'undefined') {
      resolve();
      return;
    }

    try {
      // X Pixel base code - exact script from X.com documentation
      !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
      },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
      a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');

      // Configure the pixel with your pixel ID
      window.twq('config', X_PIXEL_ID);

      isXPixelLoaded = true;
      console.log('X Pixel base script loaded, configuring...');
      
      // Wait longer for the external script to load and initialize
      const checkPixelReady = (attempts = 0) => {
        if (attempts > 50) { // 5 seconds max
          console.warn('X Pixel may not be fully ready, but proceeding...');
          resolve();
          return;
        }
        
        // Check if the external script has loaded by looking for the script tag
        const script = document.querySelector('script[src*="static.ads-twitter.com"]');
        if (script && (script as HTMLScriptElement).readyState !== 'loading') {
          console.log('X Pixel fully initialized');
          resolve();
        } else {
          setTimeout(() => checkPixelReady(attempts + 1), 100);
        }
      };
      
      checkPixelReady();
    } catch (error) {
      console.error('Failed to load X Pixel:', error);
      reject(error);
    }
  });
}

/**
 * Track page view event
 */
export function trackPageView(url?: string): void {
  if (!isXPixelLoaded || typeof window === 'undefined') {
    console.log('X Pixel not loaded or not in browser environment');
    return;
  }

  if (!window.twq) {
    console.log('window.twq not available yet');
    return;
  }

  try {
    const eventId = `tw-${X_PIXEL_ID}-pageview`;
    const eventData = {
      content_name: url || window.location.pathname,
    };
    
    console.log('Tracking page view:', eventId, eventData);
    window.twq('event', eventId, eventData);
    console.log('Page view tracked successfully');
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: string,
  parameters?: {
    value?: number;
    currency?: string;
    content_id?: string;
    content_name?: string;
    content_category?: string;
    num_items?: number;
  }
): void {
  if (!isXPixelLoaded || typeof window === 'undefined') {
    return;
  }

  try {
    const eventId = `tw-${X_PIXEL_ID}-${eventName}`;
    window.twq('event', eventId, parameters);
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

/**
 * Track quiz completion (conversion event)
 */
export function trackQuizCompletion(): void {
  trackEvent('quiz_completed', {
    content_name: 'crypto_exchange_quiz',
    content_category: 'engagement',
  });
}

/**
 * Track exchange click (conversion event)
 */
export function trackExchangeClick(exchangeName: string): void {
  trackEvent('exchange_click', {
    content_name: exchangeName,
    content_category: 'conversion',
  });
}

/**
 * Check if X Pixel is loaded
 */
export function isXPixelEnabled(): boolean {
  return isXPixelLoaded;
}

/**
 * Reset X Pixel state (for testing/consent withdrawal)
 */
export function resetXPixel(): void {
  isXPixelLoaded = false;
  
  // Remove the script if it exists
  const existingScript = document.querySelector('script[src*="static.ads-twitter.com"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Clear the global twq function
  if (typeof window !== 'undefined' && window.twq) {
    delete window.twq;
  }
}