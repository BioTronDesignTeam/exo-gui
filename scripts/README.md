# scripts

Dev/ops utilities. Plain shell — `bash` + `curl`.

## mock_telemetry.sh

Dev stand-in for the ESP32 WiFi coprocessor: POSTs batched telemetry JSON to
the exo-gui ingest endpoint.

```bash
./scripts/mock_telemetry.sh
INGEST_URL=http://localhost:8080/api/telemetry RATE_HZ=5 ./scripts/mock_telemetry.sh
MACHINE_ID=exo-002 RATE_HZ=2 BATCH=20 COUNT=50 ./scripts/mock_telemetry.sh
```

| Env | Default | Meaning |
|-----|---------|---------|
| `MACHINE_ID` | `exo-001` | the batch's `machine_id` tag |
| `INGEST_URL` | `http://localhost:8080/api/telemetry` | where to POST |
| `RATE_HZ` | `1` | POSTs (batches) per second |
| `BATCH` | `10` | samples per batch |
| `COUNT` | `0` | stop after N batches (`0` = forever) |
