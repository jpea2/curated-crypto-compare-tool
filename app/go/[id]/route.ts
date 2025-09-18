import { NextRequest, NextResponse } from 'next/server';
import { getAffiliateUrl } from '@/lib/affiliate';
import { getProviderById } from '@/lib/matchEngine';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Get provider information
  const provider = getProviderById(id);
  
  if (!provider) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Get affiliate URL
  const affiliateUrl = getAffiliateUrl(provider.affiliate_id);
  
  if (!affiliateUrl) {
    // If no affiliate URL configured, redirect to home with error
    return NextResponse.redirect(new URL('/?error=no-affiliate-url', request.url));
  }

  // Redirect to affiliate URL
  return NextResponse.redirect(affiliateUrl, 301);
}