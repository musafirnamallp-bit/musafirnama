# Musafirnama

Tours and travel website at [www.musafirnama.in](https://www.musafirnama.in/), built with React 18, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

Repository: [musafirnamallp-bit/musafirnama](https://github.com/musafirnamallp-bit/musafirnama). Vercel project: `musafirnama`. Use the business account `musafirnamallp-bit` / `musafirnamallp@gmail.com` for project administration. Account credentials are separate from the public contact information shown on the website.

## Local development

Run commands from this repository directory. Use Node.js with built-in TypeScript support: tests import `.ts` files directly. Local tooling was checked with Node.js 26.11.1.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

The development server uses port **8080**. Optional configuration can remain empty. Restart Vite after changing environment variables.

## Build, check, and preview

Run the deployment checks in this order; the tests inspect the generated site in `dist`:

```sh
npm run typecheck
npm run build
npm test
npm run preview
```

The production preview is available at **http://127.0.0.1:4173**; set `PORT` to change it. It serves clean URLs, redirects, and real HTTP 404 responses. `npm run lint` is also available for repository linting.

Tests cover quote validation and API response handling, local mock endpoint restrictions, analytics consent, and generated HTML. The site checks verify sitemap coverage, rendered headings, unique metadata, canonical URLs, JSON-LD, internal links and anchors, image assets, and indexing rules. Automated enquiry tests use mocks and do not send real leads.

## How the site is built

- `src/App.tsx` defines routes; route components are split into separate JavaScript bundles.
- `src/entry-server.tsx` renders each route at build time. `scripts/prerender.mjs` writes complete HTML, page metadata, JSON-LD, `sitemap.xml`, and `robots.txt` into `dist`.
- `src/main.tsx` hydrates that HTML in the browser. `dist-ssr` is an intermediate build output, not the deployment directory.
- `src/lib/seo.ts` owns metadata and the lists of public and prerendered routes. Quote/customization forms and the 404 page are `noindex` and excluded from the sitemap.
- `src/lib/packageData.ts` contains destination/package content; `src/lib/travelGuides.ts` contains editorial guides. Prices are indicative and itineraries are examples, subject to a confirmed quote.
- `src/components/QuoteRequestForm.tsx` powers both enquiry flows. `src/lib/siteConfig.ts` owns optional public contact details; `src/lib/analytics.ts` owns tracking.

When adding a page, update routing and the SEO/prerender configuration together, add internal links, then rebuild and run the tests. Keep package details and published travel guidance current. Image assets are bundled with hashed filenames; the homepage uses one responsive WebP hero.

## Environment configuration

`.env.example` contains empty public configuration values. Copy it to the ignored `.env.local` for local use. Configure the same variables in the relevant Vercel environment for deployments.

| Variable | Purpose |
| --- | --- |
| `VITE_BUSINESS_PHONE` | Owner-approved public phone number, preferably including country code. |
| `VITE_WHATSAPP_NUMBER` | Public WhatsApp number including country code; formatting is normalized to digits. |
| `VITE_BUSINESS_EMAIL` | Owner-approved public enquiry email address. |
| `VITE_GA4_MEASUREMENT_ID` | Optional GA4 web-stream ID in `G-…` format. |

Missing contact values hide the corresponding direct contact links. Missing or invalid GA4 configuration leaves analytics disabled. All `VITE_*` values are embedded in browser assets: never place passwords, private API keys, or other secrets there. These values are read at build time, so production changes require a rebuild and deployment.

For a local form integration test, `VITE_QUOTE_API_URL` can point to an HTTP mock on `localhost` or `127.0.0.1`. This override only applies during development, requires a separately running mock server, and rejects other hosts. Production builds always use the existing AWS endpoint. Without a local override, even the development form uses that real endpoint.

## Enquiry backend and analytics limits

Enquiries are posted directly to the existing AWS API Gateway endpoint defined in `src/lib/quoteEndpoint.ts`. This repository contains the frontend integration, not the backend, database, email delivery, or CRM. Requests have a 20-second timeout. A successful HTTP response only counts as accepted when the response JSON also contains an application `statusCode` in the 200–299 range without an explicit failure. Network errors and timeouts are shown as unconfirmed, with the entered details retained on the page.

Frontend success and mocked tests do not verify delivery to a business inbox or CRM, lead storage, or an eventual booking. Confirm that separately with an authorized test enquiry and the backend owner. Do not change the payload contract or production endpoint without coordinating the backend.

When a valid GA4 ID is configured, the Google tag loads only after the visitor accepts analytics. Preferences can be changed from the privacy page. Manual events include page views, package/contact/CTA interactions, form starts, and `generate_lead` after confirmed API acceptance. Names, email addresses, phone numbers, enquiry free text, and URL query strings are excluded from those event payloads. Declining analytics does not prevent an enquiry.

A configured ID does not itself prove that GA4 is receiving events. Check the intended GA4 property after configuration and consent; consent refusal or browser blocking reduces measured totals. A lead event represents an accepted enquiry, not a confirmed booking or revenue. Booking/CRM attribution, Google Search Console verification, and advertising accounts require separate setup.

## Deployment

Vercel installs dependencies with `npm ci` and runs `npm run typecheck && npm run build && npm test`, as configured in `vercel.json`. Deploy the **`dist`** output to the existing business project. Confirm the linked project and account before a CLI deployment; `.vercel` is local, ignored configuration.

Keep the clean-URL settings, legacy redirects, and custom `404.html` behavior. Do not restore a catch-all rewrite to `index.html`: unknown URLs must return HTTP 404. Hashed `/assets/` files receive long-lived immutable caching.

After deployment, check the canonical `www` domain, a destination and guide page, a real missing URL, legacy redirects, the sitemap, and enquiry navigation. Public page checks do not confirm backend lead delivery or Google indexing. Local edits only become live after a deployment.
