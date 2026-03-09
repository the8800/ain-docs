# Workspace Overview

The repository (`ain-web/`) is a **Yarn workspaces monorepo**. All services and libraries are managed from the root `package.json`.

## Monorepo Structure

```
ain-web/
├── admin-app/               ← KeystoneJS Admin UI + Prisma migrations
├── main-api/                ← NestJS core API (REST + GraphQL)
├── event-processors/        ← NestJS background job workers + Kafka consumers
├── notification-service/    ← NestJS mailer service
├── central-server/          ← Express/WebSocket real-time aggregator
│
├── kafka-library/           ← Shared Kafka producer/consumer SDK
├── github-library/          ← GitHub API client SDK
├── gitlab-library/          ← GitLab API client SDK
├── jira-library/            ← Jira API client SDK
├── bitbucket-library/       ← Bitbucket API client SDK
├── asana-library/           ← Asana API client SDK
├── tms-library/             ← Generic TMS types + utilities
├── github-tms-library/      ← GitHub TMS bridge
│
├── frontend/                ← Next.js frontend (this app)
├── docker-compose/          ← Local infra stacks
│   ├── core.yml             ← PostgreSQL, Redis, Kafka
│   └── services.yml         ← Optional additional services
│
├── deployment/              ← IaC and CI/CD scripts
├── docs/                    ← Documentation (you are here)
└── package.json             ← Workspace root + shared scripts
```

---

## Shared Libraries

The `*-library` packages are TypeScript SDKs consumed by `main-api` and `event-processors`:

| Package | Purpose |
|---|---|
| `@alpineintellect/kafka-library` | Kafka producer/consumer utilities |
| `@alpineintellect/github-library` | GitHub REST + webhook client |
| `@alpineintellect/gitlab-library` | GitLab REST client |
| `@alpineintellect/jira-library` | Jira REST client |
| `@alpineintellect/asana-library` | Asana REST client |
| `@alpineintellect/bitbucket-library` | Bitbucket REST client |
| `@alpineintellect/tms-library` | Shared TMS types |
| `@alpineintellect/github-tms-library` | GitHub ↔ TMS bridge |

Build all libraries from root:

```bash copy
yarn build
```

---

## Key File References

| Path | Purpose |
|---|---|
| `package.json` | Root scripts and workspace definitions |
| `admin-app/keystone.ts` | Keystone configuration |
| `admin-app/schema.ts` | Keystone lists, fields, access rules |
| `admin-app/schema.prisma` | Prisma schema |
| `main-api/src/main.ts` | Main API entry point |
| `event-processors/src/main.ts` | Event Processors entry point |
| `notification-service/src/main.ts` | Notification Service entry point |
| `central-server/src/server.ts` | Central Server entry point |
| `docker-compose/core.yml` | Core infra (DB, Redis, Kafka) |
| `docker-compose/services.yml` | Additional services |

---

## Adding a New Workspace

1. Create a new folder (e.g., `my-new-service/`)
2. Add a `package.json` with `"name": "@alpineintellect/my-new-service"`
3. Add the folder name to `workspaces` in the root `package.json`
4. Run `yarn install` from root

> Keep `yarn build` passing in CI. Build failures often originate in shared libraries.
