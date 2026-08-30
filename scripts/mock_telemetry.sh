#!/usr/bin/env bash
# Dev stand-in for the ESP32 WiFi coprocessor: POSTs batched telemetry in the
# confirmed wire shape (one POST = one batch from one machine). Each sample
# carries a microsecond `sampled_at` and a per-run `seq` counter.
# Override with MACHINE_ID / INGEST_URL / RATE_HZ / BATCH / COUNT.
set -u

MACHINE_ID="${MACHINE_ID:-exo-001}"
INGEST_URL="${INGEST_URL:-http://localhost:8080/api/telemetry}"
RATE_HZ="${RATE_HZ:-1}"   # POSTs (batches) per second
BATCH="${BATCH:-10}"      # samples per batch
COUNT="${COUNT:-0}"       # stop after N batches (0 = run until Ctrl-C)

period="$(awk -v hz="$RATE_HZ" 'BEGIN { print (hz > 0) ? 1 / hz : 1 }')"
sample_dt_us=10000        # spacing between samples in a batch (~100 Hz)

batch_payload() {
  # $1 = base sampled_at (µs epoch), $2 = starting seq, $3 = rng seed
  awk -v mid="$MACHINE_ID" -v base="$1" -v seq0="$2" -v n="$BATCH" -v dt="$sample_dt_us" -v seed="$3" '
    function j(b, s) { return sprintf("%.2f", b + (rand() - 0.5) * s) }
    BEGIN {
      srand(seed)
      printf "{\"machine_id\":\"%s\",\"samples\":[", mid
      for (i = 0; i < n; i++) {
        if (i > 0) printf ","
        printf "{\"sampled_at\":%d,\"seq\":%d,", base + i * dt, seq0 + i
        printf "\"battery\":{\"voltage\":%s,\"current\":%s},", j(48, 2), j(3, 2)
        printf "\"left\":{\"temp\":%s,\"position\":%s,\"velocity\":%s,\"torque\":%s,\"error\":0},", j(41, 6), j(1.2, 0.4), j(0, 0.4), j(2, 1)
        printf "\"right\":{\"temp\":%s,\"position\":%s,\"velocity\":%s,\"torque\":%s,\"error\":0},", j(41, 6), j(1.2, 0.4), j(0, 0.4), j(2, 1)
        printf "\"mcu_status\":\"ok\",\"link_status\":\"ok\"}"
      }
      printf "]}"
    }'
}

if (( COUNT > 0 )); then
  echo "mock_telemetry ($MACHINE_ID) -> $INGEST_URL @ ${RATE_HZ} Hz x ${BATCH}/batch, ${COUNT} batches"
else
  echo "mock_telemetry ($MACHINE_ID) -> $INGEST_URL @ ${RATE_HZ} Hz x ${BATCH}/batch (Ctrl-C to stop)"
fi

n=0
seq=0
while :; do
  n=$(( n + 1 ))
  base_us="$(date +%s%6N)"
  body="$(batch_payload "$base_us" "$seq" "$(( RANDOM + n ))")"
  code="$(curl -s -o /dev/null -w '%{http_code}' \
    -X POST -H 'content-type: application/json' \
    --data "$body" "$INGEST_URL" 2>/dev/null || echo 000)"
  printf '\r#%d  seq %d-%d  HTTP %s    ' "$n" "$seq" "$(( seq + BATCH - 1 ))" "$code"
  seq=$(( seq + BATCH ))
  if (( COUNT > 0 )) && (( n >= COUNT )); then break; fi
  sleep "$period"
done
echo
echo "done"
