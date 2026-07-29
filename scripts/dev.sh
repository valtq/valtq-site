#!/usr/bin/env bash
set -euo pipefail

cleanup() {
  exit 0
}
trap cleanup INT TERM

cd "$(dirname "$0")/.."

npx concurrently \
  --names web,api \
  --prefix-colors blue,green \
  --handle-sigint \
  --kill-others \
  "cd apps/web && npx next dev --turbopack --port 3000" \
  "cd apps/api && npx tsx watch --env-file=.env src/server.ts"
