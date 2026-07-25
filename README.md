# ValtQ

The official website for ValtQ — a premium software development agency
building web, mobile, AI-integrated, and backend/cloud products for
startups and businesses.

Bilingual (English + Arabic), built as a modern marketing site with an
integrated multi-step Project Discovery experience and Cal.com-powered
meeting booking.

---

## Overview

This repository is a pnpm-workspace monorepo containing:

- **`apps/web`** — the public marketing website (Next.js 15, App Router)
- **`apps/api`** — the backend API (Fastify + Prisma)
- **`packages/config`** — shared ESLint and TypeScript configuration
- **`packages/types`** — shared Zod schemas / TypeScript types, the
  contract between `web` and `api`

The site is built to ship as a lean, production-ready MVP first.
Anything not needed for that goal (a build-orchestration tool, extra
shared packages, file uploads, admin/portal apps) has been deliberately
left out for now — see [`docs/architecture/`](./docs/architecture) for
the reasoning behind each of those calls. The structure is chosen so
future additions (Admin Dashboard, Client Portal, Blog, Authentication,
CRM, AI Assistant) can be added as new apps or modules later without
restructuring what already exists.

---

## Features

- Bilingual marketing site (English / Arabic, full RTL support)
- Services, Work (case studies), Process, Pricing, About, and FAQ pages
- A 6-screen, animated Project Discovery flow (not a form, not a
  chatbot) that qualifies leads and generates a structured project brief
- Cal.com-integrated meeting booking, routed by project budget
- Automated internal lead notifications + visitor confirmation emails
- Fully responsive, accessible (WCAG 2.1 AA target), performance-first
  build

---

## Tech Stack

**Frontend**
Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui ·
Framer Motion · React Hook Form · Zod · next-intl · next-themes ·
Lucide React

**Backend**
Node.js · Fastify · TypeScript · Prisma ORM · SQLite (MVP,
Postgres-migration-ready) · Resend · Cal.com integration

**Tooling**
pnpm workspaces · ESLint · Prettier · Husky · lint-staged · Conventional
Commits

_No build-orchestration tool (e.g. Turborepo) is used at this stage —
with two apps, `pnpm --filter` is sufficient. This may be introduced
later if the number of apps or build complexity grows._

**Deployment**
Frontend on Vercel · Backend on Railway/Render

---

## Architecture

