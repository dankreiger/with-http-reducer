#!/usr/bin/env bash
echo "┏━━━ 📦 Building $(pwd) and watching for changes ━━━━━━━━━━━━━━━━━━━"
yarn clean
yarn rollup -c ./config/rollup.config.ts -w