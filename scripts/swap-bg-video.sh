#!/usr/bin/env bash
# Re-encode a background film to all-keyframe H.264 for scroll scrubbing.
# Scrubbing seeks to arbitrary timestamps constantly; long GOPs make that
# stutter or snap to the nearest keyframe, so every frame is a keyframe.
#
#   scripts/swap-bg-video.sh assets/videos/do-step-inn-living-scroll-background-raw.mp4
#
# ffmpeg is taken from $FFMPEG, then the system, then the ffmpeg-static binary
# vendored in website/node_modules. CRF defaults to 18; raise it for a lighter file.
set -euo pipefail

INPUT="${1:?usage: scripts/swap-bg-video.sh <input-video>}"
OUTPUT="${OUTPUT:-website/public/bg.mp4}"
CRF="${CRF:-18}"

if [ -n "${FFMPEG:-}" ] && [ -x "$FFMPEG" ]; then
  BIN="$FFMPEG"
elif command -v ffmpeg >/dev/null 2>&1; then
  BIN="ffmpeg"
elif [ -x "website/node_modules/ffmpeg-static/ffmpeg" ]; then
  BIN="website/node_modules/ffmpeg-static/ffmpeg"
else
  echo "no ffmpeg found — install it, or run 'npm install' inside website/" >&2
  exit 1
fi

mkdir -p "$(dirname "$OUTPUT")"

"$BIN" -y -i "$INPUT" -an -c:v libx264 -preset slow -crf "$CRF" \
  -g 1 -keyint_min 1 -sc_threshold 0 -pix_fmt yuv420p \
  -movflags +faststart "$OUTPUT"

echo "Encoded all-keyframe H.264 to $OUTPUT"

# VP9 sibling: Chrome and Firefox prefer it and it seeks at least as well.
# H.264 stays as the Safari fallback. Set WEBM=0 to skip.
if [ "${WEBM:-1}" = "1" ]; then
  WEBM_OUT="${OUTPUT%.*}.webm"
  "$BIN" -y -i "$INPUT" -an -c:v libvpx-vp9 -crf "${WEBM_CRF:-36}" -b:v 0 \
    -g 1 -keyint_min 1 -deadline good -cpu-used 3 -row-mt 1 \
    -pix_fmt yuv420p "$WEBM_OUT"
  echo "Encoded all-keyframe VP9 to $WEBM_OUT"
fi
