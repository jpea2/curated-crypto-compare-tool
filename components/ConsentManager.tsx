'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Shield, BarChart, Target, Settings, RefreshCw } from 'lucide-react';
import { useConsent, type ConsentPreferences } from '@/hooks/useConsent';
import { useState } from 'react';

export function ConsentManager() {
  const {
    preferences,
    updatePreferences,
    resetConsent,
    hasConsented,
    isLoaded,
  } = useConsent();

  const [tempPreferences, setTempPreferences] = useState<ConsentPreferences>(preferences);
  const [hasChanges, setHasChanges] = useState(false);

  if (!isLoaded) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Settings className="h-6 w-6 mr-3 text-blue-600" />
            Loading Cookie Preferences...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const updateTempPreference = (key: keyof ConsentPreferences, value: boolean) => {
    const newPreferences = {
      ...tempPreferences,
      [key]: key === 'necessary' ? true : value,
    };
    setTempPreferences(newPreferences);
    setHasChanges(JSON.stringify(newPreferences) !== JSON.stringify(preferences));
  };

  const handleSave = () => {
    updatePreferences(tempPreferences);
    setHasChanges(false);
  };

  const handleReset = () => {
    setTempPreferences(preferences);
    setHasChanges(false);
  };

  const handleResetAll = () => {
    resetConsent();
    setTempPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
    setHasChanges(false);
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Settings className="h-6 w-6 mr-3 text-blue-600" />
          Cookie Preferences
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          {hasConsented 
            ? 'Manage your cookie preferences. Changes will take effect immediately.'
            : 'You haven\'t set your cookie preferences yet. Please choose your preferences below.'
          }
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        {hasConsented && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Current Status:</strong> Preferences set on {new Date().toLocaleDateString()}
            </p>
            <p className="text-xs text-green-700 mt-1">
              Analytics: {preferences.analytics ? 'Enabled' : 'Disabled'} | 
              Marketing: {preferences.marketing ? 'Enabled' : 'Disabled'}
            </p>
          </div>
        )}

        {/* Essential Cookies */}
        <div className="flex items-start justify-between p-4 border rounded-lg bg-gray-50">
          <div className="flex items-start gap-3 flex-1">
            <Shield className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Essential Cookies</h4>
              <p className="text-sm text-gray-600 mt-1">
                Required for the website to function properly. These cannot be disabled.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Includes: Session management, security, basic site functionality
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
                Help us understand how visitors interact with our website to improve user experience.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Provider: Vercel Analytics (privacy-focused, cookie-less)
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
                Used for advertising and conversion tracking to show you relevant content and measure campaign effectiveness.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Provider: X.com (Twitter) Pixel - tracks conversions and ad performance
              </p>
            </div>
          </div>
          <Switch
            checked={tempPreferences.marketing}
            onCheckedChange={(checked) => updateTempPreference('marketing', checked)}
            className="mt-1"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t">
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save Preferences
          </Button>
          
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            Reset Changes
          </Button>

          <Button
            variant="outline"
            onClick={handleResetAll}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:border-red-300"
          >
            <RefreshCw className="h-4 w-4" />
            Reset All Cookies
          </Button>
        </div>

        {/* Additional Info */}
        <div className="text-xs text-gray-500 pt-4 border-t">
          <p>
            • Essential cookies are always active and cannot be disabled
          </p>
          <p>
            • Changes to marketing cookies will affect X.com conversion tracking
          </p>
          <p>
            • You can change these preferences at any time
          </p>
          <p>
            • Some features may not work properly if you disable certain cookies
          </p>
        </div>
      </CardContent>
    </Card>
  );
}