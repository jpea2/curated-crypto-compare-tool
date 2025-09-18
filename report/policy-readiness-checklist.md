# Policy Readiness Checklist (AU/NZ)

Last reviewed: TODO set date before launch
Owner: TODO assign

This checklist captures the remaining gaps and decisions to launch with compliant Terms of Service and Privacy Policy for Australia and New Zealand. Use the checkboxes to track progress. Copy‑ready clauses are included where helpful.

Quick links:
- Terms: `app/terms/page.tsx`
- Privacy: `app/privacy/page.tsx`
- Affiliate Disclosure: `app/affiliate-disclosure/page.tsx`
- Methodology: `app/methodology/page.tsx`
- Footer: `components/Footer.tsx`
- Consent: `components/CookieConsent.tsx`, `components/ConsentManager.tsx`, `hooks/useConsent.ts`
- Business info: `lib/siteConfig.ts`

---

## 0) Decisions To Confirm (before edits)
- [ ] Governing law and venue: choose state/territory (e.g., New South Wales, Victoria, Queensland) for Terms jurisdiction and courts
- [ ] Public contact details: confirm `NEXT_PUBLIC_PRIVACY_EMAIL` and whether to publish a physical/registered address (recommended)
- [ ] Overseas processing countries to list (likely: Australia, United States, European Union via Vercel/X)
- [ ] Confirm provider retention: analytics (2 years aggregated), logs (30 days) — verify with Vercel defaults
- [ ] Age eligibility: confirm “18+ only” (recommended)
- [ ] Launch date: set “Last updated” dates consistently across Terms and Privacy

---

## 1) Terms of Service — Required Updates
File: `app/terms/page.tsx`

- [ ] Business identification (display on page)
  - Surface BUSINESS_NAME and BUSINESS_ABN near the header.
  - Source: `lib/siteConfig.ts`
- [ ] Australian Consumer Law (ACL) and NZ Consumer Guarantees (CGA) clause
  - Add explicit statement that nothing limits non‑excludable consumer rights.
- [ ] No liability wording aligned to ACL/CGA
  - Prefix with “To the maximum extent permitted by law …” and ensure it is subject to the above consumer guarantees clause.
- [ ] Third‑party links/no endorsement
  - Clarify you don’t control or endorse third‑party sites and aren’t responsible for their content/terms.
- [ ] Intellectual property and license
  - State site content is your IP; personal, non‑commercial license; prohibit scraping/copying without consent.
- [ ] Eligibility and territory
  - “You must be at least 18 years old. The service is intended for users in Australia and New Zealand.”
- [ ] Service availability; suspension/termination
  - Reserve rights to change/suspend/discontinue features and to suspend/terminate access for breach or legal reasons.
- [ ] Governing law and courts (specific)
  - Replace general “Australian law” with the selected state/territory and its courts’ exclusive jurisdiction.
- [ ] Contact details in Terms
  - Include an email (and address if available) for legal/terms enquiries (can reference Privacy contact).
- [ ] Boilerplate
  - Add brief “Severability, Waiver, Assignment, Entire Agreement” statements.
- [ ] Sync “Last updated” date to launch date

### Copy‑Ready Clauses (Terms)

ACL/CGA (place near Legal Disclaimers):

> Australian Consumer Law and NZ Consumer Guarantees: Nothing in these Terms excludes, restricts or modifies any consumer guarantees, rights or remedies you may have under the Australian Consumer Law or the New Zealand Consumer Guarantees Act 1993 that cannot be lawfully excluded. To the extent permitted by law, and subject to those non‑excludable rights, our liability is limited as set out in these Terms.

No Liability (replace/augment existing):

> To the maximum extent permitted by law, the Service is provided “as is” and we make no warranties or guarantees of any kind. Features, fees and availability may change without notice. We are not responsible for loss or damage arising from your use of any exchange or third‑party service. You must verify current information directly with providers. Cryptocurrency involves significant risk. This clause is subject to the ACL/CGA clause above and does not limit your non‑excludable rights.

Third‑Party Links:

> Third‑Party Sites: The Service links to third‑party websites and resources. We do not control or endorse them and are not responsible for their content, terms, privacy practices, products or services. You access third‑party sites at your own risk.

Intellectual Property and License:

> Intellectual Property: The Service and all content are owned by us or our licensors and are protected by law. We grant you a limited, revocable, non‑exclusive, non‑transferable license to access and use the Service for your personal, non‑commercial use. You must not copy, reproduce, distribute, scrape, frame, mirror or create derivative works without our prior written consent.

