Here’s the fast, risk-focused take for Australia (with primary sources).

# Is this likely “financial product advice” or “arranging” (AFSL)?

* **Advice test (s766B):** It’s advice if you make a recommendation or opinion intended (or reasonably regarded as intended) to influence a person **about a financial product** or class of financial products. Pure **factual** feature comparisons are not advice; once you imply suitability (“best for you”) you risk advice. ([AustLII][1])
* **Arranging (s766C):** “Arranging” is a form of **dealing** in a financial product (e.g., bringing about, or helping to bring about, a person acquiring a financial product). It’s broad. If your flow steers a user directly into acquiring a **financial product**, you can trip this. ([AustLII][2])
* **Are spot-exchange accounts/spot crypto “financial products”?** ASIC’s current position (INFO 225—being updated) is: **some** crypto assets are financial products (e.g., MIS-like tokens, **derivatives**, some **stablecoins**, ETPs). If you stick to **spot trading of crypto assets that are not financial products** and don’t touch those product types, your AFSL exposure is materially lower. Note: ASIC released **draft updated INFO 225** on 4 Dec 2024—final guidance pending as at today (18 Sep 2025). ([ASIC][3])
* **Online content rules still apply:** Even if you avoid financial products, ASIC’s “discussing financial products online” page explains the **factual vs advice** line; do not present factual comparisons in a way that implies a recommendation. ([ASIC][4])

**Bottom line (AU):** A quiz-style **feature comparison of spot-only exchange functionality** (funding rails, KYC speed, UI, fees) can be kept **outside AFSL** if you: (1) avoid financial products (derivatives, staking/yield, ETPs), (2) avoid suitability language, and (3) don’t “arrange” a financial product. Disclaimers help but **do not** fix unlicensed conduct if your behaviour is actually advice/arranging. ([AustLII][1])

# Mandatory hygiene for a comparison/affiliate site (AU)

1. **Be factual, not advisory.** Present **criteria the user chooses** (filters/sorting). Avoid “best for you”, “safest”, “most suitable”, or nudges based on a user’s personal objectives. If you must summarise, use neutral phrasing (“supports PayID; ID in \~5 mins; maker/taker fee schedule available here”). ([ASIC][4])
2. **Exclude financial products.** No coverage of **derivatives**, **yield/staking**, **structured returns**, **ETPs/ETFs**. If a provider offers them, **hide** those items and links from your AU user flow. ([ASIC][3])
3. **No arranging pathways.** Don’t drive users into **opening** or **applying for** a financial product. Link to a provider’s generic homepage or spot-product info page—**not** to derivatives onboarding or product application funnels. ([AustLII][2])
4. **Advertising & claims (RG 234).** Claims must be **accurate, balanced, and supportable**; avoid superlatives unless you can substantiate. Keep fee examples precise and current. ([ASIC][5])
5. **Comparison-site transparency (ACCC).** Disclose: (a) you **don’t compare all providers**; (b) **how rankings work**; (c) **commercial relationships** (affiliate/referral). Make the basis of any ratings/awards obvious. ([ACCC][6])
6. **Affiliate disclosure is not optional.** Be upfront when links may earn you a commission; ensure any testimonials/reviews are **genuine** and not misleading. ([ACCC][7])
7. **Record your methodology.** Keep an audit trail of data sources, update cadence, ranking logic, and change logs in case of ASIC/ACCC scrutiny (recent actions against comparison sites emphasise transparency). ([Mondaq][8])
8. **General advice warning?** Only relevant if you **do** provide financial product advice (you shouldn’t). If you cross that line, a warning **doesn’t replace licensing** obligations. ([ASIC][9])

# Red flags that push you into AFSL territory

* Recommending “the best exchange for **you**” based on personal goals → can read like **personal or general advice** if a **financial product** is in scope. ([AustLII][1])
* Presenting or linking users into **derivatives**, **yield/staking**, **crypto ETPs**, or **fiat-backed stablecoins** (ASIC’s draft says these may be financial products) → **AFSL likely required**. ([ASIC Download][10])
* Paid placement that **biases rankings** without clear, prominent disclosure → ACCC/ASIC risk. ([ACCC][6])

# AUSTRAC / other regimes

* As an **affiliate/comparison site**, you’re **not** a digital currency exchange and don’t need **AUSTRAC registration**, provided you don’t **exchange** crypto/fiat or handle customer funds/KYC. (Still comply with **ACL** in all marketing.) ([ACCC][6])

# Minimal site copy (safe framing)

Use something like (keep it plain and prominent):

