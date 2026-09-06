#!/usr/bin/env bash
# Rebuild the merged site and serve it beside the current one, for comparison.
#
#   ./serve.sh          rebuild + (re)start both servers
#   ./serve.sh stop     stop them
#
#   http://127.0.0.1:8801   NEW merged site   (this repo, built by Jekyll)
#   http://127.0.0.1:8803   CURRENT site      (../website, served as-is)
#
# Jekyll lives in the user gem dir, which isn't on PATH by default.
set -uo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="${TMPDIR:-/tmp}/valence-preview"
LIVE="$(cd "$REPO/.." && pwd)/website"
GEMBIN="$(ruby -e 'print Gem.user_dir' 2>/dev/null)/bin"
[ -d "$GEMBIN" ] && PATH="$PATH:$GEMBIN"

kill_port() {
  local p=$1 pid
  # match the server, never this script
  pid=$(ss -ltnp 2>/dev/null | grep -oP "127\.0\.0\.1:$p\b.*pid=\K[0-9]+" | head -1)
  [ -n "${pid:-}" ] && kill "$pid" 2>/dev/null
}

if [ "${1:-}" = "stop" ]; then
  kill_port 8801; kill_port 8803
  echo "stopped."
  exit 0
fi

command -v jekyll >/dev/null || { echo "jekyll not found (looked in $GEMBIN)"; exit 1; }

echo "building…"
rm -rf "$OUT"
# baseurl is empty so the site works at the root of a local server
jekyll build --source "$REPO" --destination "$OUT" --baseurl "" --quiet || exit 1
# the preview labs are excluded from the build but useful to have alongside
cp "$REPO"/preview-*.html "$OUT"/ 2>/dev/null

kill_port 8801; kill_port 8803
# detach stdin/stdout/stderr fully, or a backgrounded server keeps this
# script's pipe open and `./serve.sh | tail` never returns
( cd "$OUT"  && setsid python3 -m http.server 8801 --bind 127.0.0.1 </dev/null >/dev/null 2>&1 & ) </dev/null >/dev/null 2>&1
[ -d "$LIVE" ] && ( cd "$LIVE" && setsid python3 -m http.server 8803 --bind 127.0.0.1 </dev/null >/dev/null 2>&1 & ) </dev/null >/dev/null 2>&1
sleep 1

printf '\n  NEW      http://127.0.0.1:8801   %s pages\n' "$(find "$OUT" -name '*.html' | wc -l | tr -d ' ')"
[ -d "$LIVE" ] && printf '  CURRENT  http://127.0.0.1:8803   (%s)\n' "$LIVE"
printf '\n  stop with: ./serve.sh stop\n\n'