Eligibility and Territory:

> Eligibility and Territory: You must be at least 18 years old to use the Service. The Service is intended for users located in Australia and New Zealand.

Availability and Termination:

> Availability and Termination: We may modify, suspend or discontinue any part of the Service at any time. We may suspend or terminate your access if you breach these Terms or where required to comply with law.

Governing Law and Jurisdiction (replace generic clause):

> Governing Law and Jurisdiction: These Terms are governed by the laws of [STATE/TERRITORY], Australia. The courts of [STATE/TERRITORY] have exclusive jurisdiction over any dispute arising in connection with these Terms or the Service.

Boilerplate:

> Severability: If any provision is invalid or unenforceable, the remainder remains in effect.
>
> Waiver: A failure to enforce a right is not a waiver of that right.
>
> Assignment: You may not assign or transfer your rights without our written consent; we may assign without restriction.
>
> Entire Agreement: These Terms constitute the entire agreement regarding the Service and supersede prior understandings.

Contact:

> Contact: For questions about these Terms, contact us at privacy@…

---

## 2) Privacy Policy — Required Updates
File: `app/privacy/page.tsx`

- [ ] “About us” block (surface business details)
  - State issuer name and ABN; include contact and optional address.
- [ ] Overseas disclosure (APP 8)
  - Name likely countries and state you take reasonable steps to ensure APP‑compliant handling.
- [ ] Anonymity and pseudonymity (APP 2)
  - Users can browse/use the site without identifying themselves; how to adjust cookies.
- [ ] Access and correction (APP 12–13)
  - Explicitly describe process, verification, typical timeframes and outcomes.
- [ ] Direct marketing (APP 7)
  - Only with consent (X Pixel); opt‑out anytime via Cookie Preferences.
- [ ] Government‑related identifiers (APP 9)
  - State you do not use or adopt government identifiers.
- [ ] Notifiable Data Breaches (NDB) scheme
  - State you assess suspected breaches and notify affected individuals and OAIC if likely to cause serious harm.
- [ ] Children
  - Not directed to under‑18s; no knowing collection.
- [ ] Retention clarifications
  - Confirm analytics aggregation/anonymization and provider retention; confirm server log period.
- [ ] Sync “Last updated” date to launch date

### Copy‑Ready Clauses (Privacy)

About Us:

> This Privacy Policy is issued by AXIOS VENTURES PTY LTD (ABN 23 690 953 845). For privacy questions, access/correction requests or complaints, contact privacy@…

Overseas Disclosure:

> Overseas Disclosure: We use service providers that may process information in Australia and overseas, including the United States and the European Union. We take reasonable steps to ensure overseas recipients handle information in accordance with the Australian Privacy Principles.

Anonymity and Pseudonymity (APP 2):

> Anonymity and Pseudonymity: You may use our website without identifying yourself. You can also adjust Analytics and Marketing choices at any time in Cookie Preferences.

Access and Correction (APP 12–13):

> Access and Correction: You may request access to, or correction of, personal information we hold about you by contacting us. We will verify your identity, respond within a reasonable period (typically within 30 days) and provide reasons if we refuse a request, along with how to complain.

Direct Marketing (APP 7):

> Direct Marketing: We conduct online marketing (e.g., X.com conversion tracking) only with your consent. You can withdraw consent at any time in Cookie Preferences. We do not send marketing emails.

Government Identifiers (APP 9):

> Government Identifiers: We do not use or adopt government‑related identifiers (such as TFN or Medicare numbers) as our own identifiers.

Notifiable Data Breaches:

> Data Breach Notifications: We assess suspected data breaches and, where required, notify affected individuals and the Office of the Australian Information Commissioner (OAIC) if a breach is likely to result in serious harm.

Children:

> Children: Our website is not directed to individuals under 18 and we do not knowingly collect personal information from children.

Retention Clarification:

> Retention: Quiz responses are not stored server‑side. Analytics data is aggregated/anonymized and retained for up to 2 years. Server logs are retained for approximately 30 days for security. Retention periods may vary by provider.

---

## 3) Cookies and Consent — Minor Enhancements
Files: `components/Footer.tsx`, `components/CookieConsent.tsx`, `app/privacy/page.tsx`

- [ ] Add “Manage Cookie Preferences” link in the footer pointing to `/privacy` (where the ConsentManager lives)
- [ ] Confirm default consent state (necessary=true, analytics=false, marketing=false)
- [ ] Confirm X Pixel only loads when `marketing=true` (already implemented)

