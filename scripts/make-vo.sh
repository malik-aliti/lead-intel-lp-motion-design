#!/bin/bash
# Generate the voice-over lines with a macOS `say` voice.
# Usage:  bash scripts/make-vo.sh "Reed (Anglais (É.-U.))" 168
# Then re-render:  npx remotion render Narrative-VO-16x9 out/videos/...-VO.mp4
set -e
VOICE="${1:-Tom (Enhanced)}"
RATE="${2:-180}"
DIR="$(cd "$(dirname "$0")/.." && pwd)/public/audio/vo"
mkdir -p "$DIR"

LINES=(
"Most of your leads will never close."
"As a buyer explores your property page, every signal is captured in real time."
"OXO Lead Intel researches who they are across multiple sources, and scores their fit."
"Behaviour and profile merge into a single score. This lead is on fire."
"The score is added to the lead already in your CRM."
"Your team is alerted to call within five minutes."
"OXO Lead Intel. Know which lead to call, before your competitor does."
)

echo "Voice: $VOICE  rate: $RATE"
for i in 0 1 2 3 4 5 6; do
  n=$((i+1))
  say -v "$VOICE" -r "$RATE" -o "/tmp/vo_$n.aiff" "${LINES[$i]}"
  afconvert "/tmp/vo_$n.aiff" "$DIR/vo$n.wav" -d LEI16@44100 -f WAVE >/dev/null 2>&1
  rm -f "/tmp/vo_$n.aiff"
  dur=$(afinfo "$DIR/vo$n.wav" 2>/dev/null | grep -i "estimated duration" | sed "s/.*: //;s/ sec//")
  echo "  vo$n  ${dur}s"
done
echo "done -> $DIR"
