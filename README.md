# Takamul Code Challenge

Monorepo for the Takamul Technologies code challenge.

- `frontend/` — Next.js 16 (App Router) + Tailwind + Redux Toolkit + i18next (EN/AR, RTL)
- `backend/` — Strapi v5 on SQLite, inline bilingual fields, seeded on first boot

Requires Node.js ≥ 20.

## Run locally

Two terminals:

```bash
# Terminal 1 — backend (http://localhost:1337)
cd backend
npm install         # only needed once
npm run develop
```

First boot seeds the DB from `backend/data/seed/*.json` and grants public `find`/`findOne` on content collections plus `create` on `subscriber`. Create your admin user at `http://localhost:1337/admin`.

```bash
# Terminal 2 — frontend (http://localhost:3000)
cd frontend
cp .env.example .env.local   # sets NEXT_PUBLIC_STRAPI_URL
echo "NEXT_PUBLIC_STRAPI_URL=http://localhost:1337" > .env.local
npm install
npm run dev
```

If `NEXT_PUBLIC_STRAPI_URL` is unset the frontend renders from `frontend/src/data/*.ts` dummy data — useful for offline work.

## Tests

```bash
cd frontend && npm test
```

## Scope

Three pages: Homepage, Service Detail (`/services/[slug]`), Search. Contact / About / Blog are design placeholders — shown as unlinked nav items.
