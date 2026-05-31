# backend

Go service for the exo telemetry pipeline.

**Skeleton only.** Right now this is a stdlib `/health` endpoint on `:8080`
(`PORT` overrides). The Fiber HTTP router, the WebSocket fan-out hub, and
Postgres access land in later refactor chunks — see the root `CLAUDE.md`.

## Run (inside the dev container)

```bash
go run .
curl localhost:8080/health   # {"status":"ok"}
```

Module path: `github.com/BioTronDesignTeam/exo-gui/backend`
