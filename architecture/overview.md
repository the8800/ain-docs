# Architecture Overview

AlpineIntellect is a **multi-service monorepo** built on Node.js (NestJS + Next.js) with Python AI services. Services communicate via Kafka for async messaging and REST/GraphQL for synchronous API calls.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Clients                          │
│              Browser (Next.js Frontend)                 │
└──────────────┬──────────────────────┬───────────────────┘
               │ REST/GraphQL          │ WebSocket
               ▼                      ▼
┌──────────────────────┐   ┌─────────────────────────┐
│      Main API        │   │    Central Server        │
│  (NestJS, port 3001) │   │ (Express/WS, port 3002)  │
└──────────┬───────────┘   └────────────┬────────────┘
           │                             │
           │ Kafka                       │ Kafka
           ▼                             ▼
┌──────────────────────┐   ┌─────────────────────────┐
│  Event Processors    │   │  Notification Service    │
│  (NestJS workers)    │   │  (NestJS mailer)         │
└──────────┬───────────┘   └─────────────────────────┘
           │
           │ REST (OAuth/Webhooks)
           ▼
┌──────────────────────────────────────────────────┐
│              External Integrations               │
│  GitHub · GitLab · Jira · Bitbucket · Asana      │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│                  Data Layer                       │
│  PostgreSQL (via Prisma)  ·  Redis  ·  Kafka      │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│               Admin App (Keystone)               │
│  Database management, CMS, access control        │
└──────────────────────────────────────────────────┘
```

---

## Services

### Frontend (Next.js)
The user-facing application. Communicates with **Main API** via GraphQL and with **Central Server** via WebSocket for real-time updates.

### Main API (NestJS)
The core backend API. Handles:
- User authentication (NextAuth-backed sessions)
- REST endpoints for CRUD operations
- GraphQL schema exposed to the frontend
- Publishing integration events to **Kafka**

### Event Processors (NestJS)
Background workers that consume Kafka topics and execute:
- Platform sync jobs (pull GitHub PRs, Jira issues, etc.)
- Webhook processing
- Data transformation and enrichment
- Cross-platform TMS (Task Management System) operations

Uses shared SDKs: `@alpineintellect/github-library`, `@alpineintellect/jira-library`, etc.

### Notification Service (NestJS)
Consumes Kafka notifications and delivers:
- Email notifications (SMTP)
- In-app notifications

### Central Server (Express/WebSocket)
Real-time event aggregator. Subscribes to Kafka and forwards events to connected browser clients via WebSocket. Enables live dashboard updates without polling.

### Admin App (KeystoneJS)
CMS and admin UI for managing platform entities. Uses **Prisma** for database access. Hosts Prisma migrations and the GraphQL schema used by the main API.

---

## Messaging (Kafka)

Kafka is the async messaging backbone:

- **Main API** produces events (e.g., `integration.sync.requested`)
- **Event Processors** consume and process them
- **Notification Service** consumes notification events
- **Central Server** consumes real-time metric/event topics

```
Main API ──publish──► Kafka ──consume──► Event Processors
                        │
                        └──consume──► Notification Service
                        │
                        └──consume──► Central Server ──WS──► Browser
```

---

## Shared Libraries

Shared TypeScript SDKs provide typed clients for every external integration. They are consumed by `main-api` and `event-processors` and built as standard npm packages within the monorepo.

| Library | What it Wraps |
|---|---|
| `@alpineintellect/kafka-library` | Confluent Kafka (producer + consumer abstraction) |
| `@alpineintellect/github-library` | GitHub REST API + OAuth |
| `@alpineintellect/gitlab-library` | GitLab REST API |
| `@alpineintellect/jira-library` | Jira REST API |
| `@alpineintellect/bitbucket-library` | Bitbucket REST API |
| `@alpineintellect/asana-library` | Asana REST API |
| `@alpineintellect/tms-library` | Normalized TMS types |
| `@alpineintellect/github-tms-library` | GitHub ↔ TMS mapping |

---

## Data Layer

| Store | Usage |
|---|---|
| **PostgreSQL** | Primary database (managed by Prisma, configured in Keystone) |
| **Redis** | Session store, caching, ephemeral state |
| **Kafka** | Async event streaming and background job queue |
