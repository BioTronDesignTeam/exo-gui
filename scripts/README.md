# scripts

Dev/ops utilities. Plain shell — runnable anywhere with `bash` + `curl` (no Node
needed).

## mock_telemetry.sh

The dev stand-in for the STM32: POSTs representative telemetry JSON to the Fiber
ingest endpoint at a configurable rate. Replaces the old Python dummy server.

```bash
./scripts/mock_telemetry.sh
INGEST_URL=http://localhost:8080/api/telemetry RATE_HZ=5 ./scripts/mock_telemetry.sh
RATE_HZ=2 COUNT=50 ./scripts/mock_telemetry.sh     # send 50 samples then stop
```

| Env | Default | Meaning |
|-----|---------|---------|
| `INGEST_URL` | `http://localhost:8080/api/telemetry` | where to POST |
| `RATE_HZ` | `1` | samples per second |
| `COUNT` | `0` | stop after N samples (`0` = forever) |

Needs `bash`, `curl`, and `awk` (all standard on the Debian box and in the dev
container). Fine up to ~tens of Hz; for high-rate load testing a compiled sender
(Go) scales better. The payload shape (battery / per-motor / mcu) tracks the
candidate telemetry fields in the root `CLAUDE.md`. Point `INGEST_URL` at the
real ingest route once the Fiber backend lands it.
