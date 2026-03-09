# Developer Onboarding

Welcome to AlpineIntellect. This guide gives you a fast, practical path to become productive on the platform.

## Prerequisites

Make sure you have completed [Installation](/docs/setup/installation) and [Environment Configuration](/docs/setup/environment) before continuing.

Quick checks:

```bash copy
node -v         # >= 20.17.0
corepack enable # ensures Yarn modern is available
yarn -v         # 3.x
```

---

## Install Dependencies

Run at the **repository root** (`ain-web/`):

```bash copy
yarn install
```

This installs dependencies for all workspaces in one go.

---

## Bring Up Local Infrastructure

Start required services (PostgreSQL, Redis, Kafka) via Docker Compose:

```bash copy
yarn compose:up

# Optionally bring up additional services
yarn services:compose:up
```

---

## Common Root Scripts

All commands below run from the **repository root** (`ain-web/`):

```bash copy
yarn start:api:dev      # Start main-api in dev mode
yarn start:admin:dev    # Start admin-app (KeystoneJS)
yarn start:event:dev    # Start event-processors
yarn start:cs:dev       # Start central-server (WebSocket)
yarn start:ns:dev       # Start notification-service
yarn build              # Build all shared libraries and services
yarn compose:up         # Start Docker infra
yarn compose:down       # Stop Docker infra
yarn lint               # Run Prettier + ESLint
yarn lint:fix           # Auto-fix lint issues
```

---

## Prisma / Database Migrations

Migrations are managed inside `admin-app/` (Keystone + Prisma):

```bash copy
# Development migrations (auto-generates migration files)
yarn workspace admin-app migrate:dev

# Production migrations
yarn workspace admin-app migrate:deploy
```

---

## Running a Full Local Stack

For a full local setup, start these services in separate terminal tabs:

```bash copy
# Tab 1: Infra
yarn compose:up

# Tab 2: Admin App (Keystone)
yarn start:admin:dev

# Tab 3: Core API
yarn start:api:dev

# Tab 4: Event Processors
yarn start:event:dev

# Tab 5: Central Server
yarn start:cs:dev

# Tab 6: Notification Service
yarn start:ns:dev
```

---

## Troubleshooting

**"Module not found" during dev**
→ Run `yarn install` at the root. Check that the workspace is listed in `workspaces` in root `package.json`.

**Env variables not applied**
→ Confirm `DOTENV_CONFIG_PATH=$(pwd)/.env` is set and the variable exists in `.env`.

**Database errors**
→ Check that Docker compose services are up (`yarn compose:up`) and no port conflicts exist.

**Kafka timeouts**
→ Verify the Kafka broker from compose is reachable from both `main-api` and `event-processors`.

**Port conflicts**
→ `admin-app` defaults to `PORT=4000`. Adjust in `.env` or the service script as needed.

---

## Next Steps for New Developers

1. Set up `.env` and run `yarn compose:up`
2. Start `admin-app`, `main-api`, `event-processors`, and `central-server` locally
3. Explore `admin-app/schema.ts` to understand domain models
4. Review shared libraries consumed by `event-processors` to see integration patterns
5. Pair with a teammate to ship a small change end-to-end:
   `schema → migration → API → worker → notification`

> If anything is missing here, update `docs/developer-guide/onboarding.md` — this document is living.
