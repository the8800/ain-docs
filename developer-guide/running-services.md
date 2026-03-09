# Running Services

All commands should be run from the **repository root** (`ain-web/`) unless specified otherwise.

## Start Infrastructure First

Always bring up Docker compose services before starting any application:

```bash copy
yarn compose:up
```

---

## Admin App (`admin-app`)

KeystoneJS CMS admin UI with Prisma ORM.

```bash copy
# Development
yarn start:admin:dev

# Build
yarn workspace admin-app build

# Migrations
yarn workspace admin-app migrate:dev    # dev (generates migration files)
yarn workspace admin-app migrate:deploy # production (applies migrations)
```

Default port: `4000`

---

## Main API (`main-api`)

Core NestJS API serving REST endpoints and GraphQL.

```bash copy
# Development (with hot reload)
yarn start:api:dev

# Build
yarn workspace main-api build

# Tests
yarn workspace main-api test
yarn workspace main-api test:watch
yarn workspace main-api test:cov
```

---

## Event Processors (`event-processors`)

NestJS workers for background jobs, Kafka consumers, and platform integrations (GitHub sync, Jira sync, etc.).

```bash copy
# Development
yarn start:event:dev

# Build
yarn workspace event-processors build

# Tests
yarn workspace event-processors test
```

---

## Notification Service (`notification-service`)

NestJS mailer service for email and in-app notifications.

```bash copy
# Development
yarn start:ns:dev

# Build
yarn workspace notification-service build
```

---

## Central Server (`central-server`)

Express/WebSocket aggregator that forwards real-time events and metrics to the frontend.

```bash copy
# Development
yarn start:cs:dev

# Build
yarn workspace central-server build
```

---

## Frontend (`frontend`)

Next.js application.

```bash copy
# Development
cd frontend
yarn dev

# Production build
yarn build
yarn start
```

---

## Running Everything Together

Open separate terminal windows for each service:

```bash copy
# Window 1
yarn compose:up

# Window 2
yarn start:admin:dev

# Window 3
yarn start:api:dev

# Window 4
yarn start:event:dev

# Window 5
yarn start:cs:dev

# Window 6
yarn start:ns:dev

# Window 7 (frontend)
cd frontend && yarn dev
```

---

## Workspace-Specific Commands

To run any script in a specific workspace without navigating into it:

```bash copy
yarn workspace <workspace-name> <script>

# Examples:
yarn workspace main-api build
yarn workspace event-processors test
yarn workspace admin-app migrate:dev
```

---

## Debugging Messaging Flows

When debugging Kafka or WebSocket workflows, run `main-api`, `event-processors`, and `central-server` **together** alongside Docker compose services.

Check these if events aren't flowing:
- Kafka broker reachable: `docker ps` → verify `kafka` container is up
- `central-server` connected: check websocket connection in browser DevTools
- `event-processors` consuming: check worker logs for consumer group activity
