# Croshii Static Site — GitHub Handoff

This project is a **frontend-only React, HTML, and CSS site**. It has no database, payments service, authentication flow, or custom backend. The catalogue, ordering routes, and SEO content are rendered statically; ordering continues through Croshii’s existing Instagram messaging channel.

## What is included

| Area | Included implementation |
| --- | --- |
| Visual storefront | Responsive home page, editorial hero, curated product shelf, product filters, FAQ accordions, gifting and craft sections |
| SEO | Unique page title and description, canonical URL, Open Graph and social metadata, `robots.txt`, `sitemap.xml`, web manifest, and JSON-LD for Organization, WebSite, product collection, and FAQs |
| GitHub Pages | A ready-to-run workflow at `.github/workflows/deploy-pages.yml` that builds `dist/public` and deploys it when `main` changes |
| Static assets | Generated editorial assets are referenced through managed storage paths, and existing catalogue photographs are referenced from the current Croshii domain |

## Publish through GitHub Pages

Create a repository, copy this project into it, and push the `main` branch. In the repository’s **Settings → Pages**, select **GitHub Actions** as the source. The included workflow will publish each production build automatically.

For a project Pages URL such as `https://owner.github.io/repository/`, the workflow sets the appropriate base path automatically. For a custom domain such as `www.croshii.com`, set the custom domain in GitHub Pages and replace the `VITE_BASE_PATH` value in the workflow with `/` before pushing.

> Before replacing the live Croshii site, update the canonical URL and sitemap URL if the final public domain is different from `https://www.croshii.com/`.

## Asset note for GitHub-only hosting

The three editorial images and the Croshii yarn-knot mark are managed project assets. If the site is hosted only on GitHub Pages rather than through this project, download those four assets from the project’s asset area, copy them to `client/public/assets/`, and update the four `/manus-storage/...` references in `client/src/pages/Home.tsx`, `client/index.html`, and `client/public/site.webmanifest` to `/assets/<filename>`. The existing product images already point to the Croshii public domain.

## Local commands

```bash
pnpm install
pnpm check
pnpm build
pnpm dev
```

The static build is output to `dist/public`. It can also be deployed to any static host that serves a single-page application and rewrites unknown routes to `index.html`.
