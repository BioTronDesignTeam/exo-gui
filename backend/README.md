# backend

Go service for the exo telemetry pipeline. HTTP via **Fiber**. Operator login
lives in **OAuthManager** — this process does not issue sessions.

## Routes

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/health` | Liveness — `{"status":"ok"}` |

Telemetry ingest and WebSocket fan-out land next. Device ingest will use
per-machine API keys. Operator-facing routes will call OAuthManager
`/v1/check`.

## Run

```bash
cd backend && go run .
curl http://localhost:8080/health
```
