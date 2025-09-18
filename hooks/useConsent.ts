'use client';

import { useState, useEffect } from 'react';

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface ConsentState {
  hasConsented: boolean;
  preferences: ConsentPreferences;
  showBanner: boolean;
}

const CONSENT_KEY = 'cookie-consent';

const defaultPreferences: ConsentPreferences = {
  necessary: true, // Always true, required for site functionality
  analytics: false,
  marketing: false,
};

const defaultState: ConsentState = {
  hasConsented: false,
  preferences: defaultPreferences,
  showBanner: true,
};

export function useConsent() {
  const [consentState, setConsentState] = useState<ConsentState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load consent state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (saved) {
        const parsedState = JSON.parse(saved);
        setConsentState({
          ...parsedState,
          showBanner: !parsedState.hasConsented,
        });
      }
    } catch (error) {
      console.warn('Failed to load consent preferences:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save consent state to localStorage
  const saveConsent = (newState: ConsentState) => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(newState));
      setConsentState(newState);

      // Notify other parts of the app (same tab) that consent changed
      if (typeof window !== 'undefined') {
        const evt = new CustomEvent('consent:updated', { detail: newState });
        window.dispatchEvent(evt);
      }
    } catch (error) {
      console.warn('Failed to save consent preferences:', error);
    }
  };

  // Accept all cookies
  const acceptAll = () => {
    const newState: ConsentState = {
      hasConsented: true,
      preferences: {
        necessary: true,
        analytics: true,
        marketing: true,
      },
      showBanner: false,
    };
    saveConsent(newState);
  };

  // Accept only necessary cookies
  const acceptNecessary = () => {
    const newState: ConsentState = {
      hasConsented: true,
      preferences: {
        necessary: true,
        analytics: false,
        marketing: false,
      },
      showBanner: false,
    };
    saveConsent(newState);
  };

  // Update specific preferences
  const updatePreferences = (preferences: ConsentPreferences) => {
    const newState: ConsentState = {
      hasConsented: true,
      preferences: {
        ...preferences,
        necessary: true, // Always true
      },
      showBanner: false,
    };
    saveConsent(newState);
  };

  // Show preferences modal
  const showPreferences = () => {
    setConsentState(prev => ({ ...prev, showBanner: true }));
  };

  // Hide banner without saving (for dismiss)
  const hideBanner = () => {
    setConsentState(prev => ({ ...prev, showBanner: false }));
  };

  // Reset all consent (for testing/opt-out)
  const resetConsent = () => {
    localStorage.removeItem(CONSENT_KEY);
    setConsentState(defaultState);
    // Broadcast reset event for listeners (e.g., to disable pixels)
    if (typeof window !== 'undefined') {
      const evt = new CustomEvent('consent:updated', { detail: defaultState });
      window.dispatchEvent(evt);
    }
  };

  // Debug logging removed for production cleanliness

  return {
    ...consentState,
    isLoaded,
    acceptAll,
    acceptNecessary,
    updatePreferences,
    showPreferences,
    hideBanner,
    resetConsent,
  };
}
