#!/usr/bin/env bash
# Regenerates the responsive JPEGs in public/img from the originals in assets/.
# Each image is written at the widths used by src/lib/imageLoader.ts (never upscaled).
# Requires macOS `sips`. Run: ./scripts/optimize-images.sh
set -euo pipefail
cd "$(dirname "$0")/.."

OUT=public/img
WIDTHS=(160 480 800 1200)
QUALITY=72

mkdir -p "$OUT"
rm -f "$OUT"/*.jpg

for src in assets/*.jpg assets/*.png; do
    name=$(basename "${src%.*}")
    src_w=$(sips -g pixelWidth "$src" | awk '/pixelWidth/ {print $2}')
    for w in "${WIDTHS[@]}"; do
        target=$(( w < src_w ? w : src_w ))
        sips --resampleWidth "$target" -s format jpeg -s formatOptions "$QUALITY" "$src" --out "$OUT/$name-$w.jpg" >/dev/null
    done
done

du -sh "$OUT"
