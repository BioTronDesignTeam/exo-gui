# exo-gui

Telemetry pipeline for an exoskeleton: an STM32 (C++) streams telemetry to a
Raspberry Pi, which stores it and serves a live, auth-gated web dashboard.

> **Mid-refactor** (branch `staging/refactor`). The full stack, data flow, and
> open decisions are documented in `CLAUDE.md`.

## Layout

| Path             | What                                                                       |
|------------------|----------------------------------------------------------------------------|
| `frontend/`      | React dashboard (Tailwind 4). Currently Next.js, migrating to a Vite SPA.  |
| `backend/`       | Go service (Fiber HTTP ingest + WebSocket fan-out + Postgres). Skeleton today. |
| `prisma/`        | Postgres schema + migrations.                                              |
| `.devcontainer/` | Dev container: Node 22 + Go 1.23 + Postgres 16.                            |

## Develop & test

No Node/Go needed on your host — just Docker.

### Option A — IDE dev container (recommended)

1. Open the repo in VS Code / Cursor with the **Dev Containers** extension.
2. **Reopen in Container** — installs Node + Go, starts Postgres, runs the installs.
3. In the container terminal:
   ```bash
   cd frontend && npm run dev     # → http://localhost:3000 (auto-forwards, opens browser)
   cd backend  && go run .        # → curl http://localhost:8080/health  ->  {"status":"ok"}
   ```
   Ports 3000 / 5173 / 8080 / 5432 forward to your host automatically (labeled in the Ports panel).

### Option B — plain Docker (no IDE)

```bash
# Postgres (reuses the dev container's db service)
docker compose -f .devcontainer/docker-compose.yml up -d db

# Backend  → http://localhost:8080/health
docker run --rm -p 8080:8080 -v "$PWD/backend":/app -w /app golang:1.23 go run .

# Frontend → http://localhost:3000
docker run --rm -p 3000:3000 -v "$PWD/frontend":/app -w /app node:22 \
  sh -lc "npm install && npm run dev -- -H 0.0.0.0"
```

> The dev container installs Node/Go via devcontainer *features*, so a plain
> `docker compose up app` won't have those toolchains — use an IDE (Option A) or
> the `docker run` commands (Option B). The `-H 0.0.0.0` flag makes the frontend
> reachable through the published port.
