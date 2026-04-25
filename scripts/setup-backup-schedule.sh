#!/usr/bin/env bash
# One-time installer for the weekly KV backup schedule.
#
# What it does:
#   1. Stores an encryption passphrase in macOS Keychain (service: MamaHala-Backup-Encryption)
#      — same passphrase format as backup-secrets.sh; you can reuse it.
#   2. Generates a launchd plist from the template, with absolute paths filled in.
#   3. Loads the plist (Sunday 03:00 weekly).
#   4. Runs one test backup right away to verify everything works end-to-end.
#
# What it does NOT do:
#   - Send an email until the first scheduled or manual backup runs.
#   - Modify .env files, git state, or any code.
#
# Re-run this script any time after a Mac upgrade, paths change, or you rotate the passphrase.

set -euo pipefail

KEYCHAIN_SERVICE="MamaHala-Backup-Encryption"
LABEL="com.mamahala.backup-kv"
PLIST_TARGET="$HOME/Library/LaunchAgents/$LABEL.plist"

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT_PATH="$PROJECT_ROOT/scripts/backup-kv.mjs"
TEMPLATE_PATH="$PROJECT_ROOT/scripts/com.mamahala.backup-kv.plist.template"
LOG_DIR="$HOME/Backups/MamaHala/kv"
LOG_PATH="$LOG_DIR/.launchd.log"
NODE_PATH="$(command -v node)"

if [ -z "$NODE_PATH" ]; then
  echo "❌ node not found on PATH. Activate nvm or install node first."
  exit 1
fi
if [ ! -f "$SCRIPT_PATH" ]; then
  echo "❌ Backup script missing at $SCRIPT_PATH"
  exit 1
fi
if [ ! -f "$TEMPLATE_PATH" ]; then
  echo "❌ launchd template missing at $TEMPLATE_PATH"
  exit 1
fi

echo "📦 Project root: $PROJECT_ROOT"
echo "📦 node:         $NODE_PATH"
echo "📦 plist target: $PLIST_TARGET"
echo ""

# ---------- 1. Passphrase ----------
if security find-generic-password -s "$KEYCHAIN_SERVICE" -w >/dev/null 2>&1; then
  echo "🔑 Passphrase already in keychain (service: $KEYCHAIN_SERVICE). Keeping it."
  echo "   Use 'security delete-generic-password -s $KEYCHAIN_SERVICE' to rotate."
else
  echo "🔑 Setting up encryption passphrase."
  echo "   This passphrase encrypts every backup. STORE IT IN 1PASSWORD."
  echo "   Without it, future backups CANNOT be decrypted."
  echo ""
  read -r -s -p "Enter passphrase: " PASS1; echo
  read -r -s -p "Confirm passphrase: " PASS2; echo
  if [ "$PASS1" != "$PASS2" ]; then
    echo "❌ Passphrases do not match. Aborting."
    exit 1
  fi
  if [ ${#PASS1} -lt 12 ]; then
    echo "❌ Passphrase must be at least 12 characters. Aborting."
    exit 1
  fi
  # -U updates if exists; but we already checked it doesn't exist
  security add-generic-password \
    -a "$USER" \
    -s "$KEYCHAIN_SERVICE" \
    -w "$PASS1" \
    -T /usr/bin/security \
    -T /usr/bin/openssl
  PASS1=""; PASS2=""
  echo "✅ Passphrase stored in keychain."
fi
echo ""

# ---------- 2. Generate plist ----------
mkdir -p "$LOG_DIR" "$(dirname "$PLIST_TARGET")"
chmod 700 "$LOG_DIR"

sed \
  -e "s|__NODE_PATH__|$NODE_PATH|g" \
  -e "s|__SCRIPT_PATH__|$SCRIPT_PATH|g" \
  -e "s|__PROJECT_ROOT__|$PROJECT_ROOT|g" \
  -e "s|__LOG_PATH__|$LOG_PATH|g" \
  "$TEMPLATE_PATH" > "$PLIST_TARGET"

chmod 644 "$PLIST_TARGET"
echo "📝 Wrote $PLIST_TARGET"
echo ""

# ---------- 3. Load (or reload) into launchd ----------
if launchctl list | grep -q "^[0-9-]*\s*[0-9-]*\s*$LABEL$"; then
  echo "🔄 Existing launchd job found. Unloading first..."
  launchctl unload "$PLIST_TARGET" 2>/dev/null || true
fi
launchctl load "$PLIST_TARGET"
echo "✅ launchd job loaded. Schedule: every Sunday at 03:00."
echo ""

# ---------- 4. Test run ----------
echo "🧪 Running one test backup (--scheduled mode) to verify end-to-end..."
echo ""
"$NODE_PATH" "$SCRIPT_PATH" --scheduled
echo ""
echo "✅ Setup complete."
echo ""
echo "📋 Verify schedule:   launchctl list | grep $LABEL"
echo "📋 View log:          tail -f $LOG_PATH"
echo "📋 Run now:           $NODE_PATH $SCRIPT_PATH --scheduled"
echo "📋 Disable:           launchctl unload $PLIST_TARGET"
echo "📋 Decrypt a backup:  openssl enc -d -aes-256-cbc -pbkdf2 -in <file>.json.enc -out <file>.json"
