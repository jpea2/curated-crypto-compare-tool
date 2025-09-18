# AFSL Compliance Analysis Report
**Date:** 18 September 2025
**Website:** CuratedCryptoInsights (AU/NZ Crypto Exchange Finder)
**Analysis Framework:** Based on check-for-advice.md guidelines

## Executive Summary

The website shows **good compliance awareness** but has **several red flags** that could push it into AFSL territory under s766B (financial product advice) and s766C (arranging). Key issues include recommendation language, ranking mechanisms that could constitute advice, and potential exposure to financial products.

### Risk Assessment: ⚠️ **MEDIUM-HIGH RISK**

## Detailed Findings

### 1. Financial Product Advice Analysis (s766B)

#### ✅ **COMPLIANT ELEMENTS:**
- Clear general advice warnings on home page and results page
- "General information only - not financial advice" disclaimers
- Focus on factual comparison approach
- No explicit "best for you" personal advice language

#### ⚠️ **RISK AREAS:**
1. **Implicit Recommendation Language** (components/ProviderCard.tsx:127-135):
   ```typescript
   <h4 className="font-medium text-gray-900">Why {provider.name}</h4>
   <div className="space-y-1">
     {reasons.map((reason, index) => (
       <p key={index} className="text-sm text-green-700 bg-green-50 px-2 py-1 rounded">
         • {reason}
       </p>
     ))}
   </div>
   ```
   **Issue:** "Why [Provider]" sections provide personalized reasoning that could be interpreted as advice about suitability.

2. **Scoring-Based Rankings** (lib/matchEngine.ts:68-191):
   - Complex algorithm that scores providers based on user answers
   - Uses experience-level adjustments that could constitute personal advice
   - Example: "beginners might get overwhelmed by too many options" logic

3. **Top Match Designation** (components/ResultsList.tsx:89-99):
   ```typescript
   <h3 className="text-2xl font-bold text-gray-900 mb-6">Matches</h3>
   ```
   **Issue:** Presenting "Top Matches" could be seen as recommending specific exchanges.

### 2. Arranging Analysis (s766C)

#### ⚠️ **HIGH RISK:**
1. **Direct Affiliate Links** (components/ProviderCard.tsx:141-147):
   ```typescript
   <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
     <Link href={`/go/${provider.affiliate_id}`} target="_blank" rel="noopener noreferrer">
       Visit {provider.name}
       <ExternalLink className="ml-2 h-4 w-4" />
     </Link>
   </Button>
   ```
   **Issue:** Direct CTA buttons to exchange signup could constitute "arranging" under s766C.

2. **Redirect Mechanism** (app/go/[id]/route.ts):
   - Server route that redirects users to affiliate URLs
   - Could be seen as facilitating acquisition of financial products

### 3. Financial Products Exposure

#### ⚠️ **POTENTIAL RISK:**
1. **Provider Data** (data/providers.json):
   - Some exchanges offer derivatives, staking, ETPs beyond spot trading
   - Advanced features flag may include financial products
   - No explicit filtering of financial product links in user journey

2. **Coverage Statement** (app/methodology/page.tsx:162):
   ```typescript
   <li>Spot cryptocurrency trading only</li>
   ```
   **Positive:** Claims spot-only coverage, but unclear if enforced in affiliate links.

### 4. Transparency & Disclosure Analysis

#### ✅ **STRONG COMPLIANCE:**
1. **Comprehensive Affiliate Disclosure** (app/affiliate-disclosure/page.tsx):
   - Clear revenue model explanation
   - Algorithm independence claims
   - Partner identification
   - Multiple disclosure points throughout site

2. **Methodology Transparency** (app/methodology/page.tsx):
   - Detailed algorithm explanation
   - Data source disclosure
   - Coverage limitations clearly stated

3. **Partner Labeling** (components/ProviderCard.tsx:80-87):
   ```typescript
   {getPartnerBadges().map(badge => (
     <Badge key={badge} variant="outline" className="border-purple-300 text-purple-700">
       {badge}
     </Badge>
   ))}
   ```

