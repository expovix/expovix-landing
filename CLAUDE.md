# CLAUDE.md — ExpoVix Principal Architect Rules
## Project Overview
ExpoVix is a self-serve, mobile-first exhibition booth booking SaaS platform.
- Domain: expovix.com
- Repo: github.com/expovix/expovix-landing
- Stack: React + Vite, Supabase, Vercel
- Deployment: Auto-deploy on merge to main via Vercel
---
## Section 1 — Component Map
All components live in `src/`:
### `src/components/landing/`
| File | Renders |
|---|---|
| `Navbar.jsx` | Top navigation bar with logo + CTA buttons |
| `Hero.jsx` | Hero section — headline, subheadline, primary CTA |
| `Features.jsx` | Core features 2×3 grid |
| `Pricing.jsx` | 3-tier pricing cards (Starter / Pro / Business) |
| `Testimonials.jsx` | Customer testimonials section |
| `FAQ.jsx` | Accordion FAQ section |
| `Footer.jsx` | Site footer with links |
| `TrustedBy.jsx` | "Trusted by 2400+" logo strip |
| `Stats.jsx` | Key stats row |
| `WhyExpoVix.jsx` | Why ExpoVix cards section |
| `WhatSetsApart.jsx` | 6-card differentiators section |
| `ClosingCTA.jsx` | Final white CTA card before footer |
### `src/components/dashboard/`
| File | Renders |
|---|---|
| `DashboardLayout.jsx` | Sidebar + topbar shell for all dashboard pages |
| `KPICards.jsx` | Total Booths, Booked, Available, Revenue cards |
| `EventsTable.jsx` | List of organizer's events |
| `QuickActions.jsx` | "+ Create Event" and other action buttons |
### `src/pages/`
| File | Route |
|---|---|
| `index.jsx` | `/` — Landing page |
| `Dashboard.jsx` | `/dashboard` — Post-login organizer dashboard |
| `Login.jsx` | `/login` — Auth login page |
| `Register.jsx` | `/register` — Auth register page |
| `Confirmation.jsx` | `/confirmation` — Booking confirmation |
### Rules
- Never edit a landing component for a dashboard task and vice versa
- Never create new files without checking this map first
- If a component doesn't exist yet, add it to this map in the same PR
---
## Section 2 — Brand Rules
| Token | Value |
|---|---|
| Primary accent | `#FF5F29` (orange) |
| Background | `#ffffff` / light |
| Dark surface | `#0D1421` (use sparingly, never as primary background) |
| Teal / Navy | ❌ PERMANENTLY RETIRED — never use |
| Main logo | `assets/logo/Main logo.png` (render at 140px height) |
| Favicon | `assets/logo/Favicon logo.png` |
| Font | Match whatever is currently declared in `index.css` |
### Rules
- All colors via CSS variables or Tailwind config — never hardcoded hex in components
- Mobile-first always — build for 375px width first
- If any design references green, navy, or teal, correct to `#FF5F29` before implementation
- Logo filenames have spaces — encode as `%20` in HTML `src` attributes or rename to kebab-case
---
## Section 3 — Supabase Schema
**Project URL:** `https://uzyfrpndedbbobsawgoek.supabase.co`
### Tables
| Table | Purpose |
|---|---|
| `plans` | Subscription tiers (Starter/Pro/Business) |
| `organizers` | Registered organizer accounts |
| `events` | Events created by organizers |
| `booths` | Booths within each event |
| `bookings` | Booth booking records |
### Auth Pattern — mandatory on every query
```js
const { data: { session } } = await supabase.auth.getSession();
if (!session) redirect to /login;
// then run your query
```
### Rules
- `getSession()` must be called before any Supabase query — no exceptions
- RLS policies are active — always query as authenticated user
- Table-level GRANT and RLS policy column names must exactly match schema
- Never expose service key in frontend code
---
## Section 4 — Auth + Redirect Rules
| Event | Destination |
|---|---|
| Successful login | `expovix.com/dashboard` |
| Successful register | `expovix.com/dashboard` |
| Unauthenticated dashboard access | `expovix.com/login` |
| Register page link | `expovix.com/register` |
### Rules
- Zero links to `app.expovix.com` anywhere — that domain is deleted
- Zero links to `app.html` — that file is deleted
- All Supabase Auth redirect URLs must point to `expovix.com`
- Update Supabase Auth settings (Site URL + Redirect URLs) if changing auth flow
---
## Section 5 — PR Conventions
| Prefix | Use for |
|---|---|
| `fix:` | Bug fixes |
| `feat:` | New features or components |
| `chore:` | Config, setup, tooling, documentation changes |
| `style:` | CSS/visual changes with no logic change |
| `refactor:` | Code restructure with no behaviour change |
### Rules
- Always open a PR — never push direct to main
- PR title must start with one of the prefixes above
- One concern per PR — do not bundle unrelated changes
- PR description must list: what changed, why, and files touched
---
## Section 6 — Google Stitch Workflow
When Abdul shares a Stitch design (via MCP or screenshot):
1. **Read design tokens first** — extract colors, spacing, font sizes, border radius from the Stitch file before writing any code
2. **Map to brand rules** — verify extracted tokens match Section 2; correct any deviations
3. **Identify components** — list which components from Section 1 need to be created or updated
4. **Generate matching React component** — functional component, hooks only, no class components
5. **Follow brand rules** — `#FF5F29` accent, white background, mobile-first
6. **Open PR** — prefix `feat:` for new components, `style:` for visual updates
### Rules
- Never skip the token-read step
- Never hardcode values from Stitch — map to CSS variables
- If Stitch uses a color not in brand rules, flag it before implementing
- Stitch is design reference only — Claude Code owns the final implementation
---
## Architecture Guardrails — Never Violate
- `mapCanvas.js` = drawing, zoom, pan, click detection ONLY
- `bookingLogic.js` = Supabase writes + Stripe ONLY
- Never mix canvas logic with database logic
- Never write code without Abdul's approval
- Always explain plan before execution