```
valtq/
├── apps/
│   ├── web/                    # Marketing site + Discovery Flow
│   └── api/                    # Backend API
│
├── packages/
│   ├── config/                 # Shared ESLint + TypeScript config
│   └── types/                  # Shared Zod schemas / TS types
│
├── docs/
│   ├── architecture/           # System design & folder structure rationale
│   ├── engineering/            # Sprint plans, Epic/Issue breakdowns
│   ├── meeting-notes/
│   └── decisions/              # One short ADR per significant decision
│
├── scripts/                    # Reserved for future automation
│
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
│
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

Full annotated folder structures for `apps/web` and `apps/api` are in
[`docs/architecture/folder-structure.md`](./docs/architecture/folder-structure.md).

**`apps/web` at a glance:**

```
apps/web/src/
├── app/[locale]/(marketing)/     # Home, Services, Work, Process, Pricing, About, FAQ
├── app/[locale]/(discovery)/     # The Discovery Flow
├── components/
│   ├── ui/                       # Reusable primitives
│   ├── layout/                   # Header, Footer, Nav
│   ├── sections/                 # Page-level blocks (Hero, PricingCards, etc.)
│   └── forms/                    # Discovery Flow screens
├── lib/                          # API client, Cal.com helpers
├── store/                        # Discovery Flow state (Zustand)
├── content/                      # Static structured content (services, case studies)
└── i18n/                         # next-intl config + en/ar message files
```

**`apps/api` at a glance:**

```
apps/api/src/
├── modules/
│   ├── discovery/                # Discovery submission handling + lead scoring
│   ├── booking/                  # Cal.com webhook handling
│   ├── notifications/            # Resend email sending
│   └── health/
├── common/                       # Errors, middleware, response shape helpers
├── plugins/                      # Fastify plugins (cors, helmet, rate-limit)
├── config/                       # Zod-validated environment variables
└── lib/                          # Prisma client, Resend client
```

---

## Installation

**Requirements:** Node.js (version pinned in `.nvmrc`), pnpm ≥ 8

```bash
git clone https://github.com/valtq/valtq.git
cd valtq
pnpm install
```

---

## Environment Variables

Copy `.env.example` to `.env` in both `apps/web` and `apps/api`, then
fill in the values below.

**`apps/web/.env`**

| Variable               | Description                     |
| ---------------------- | ------------------------------- |
| `NEXT_PUBLIC_API_URL`  | Base URL of the backend API     |
| `NEXT_PUBLIC_CAL_LINK` | Cal.com booking link/event slug |

**`apps/api/.env`**

| Variable             | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| `DATABASE_URL`       | SQLite file path (MVP) / Postgres connection string (later) |
| `RESEND_API_KEY`     | Resend API key for transactional email                      |
| `CAL_WEBHOOK_SECRET` | Secret for verifying incoming Cal.com webhooks              |
| `SLACK_WEBHOOK_URL`  | (Optional) Internal lead notification channel               |
| `PORT`               | API server port (default: `4000`)                           |

All environment variables are validated at startup via Zod
(`apps/api/src/config/env.ts`) — the server refuses to start with
missing or malformed values rather than failing silently at runtime.

---

## Running Development

Run both apps in separate terminals (no build-orchestration tool is
used at this stage):

```bash
pnpm --filter web dev     # http://localhost:3000
pnpm --filter api dev     # http://localhost:4000
```

---

## Branch Strategy

- `main` — production, always deployable
- `develop` — integration branch, merges from feature branches
- `feature/<short-description>` — one branch per issue
- `fix/<short-description>` — bug fixes
- `chore/<short-description>` — tooling, config, non-feature changes

Feature branches are created from `develop` and merged back via Pull
Request. `develop` merges to `main` on release.

---

## Commit Convention

[Conventional Commits](https://www.conventionalcommits.org/), enforced
via Husky + commitlint:

```
feat(discovery): add budget & timeline screen
fix(api): correct lead-scoring threshold
chore(web): update tailwind config
docs(readme): update environment variables section
```

---

## Pull Request Workflow

1. Branch from `develop` using the naming convention above
2. Keep PRs scoped to a single Issue — no unrelated changes
3. Fill out the PR template (linked issue, summary, screenshots for UI
   changes, checklist)
4. At least one approving review required before merge
5. All CI checks (lint, typecheck, test, build) must pass
6. Squash-merge into `develop`

---

## Coding Standards

- TypeScript strict mode across all packages/apps
- ESLint + Prettier enforced pre-commit via Husky + lint-staged
- Shared configs live in `packages/config` — do not override locally
  without a documented reason
- Zod schemas are the single source of truth for data shapes shared
  between frontend and backend (`packages/types`) — do not duplicate
  type definitions
- UI components currently live inside `apps/web` (not a shared package)
  since there's only one frontend app — this may change if/when a
  second app (e.g. Admin Dashboard) needs the same components

---

## Deployment

- **`apps/web`** deploys to Vercel, connected to `main` for production
  and preview deployments on every PR
- **`apps/api`** deploys to Railway or Render, connected to `main`
- Environment variables are configured per-platform, mirroring
  `.env.example`

---

## Team

| Name    | GitHub                                                 |
| ------- | ------------------------------------------------------ |
| Mahmoud | [@mahmoudrabbas](https://github.com/mahmoudrabbas)     |
| Haitham | [@Haithamgomaa](https://github.com/Haithamgomaa)       |
| Fatma   | [@FatmaAli111](https://github.com/FatmaAli111)         |
| Marco   | [@marcoreda56-bot](https://github.com/marcoreda56-bot) |

---

## License

Proprietary — © ValtQ. All rights reserved.