### 5. Website Copy Analysis

#### ⚠️ **PROBLEMATIC LANGUAGE:**

1. **Home Page** (app/page.tsx:38-43):
   ```typescript
   <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
     Find crypto exchanges that match your preferences
   ```
   **Issue:** "Match your preferences" could imply suitability assessment.

2. **Quiz Language** (components/QuizForm.tsx:170-172):
   ```typescript
   {isLastQuestion ? 'Find Matches' : 'Next'}
   ```
   **Issue:** "Find Matches" suggests personalized recommendations.

3. **Results Summary** (components/ResultsList.tsx:57-58):
   ```typescript
   <h2 className="text-2xl font-bold text-gray-900 mb-4">
     {results.length} Results
   </h2>
   ```
   **Better than:** Could be worse - avoids "recommendations" language.

## Critical Compliance Gaps

### 1. Grey Area: Recommendation vs Information
- **Current:** Complex matching algorithm with personalized scoring
- **Risk:** Could be interpreted as providing advice about suitability
- **ASIC Position:** Factual comparisons OK, but implied suitability = advice

### 2. Arranging Concerns
- **Current:** Direct affiliate CTAs to exchange signup pages
- **Risk:** May constitute "arranging" acquisition of financial products
- **Safer Alternative:** Link to provider homepage, not signup flows

### 3. Financial Product Scope
- **Current:** Claims "spot only" but unclear enforcement
- **Risk:** Users may be directed to financial product signup flows
- **ASIC Alert:** Draft INFO 225 may expand financial product definitions

## Recommendations

### Priority 1: Critical Changes

1. **Remove Advisory Language:**
   - Change "Why [Provider]" to "Features matching your criteria"
   - Replace "Find Matches" with "View Options"
   - Avoid "match your preferences" → "meet your stated criteria"

2. **Modify CTA Flow:**
   - Link to provider home pages, not direct signup
   - Add intermediate page warning about financial product scope
   - Consider removing direct affiliate links

3. **Strengthen Disclaimers:**
   ```
   "We provide factual comparisons of Australian spot crypto exchanges
   (no derivatives or interest products). Rankings reflect the filters
   you choose and our published methodology. We may earn commissions
   from some partners. We don't provide financial product advice."
   ```

### Priority 2: Algorithm Changes

1. **Simplify Scoring:**
   - Remove experience-based personalization
   - Use objective metrics only (fees, coin count, ease scores)
   - Remove "suitability" reasoning in match explanations

2. **Default to Alphabetical:**
   - Sort by user-selected criteria, then alphabetically
   - Remove "Top Matches" designation
   - Show all qualifying results equally

### Priority 3: Scope Clarification

1. **Enforce Spot-Only:**
   - Add provider screening for financial product offerings
   - Block affiliate links to derivative/staking products
   - Update methodology to exclude financial product providers

2. **Add Warning Pages:**
   - Intermediate page before external links
   - Clear statement about financial product risks
   - Link to independent advice resources

## Compliance File Checklist

Based on check-for-advice.md requirements:

- [ ] Remove derivatives/yield/ETP content and links from AU flows
- [x] Implement methodology + coverage pages
- [x] Add affiliate disclosure banners
- [ ] Force users to choose filters; default sort = alphabetical
- [ ] Strip "best/safest/simplest for you" language
- [x] Keep fee and feature statements factual & sourced
- [ ] Keep data logs and review content regularly

## Legal Recommendation

**Seek targeted legal advice** before launch to confirm the exact UX and copy against s766B/s766C, particularly:
1. Whether the matching algorithm constitutes "advice"
2. Whether affiliate CTAs constitute "arranging"
3. Current scope of INFO 225 financial products definition
4. Appropriate disclaimer language for the business model

## Conclusion

The website shows strong compliance awareness with excellent transparency measures. However, the recommendation-style algorithm and direct affiliate funnels create significant AFSL risk. With the suggested modifications, the site could likely operate outside AFSL requirements while maintaining its utility to users.

The moment the site touches financial products or implies suitability beyond factual comparison, AFSL obligations become likely.