Suggested footer entry:

> Add under Legal section: `Manage Cookies` → `/privacy`

---

## 4) Affiliate Disclosure & Methodology — Optional Improvements

- [ ] Consider listing current partners dynamically
  - Use `lib/affiliate.ts#getPartnerList()` to render names from `data/providers.json` with a date stamp.
- [ ] Keep independence statements and partner labeling (already present)

---

## 5) QA Checklist (post‑edit)

- [ ] “Last updated” dates match and are current (Terms, Privacy)
- [ ] BUSINESS_NAME and ABN rendered on both pages
- [ ] Terms include ACL/CGA, IP, third‑party, eligibility, availability/termination, governing law (state/territory), boilerplate, contact
- [ ] Privacy includes overseas disclosure, anonymity/pseudonymity, access & correction, APP 7, APP 9, NDB, children, retention clarifications
- [ ] Footer includes Manage Cookies link; ConsentManager visible and functional
- [ ] X Pixel loads only with explicit marketing consent; toggling off removes pixel and script
- [ ] All internal links work and disclosures are accessible from every page (Footer)

---

## 6) External Legal Review (recommended providers)

- LegalVision (AU) — fixed‑fee, fintech friendly
- Sprintlaw (AU/NZ) — startup packages; can tailor for comparison sites/affiliate models
- Lawpath (AU) — templates plus lawyer review
- Generators (baseline drafts; still get reviewed): iubenda, TermsFeed, GetTerms.io

---

## 7) Implementation Map (file pointers)

- Terms edits: `app/terms/page.tsx` (add new Card sections or paragraphs under existing “Legal Disclaimers”, “Governing Law”, and near header for business details)
- Privacy edits: `app/privacy/page.tsx` (add “About us” near header; new Card sections for APP items and NDB; update contact/rights)
- Footer link: `components/Footer.tsx` (add `Manage Cookies` → `/privacy`)
- Business details: `lib/siteConfig.ts` (already defined; ensure used in pages)

---

## TSX Drop-in Snippets (ready to paste)

Below are JSX/TSX blocks styled to match your current UI (Card, CardHeader, CardTitle, CardContent). Paste these into the relevant pages inside the <main> content area. Add the import shown first if not already present.

### Shared import (Terms/Privacy)

    import { BUSINESS_NAME, BUSINESS_ABN, PRIVACY_EMAIL } from '@/lib/siteConfig';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

### Terms — Business Information (place near top)

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">Business Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          This service is provided by {BUSINESS_NAME} (ABN {BUSINESS_ABN}). For queries about these Terms, contact us at{' '}
          <a href={'mailto:' + PRIVACY_EMAIL} className="text-blue-600 hover:underline">{PRIVACY_EMAIL}</a>.
        </p>
      </CardContent>
    </Card>

### Terms — Consumer Guarantees (ACL/CGA)

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">Consumer Guarantees</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          Nothing in these Terms excludes, restricts or modifies any consumer guarantees, rights or remedies you may have
          under the Australian Consumer Law or the New Zealand Consumer Guarantees Act 1993 that cannot be lawfully excluded.
          To the extent permitted by law, and subject to those non‑excludable rights, our liability is limited as set out in these Terms.
        </p>
      </CardContent>
    </Card>

### Terms — No Liability (ACL-safe)

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">No Liability</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          To the maximum extent permitted by law, the Service is provided “as is” and we make no warranties or guarantees.
          Features, fees and availability may change without notice. We are not responsible for any loss or damage arising from
          your use of any exchange or third‑party service. You must verify current information directly with providers.
          Cryptocurrency involves significant risk. This clause is subject to the Consumer Guarantees above and does not
          limit non‑excludable rights.
        </p>
      </CardContent>
    </Card>

### Terms — Third‑Party Sites

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">Third‑Party Sites</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          Our site links to third‑party websites and resources. We do not control or endorse them and are not responsible for their
          content, terms, privacy practices, products or services. You access third‑party sites at your own risk.
        </p>
      </CardContent>
    </Card>

### Terms — Intellectual Property & License

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">Intellectual Property & License</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          The Service and all content are owned by us or our licensors. We grant you a limited, revocable, non‑exclusive,
          non‑transferable license to access and use the Service for your personal, non‑commercial use. You must not copy,
          reproduce, distribute, scrape, frame, mirror or create derivative works without our prior written consent.
        </p>
      </CardContent>
    </Card>

