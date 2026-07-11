#!/usr/bin/env bash
# Descarga placeholders de iconos desde plantilla Expo (ejecutar una vez).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/assets"
BASE="https://raw.githubusercontent.com/expo/expo/master/templates/expo-template-blank-typescript/assets"
for f in icon.png adaptive-icon.png splash-icon.png favicon.png; do
  curl -fsSL -o "$ROOT/assets/$f" "$BASE/icon.png"
done
echo "Assets listos en assets/"
