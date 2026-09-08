# 316 PCKLE POS — Web Edition

A point-of-sale web app for 316 PCKLE, built from the same system as The Pickle Farm's
POS (same features, own branding, own database, own deployment). It runs as an ordinary
website, so any device with a browser — a laptop, a tablet at the front desk, your phone —
can use it once it's deployed, all sharing the same live data.

## Features

- **POS / checkout** — cart, discounts, multiple payment methods, receipts
- **Open Play & Court Rental** — check-in, court assignment, reservations
- **Members** — membership types, renewals, discounts
- **Inventory** — stock in/out, low-stock alerts, product catalog
- **Daily inventory count & reconciliation** — staff log actual stock counts at the start
  and end of their shift; the app automatically computes consumption and compares it
  against recorded sales, flagging any variance — no manual tallying needed
- **Waste tracking** — logging spoiled/damaged stock deducts it from inventory and
  automatically creates a matching expense entry
- **Staff Time Clock** — staff clock in/out from the sign-in screen with a photo captured
  on the spot as proof; owner can add or remove staff and pull a monthly hours/days-worked
  summary for payroll, all PIN-gated
- **Attendance tab (owner only)** — every clock-in/out photo and the monthly payroll
  summary, in one place
- **Expenses, Dashboard, Reports** — daily revenue, expense breakdown, top items
  (owner/manager only — cashier accounts don't see revenue or reports)

## Project layout

```
316-pckle-pos-web/
  server/   Express + SQLite API (Node.js)
  client/   React web app (Vite)
```

## Default login

- **Owner** — PIN `1234`
- **Staff (Cashier)** — PIN `1234`

These are the same starter defaults the system ships with — change them before you go live
(ask me to update them, the same way I changed The Pickle Farm's, or update `pin_hash`
directly in the database). Since this is a separate deployment with its own database, these
PINs are independent of The Pickle Farm's.

## Running it locally (to try it out before deploying)

You'll need [Node.js](https://nodejs.org) 20+ installed.

```bash
# from the 316-pckle-pos-web folder
npm run install:all

# terminal 1 — starts the API on http://localhost:4000
npm run dev:server

# terminal 2 — starts the web app on http://localhost:5173
npm run dev:client
```

Open http://localhost:5173 — the dev server proxies API calls to the server automatically.
The database file is created at `server/data/316-pckle.db` the first time the server runs.

## Deploying it online (so other devices can reach it)

The app is one Node.js web service (it serves both the API and the built web app from the
same process) plus one SQLite file that needs to persist between deploys. Below is the
simplest path using **Railway** — the same platform The Pickle Farm's POS is deployed on.
This needs to be a **separate Railway project** from The Pickle Farm's — a completely
separate app, database, and URL, even though it's the same underlying code.

### Railway (recommended, easiest)

1. **Put the code on GitHub.** Create a **new** repository (e.g. `316-pckle-pos-web`) —
   not the same one as The Pickle Farm's — and push this folder to it.
2. On [railway.app](https://railway.app), click **New Project → Deploy from GitHub repo**,
   and pick this new repository.
3. Railway will detect a Node project. Set these in the service's **Settings**:
   - **Root Directory**: leave blank (it builds from the repo root)
   - **Build Command**: `npm run install:all && npm run build`
   - **Start Command**: `npm run start`
4. Add a **Volume** (Settings → Volumes → New Volume) and mount it at `/data`. This is
   where your database file will live permanently, surviving redeploys.
5. Add these **Variables** (Settings → Variables):
   - `JWT_SECRET` — any long random string (this signs login tokens — keep it secret, and
     use a *different* value than The Pickle Farm's service)
   - `DB_PATH` — `/data/316-pckle.db`
   - `PORT` — Railway sets this automatically, no need to add it
6. Click **Deploy**. Railway gives you a public URL like
   `316-pckle-pos-web-production.up.railway.app` — that's the address every device will use.

## Using it day to day once deployed

Just open the deployed URL in a browser on any device — your laptop, a tablet at the front
desk, your phone. Everyone shares the same live data. No installation needed on each device.

## Environment variables reference

| Variable | Required | Description |
|---|---|---|
| `JWT_SECRET` | Yes, in production | Secret key that signs login sessions. Use a long random string, different from any other deployment of this app. |
| `DB_PATH` | Recommended | Where the SQLite file lives. Point this at your host's persistent disk (e.g. `/data/316-pckle.db`), or it defaults to `./data/316-pckle.db` next to the app — which gets wiped on redeploy if that's not a persistent volume. |
| `PORT` | No | Defaults to 4000; most hosts set this for you. |
| `CORS_ORIGIN` | No | Only needed if you deploy the client and server as two separate URLs instead of one combined service. Leave blank for the default single-service setup above. |

## Source

Cloned from The Pickle Farm's POS web app — same codebase, same feature set. What's
different: the branding (name "316 PCKLE", navy blue & white theme instead of green &
cream), and it runs as its own separate app with its own GitHub repo, its own database,
and its own Railway deployment, so changes to one never affect the other.
