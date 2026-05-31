# prisma

Owns the Postgres schema (`schema.prisma`) and migrations for the telemetry
pipeline.

- **No models yet** — the telemetry schema is a deferred decision (see root
  `CLAUDE.md`).
- The `prisma-client-js` generator is a placeholder. The Go *runtime* query layer
  (pgx / sqlc / GORM) is also deferred; Prisma may end up migrations-only, since
  the official Prisma Go client was sunset in 2022.

## Usage (inside the dev container)

```bash
npm install
npm run migrate     # prisma migrate dev — create/apply a migration
npm run studio      # browse the DB
```

`DATABASE_URL` is supplied by the dev container's Postgres service.
