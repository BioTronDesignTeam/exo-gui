#!/usr/bin/env bash
set -u

INGEST_URL="${INGEST_URL:-http://localhost:8080/api/telemetry}"
RATE_HZ="${RATE_HZ:-1}"
COUNT="${COUNT:-0}"

period="$(awk -v hz="$RATE_HZ" 'BEGIN { print (hz > 0) ? 1 / hz : 1 }')"

payload() {
  awk -v ts="$(date -u +%Y-%m-%dT%H:%M:%SZ)" -v seed="$1" '
    function j(b, s) { return sprintf("%.2f", b + (rand() - 0.5) * s) }
    BEGIN {
      srand(seed)
      printf "{\"ts\":\"%s\",", ts
      printf "\"battery\":{\"voltage\":%s,\"current\":%s},", j(24, 2), j(5, 3)
      printf "\"motors\":{"
      printf "\"left_hip\":{\"temperature\":%s,\"position\":%s,\"velocity\":%s,\"torque\":%s,\"error\":\"none\"},", j(35, 6), j(0, 90), j(0, 40), j(0, 8)
      printf "\"right_hip\":{\"temperature\":%s,\"position\":%s,\"velocity\":%s,\"torque\":%s,\"error\":\"none\"}},", j(35, 6), j(0, 90), j(0, 40), j(0, 8)
      printf "\"mcu\":{\"stm32_ok\":true,\"link_ok\":true}}"
    }'
}

if (( COUNT > 0 )); then
  echo "mock_telemetry -> $INGEST_URL @ ${RATE_HZ} Hz, ${COUNT} samples"
else
  echo "mock_telemetry -> $INGEST_URL @ ${RATE_HZ} Hz (Ctrl-C to stop)"
fi

n=0
while :; do
  n=$(( n + 1 ))
  code="$(curl -s -o /dev/null -w '%{http_code}' \
    -X POST -H 'content-type: application/json' \
    --data "$(payload "$(( RANDOM + n ))")" "$INGEST_URL" 2>/dev/null || echo 000)"
  printf '\r#%d  HTTP %s    ' "$n" "$code"
  if (( COUNT > 0 )) && (( n >= COUNT )); then break; fi
  sleep "$period"
done
echo
echo "done"
