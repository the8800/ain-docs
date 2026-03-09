# Getting Started with AlpineIntellect Platform

Welcome to the **AlpineIntellect (AIN) Platform** documentation. This guide will help you understand what the platform does and how to get up and running quickly.

## What is AlpineIntellect?

AlpineIntellect is a unified engineering intelligence platform that connects your development workflows — GitHub, GitLab, Jira, Bitbucket, Asana, and more — into a single real-time hub with AI-powered insights.

### What you'll work with

| Service | Description |
|---|---|
| **Admin App** | KeystoneJS CMS and admin UI |
| **Main API** | Core NestJS REST/GraphQL API |
| **Event Processors** | Background workers and Kafka consumers |
| **Notification Service** | Email and notification delivery |
| **Central Server** | WebSocket aggregator for real-time events |
| **Shared SDKs** | TypeScript libraries for GitHub, GitLab, Jira, Bitbucket, Asana, Kafka |
| **AI Services** | Python-based AI processing (`ain-gateway`) |

## Quick Start

1. **[Install prerequisites](/docs/setup/installation)** — Node.js, Yarn, Docker, Git
2. **[Configure your environment](/docs/setup/environment)** — Set up `.env`, databases, and services
3. **[Read the developer guide](/docs/developer-guide/onboarding)** — Understand the workspace structure and daily workflow

## Repository Structure

```
ain-web/                    ← This repository (frontend + platform services)
├── admin-app/              ← KeystoneJS Admin
├── main-api/               ← Core NestJS API
├── event-processors/       ← Background workers
├── notification-service/   ← Email/notifications
├── central-server/         ← WebSocket aggregator
├── *-library/              ← Shared TypeScript SDKs
├── frontend/               ← Next.js frontend (you are here)
├── docker-compose/         ← Local infra stacks
└── docs/                   ← Documentation source files
```

## Need help?

- Check the [Troubleshooting section](/docs/developer-guide/onboarding#troubleshooting) for common issues
- Review the [Architecture Overview](/docs/architecture/overview) to understand how services connect
- If something is unclear or missing, update the docs in `ain-web/docs/` — docs are treated as code
