# Retired: consulting pages

Retired 2026-10-16, when boltn.com changed from the boltn consultancy site to Steve Bolton's
personal site. These pages sold engagements and are not routed: Next.js only routes `app/`.

| Was | Route | Now redirects to |
|---|---|---|
| `services/page.tsx` | `/services`: Assessment, Advisory and Project engagements | `/about` |
| `book/page.tsx` | `/book`: Cal.com discovery-call embed (`NEXT_PUBLIC_CAL_EMBED_URL`) | `/contact` |
| `cookie-banner.tsx` | Was `components/layout/`, mounted in `app/layout.tsx`. Existed only for Cal.com's cookies; with the booking embed gone the site sets none | — |

The home page also lost its services grid and the "advisory engagements available" indicator;
both are in git history before the `refocus/personal-site` branch.

## Restore

1. `git mv archive/consulting/services app/services` (and the same for `book`).
2. Remove the matching redirects from `next.config.ts`.
3. Add the routes back to `app/sitemap.ts`, the header and the mobile nav.
4. Move `cookie-banner.tsx` back to `components/layout/` and mount it in `app/layout.tsx`.
5. Restore the Cal.com sections of `app/legal/privacy` and `app/legal/cookies`.