> “We provide factual comparisons of Australian **spot** crypto exchanges (no derivatives or interest products). Rankings reflect the filters you choose and our published methodology. We **may earn commissions** from some partners. We **don’t** provide financial product advice. Learn more about how we rank.”

(Important: this **does not** cure licensing if your conduct is advice/arranging. It just clarifies intent.) ([AustLII][1])

# Quick note for New Zealand (if you target NZ later)

* NZ’s **FSLAA/FMCA** regime licenses **regulated financial advice** about **financial products**. Many spot crypto assets aren’t financial products; **derivatives/stablecoins/ETPs** can be. Keep to factual spot-exchange comparisons and avoid product recommendations to stay outside the “financial advice service” perimeter; still observe fair-dealing rules. ([Financial Markets Authority][11])

---

## Action checklist for your build

* Remove any derivatives/yield/ETP content and links from AU flows. ([ASIC][3])
* Implement **methodology + coverage** pages and **affiliate disclosure** banners. ([ACCC][6])
* Force users to **choose filters**; default sort = **alphabetical** or **user-selected metric**, not “recommended”. ([ASIC][4])
* Strip “best/safest/simplest for you” language; keep fee and feature statements **factual & sourced**. ([ASIC Download][12])
* Keep data logs and review content regularly (date-stamp tables). Recent enforcement shows comparison sites are under the microscope. ([Mondaq][8])

**Net assessment (AU):** If you keep it **spot-only**, **factual**, and **transparent**, your model is **likely outside AFSL**. The moment you touch **financial products** or imply **suitability**, you risk “advice/arranging” and AFSL obligations. Get targeted legal sign-off before launch to confirm your exact UX and copy against **s766B/s766C**, INFO 225 (draft updates), and ACCC comparator guidance. ([AustLII][1])

[1]: https://www5.austlii.edu.au/au/legis/cth/consol_act/ca2001172/s766b.html?utm_source=chatgpt.com "CORPORATIONS ACT 2001 - SECT 766B Meaning of financial product advice ..."
[2]: https://www5.austlii.edu.au/au/legis/cth/consol_act/ca2001172/s766c.html?utm_source=chatgpt.com "CORPORATIONS ACT 2001 - SECT 766C Meaning of dealing"
[3]: https://asic.gov.au/about-asic/news-centre/find-a-media-release/2021-releases/21-285mr-asic-releases-guidance-on-crypto-asset-related-investment-products/?utm_source=chatgpt.com "ASIC releases guidance on crypto-asset related investment products"
[4]: https://asic.gov.au/regulatory-resources/financial-services/giving-financial-product-advice/discussing-financial-products-and-services-online?utm_source=chatgpt.com "Discussing financial products and services online - ASIC"
[5]: https://asic.gov.au/regulatory-resources/find-a-document/regulatory-guides/rg-234-advertising-financial-products-and-services-including-credit-good-practice-guidance/?utm_source=chatgpt.com "RG 234 Advertising financial products and services (including ... - ASIC"
[6]: https://www.accc.gov.au/about-us/publications/a-guide-to-comparator-websites-for-website-operators-and-suppliers?utm_source=chatgpt.com "A guide to comparator websites for website operators and suppliers | ACCC"
[7]: https://www.accc.gov.au/business/selling-products-and-services/small-business-toolkit/misleading-conduct-and-advertising/online-reviews-must-be-genuine?utm_source=chatgpt.com "Online reviews must be genuine | ACCC"
[8]: https://www.mondaq.com/australia/product-liability-safety/1659708/asic-enforcement-comparison-websites?utm_source=chatgpt.com "ASIC Enforcement – Comparison Websites - Product Liability & Safety ..."
[9]: https://asic.gov.au/regulatory-resources/find-a-document/regulatory-guides/rg-244-giving-information-general-advice-and-scaled-advice/?utm_source=chatgpt.com "RG 244 Giving information, general advice and scaled advice | ASIC"
[10]: https://download.asic.gov.au/media/iktkpn20/attachment-to-cp381-published-4-december-2024.pdf?utm_source=chatgpt.com "Attachment to CP 381 Draft updated INFO 225 Digital assets: Financial ..."
[11]: https://www.fma.govt.nz/business/legislation/new-financial-advice-regime/?utm_source=chatgpt.com "Financial Services Legislation Amendment Act 2019 (FSLAA)"
[12]: https://download.asic.gov.au/media/rkzj5nxb/rg234-published-15-november-2012-20211008.pdf?utm_source=chatgpt.com "Regulatory Guide RG 234 Advertising financial products and ... - ASIC"
