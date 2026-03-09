# Environment Configuration

The platform uses a single `.env` file at the **repository root** (`ain-web/.env`). All services read from this file via `DOTENV_CONFIG_PATH`.

## Creating Your `.env` File

Copy the example file and fill in the values:

```bash copy
cp .env.example .env
```

Then open `.env` in your editor and fill in the required values for each section below.

---

## Required Variables

### Database (PostgreSQL)

```bash copy
DATABASE_URL=postgresql://user:password@localhost:5432/ainplatform
```

### Redis

```bash copy
REDIS_URL=redis://localhost:6379
```

### Kafka

```bash copy
KAFKA_BROKER=localhost:9092
KAFKA_CLIENT_ID=ain-platform
KAFKA_GROUP_ID=ain-platform-group
```

### Email / Notifications

```bash copy
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASSWORD=yourpassword
```

### Authentication

```bash copy
NEXTAUTH_SECRET=your-super-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### External Integrations

```bash copy
# GitHub
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# GitLab
GITLAB_CLIENT_ID=
GITLAB_CLIENT_SECRET=

# Jira
JIRA_CLIENT_ID=
JIRA_CLIENT_SECRET=

# Bitbucket
BITBUCKET_CLIENT_ID=
BITBUCKET_CLIENT_SECRET=
```

---

## How Services Use `.env`

Root scripts automatically inject `DOTENV_CONFIG_PATH=$(pwd)/.env` so all services find the file.

If running a service manually, pass it explicitly:

```bash copy
DOTENV_CONFIG_PATH=$(pwd)/.env yarn start:api:dev
```

---

## Docker Compose Services

Bring up the required infrastructure (PostgreSQL, Redis, Kafka) via Docker Compose before starting any service:

```bash copy
# Core infra (DB, Redis, Kafka)
yarn compose:up

# Additional supporting services
yarn services:compose:up
```

Stop everything:

```bash copy
yarn compose:down
```

Check `docker-compose/core.yml` and `docker-compose/services.yml` for the full list of services, exposed ports, and volume configs.

---

## Next Step

→ [Read the developer onboarding guide](/docs/developer-guide/onboarding)