### Terms — Eligibility & Territory

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">Eligibility & Territory</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          You must be at least 18 years old to use the Service. The Service is intended for users located in Australia and New Zealand.
        </p>
      </CardContent>
    </Card>

### Terms — Availability & Termination

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">Availability & Termination</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          We may modify, suspend or discontinue any part of the Service at any time. We may suspend or terminate your access if you
          breach these Terms or where required to comply with law.
        </p>
      </CardContent>
    </Card>

### Terms — Governing Law & Jurisdiction (placeholder)

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">Governing Law & Jurisdiction</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          These Terms are governed by the laws of [STATE/TERRITORY], Australia. The courts of [STATE/TERRITORY] have exclusive
          jurisdiction over any dispute arising in connection with these Terms or the Service.
        </p>
      </CardContent>
    </Card>

### Terms — Boilerplate

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">General</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-gray-700">
        <p><strong>Severability:</strong> If any provision is invalid or unenforceable, the remainder remains in effect.</p>
        <p><strong>Waiver:</strong> A failure to enforce a right is not a waiver of that right.</p>
        <p><strong>Assignment:</strong> You may not assign your rights without our written consent; we may assign without restriction.</p>
        <p><strong>Entire Agreement:</strong> These Terms constitute the entire agreement regarding the Service and supersede prior understandings.</p>
      </CardContent>
    </Card>

### Privacy — About Us (place near top)

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">About Us</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          This Privacy Policy is issued by {BUSINESS_NAME} (ABN {BUSINESS_ABN}). For privacy questions, access/correction requests or
          complaints, contact us at {' '}<a href={'mailto:' + PRIVACY_EMAIL} className="text-blue-600 hover:underline">{PRIVACY_EMAIL}</a>.
        </p>
      </CardContent>
    </Card>

### Privacy — Overseas Disclosure (APP 8)

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">Overseas Disclosure</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          We use service providers that may process information in Australia and overseas, including the United States and the European Union.
          We take reasonable steps to ensure overseas recipients handle information in accordance with the Australian Privacy Principles.
        </p>
      </CardContent>
    </Card>

### Privacy — Anonymity & Pseudonymity (APP 2)

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">Anonymity & Pseudonymity</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          You may use our website without identifying yourself. You can adjust Analytics and Marketing choices at any time in Cookie Preferences.
        </p>
      </CardContent>
    </Card>

### Privacy — Access & Correction (APP 12–13)

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">Access & Correction</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          You may request access to, or correction of, personal information we hold by contacting us. We will verify your identity and
          respond within a reasonable period (typically within 30 days). If we refuse a request, we will provide reasons and how to complain.
        </p>
      </CardContent>
    </Card>

### Privacy — Direct Marketing (APP 7)

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">Direct Marketing</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          We conduct online marketing (e.g., X.com conversion tracking) only with your consent. You can withdraw consent at any time in
          Cookie Preferences. We do not send marketing emails.
        </p>
      </CardContent>
    </Card>

### Privacy — Government Identifiers (APP 9)

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">Government Identifiers</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          We do not use or adopt government‑related identifiers (such as TFN or Medicare numbers) as our own identifiers.
        </p>
      </CardContent>
    </Card>

### Privacy — Notifiable Data Breaches (NDB)

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">Data Breach Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          We assess suspected data breaches and, where required, notify affected individuals and the Office of the Australian Information
          Commissioner (OAIC) if a breach is likely to result in serious harm.
        </p>
      </CardContent>
    </Card>

### Privacy — Children

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">Children</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">
          Our website is not directed to individuals under 18 and we do not knowingly collect personal information from children.
        </p>
      </CardContent>
    </Card>

### Privacy — Retention Clarification

    <Card className="border-0 shadow-md bg-white/60">
      <CardHeader>
        <CardTitle className="text-lg">Data Retention</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
          <li>Quiz responses: Not stored server‑side (only in your browser session).</li>
          <li>Analytics: Aggregated/anonymized and retained for up to 2 years.</li>
          <li>Server logs: Retained for ~30 days for security.</li>
        </ul>
        <p className="text-xs text-gray-600 mt-2">Retention periods may vary by provider.</p>
      </CardContent>
    </Card>

### Footer — Manage Cookies link (Legal section)

    // In components/Footer.tsx, under the Legal list
    <li><Link href="/privacy" className="hover:text-white">Manage Cookies</Link></li>
