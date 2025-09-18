'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Cookie, Settings, Shield, BarChart, Target } from 'lucide-react';
import { useConsent, type ConsentPreferences } from '@/hooks/useConsent';
import Link from 'next/link';

export function CookieConsent() {
  const {
    showBanner,
    isLoaded,
    preferences,
    acceptAll,
    acceptNecessary,
    updatePreferences,
    hideBanner,
  } = useConsent();
  
  const [showPreferences, setShowPreferences] = useState(false);
  const [tempPreferences, setTempPreferences] = useState<ConsentPreferences>(preferences);

  // Don't render until loaded to prevent hydration issues
  if (!isLoaded || !showBanner) {
    return null;
  }

  const handleShowPreferences = () => {
    setTempPreferences(preferences);
    setShowPreferences(true);
  };

  const handleSavePreferences = () => {
    updatePreferences(tempPreferences);
    setShowPreferences(false);
  };

  const handleClosePreferences = () => {
    setTempPreferences(preferences);
    setShowPreferences(false);
  };

  const updateTempPreference = (key: keyof ConsentPreferences, value: boolean) => {
    setTempPreferences(prev => ({
      ...prev,
      [key]: key === 'necessary' ? true : value, // Necessary is always true
    }));
  };

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <Card className="mx-auto max-w-4xl border-2 border-blue-200 bg-white shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <Cookie className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    We use cookies to improve your experience
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    We use cookies for analytics and marketing to help us understand how you use our site 
                    and show you relevant content. You can choose which cookies to accept.
                  </p>
                  <Link 
                    href="/privacy" 
                    className="text-xs text-blue-600 hover:underline"
                    target="_blank"
                  >
                    Learn more in our Privacy Policy →
                  </Link>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShowPreferences}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Customize
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={acceptNecessary}
                >
                  Essential Only
                </Button>
                <Button
                  size="sm"
                  onClick={acceptAll}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preferences Dialog */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Cookie Preferences
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <p className="text-sm text-gray-600">
              Choose which cookies you want to accept. You can change your preferences at any time 
              from our privacy policy page.
            </p>

            {/* Necessary Cookies */}
            <div className="flex items-start justify-between p-4 border rounded-lg bg-gray-50">
              <div className="flex items-start gap-3 flex-1">
                <Shield className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Essential Cookies</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Required for the website to function properly. These cannot be disabled.
                  </p>
                </div>
              </div>
              <Switch
                checked={true}
                disabled={true}
                className="mt-1"
              />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex items-start gap-3 flex-1">
                <BarChart className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Help us understand how visitors interact with our website (Vercel Analytics).
                  </p>
                </div>
              </div>
              <Switch
                checked={tempPreferences.analytics}
                onCheckedChange={(checked) => updateTempPreference('analytics', checked)}
                className="mt-1"
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex items-start gap-3 flex-1">
                <Target className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Used for advertising and conversion tracking (X.com Pixel) to show relevant content.
                  </p>
                </div>
              </div>
              <Switch
                checked={tempPreferences.marketing}
                onCheckedChange={(checked) => updateTempPreference('marketing', checked)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleClosePreferences}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePreferences}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}