# ShipKit (Next.js)

ShipKit is a Next.js 15 App Router frontend for free shipping tools and SEO-focused seller content. The UI is converted from the supplied React/Vite example; no database or production form delivery is enabled.

## Run locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`. Set `NEXT_PUBLIC_ADSENSE_ID` only after consent management and AdSense approval are ready.

## Common updates

- Change the brand, URL, description, email, and social profiles in `lib/siteConfig.ts`.
- Replace home keyword placeholders in `lib/keywords.ts`; home content and metadata read from this list.
- Add a typed article to `lib/blog.ts`. Long-form content is stored in its `sections` structure and can later be replaced by MDX or a CMS.
- Each product owns its content and status in its explicit `app/products/<slug>/page.tsx` file. Change `status` from `coming-soon` to `live` there; the detail view will expose `ToolContainer` for the matching component in `components/tools`.
- Ad slots reserve fixed space. Development shows placeholders; production uses `NEXT_PUBLIC_ADSENSE_ID`.

## Routes

The App Router includes home, product listing and static product pages, blog listing and posts, policy hub and policy pages, About, Contact, sitemap, robots, manifest, generated Open Graph artwork, loading UI, and a custom 404.

## Backend note

The supplied PostgreSQL schema is intentionally not wired in. Placeholder server actions live in `app/actions` so database/email integration can be added later without redesigning the UI.
