#!/usr/bin/env bash
echo "┏━━━ 📦 Building $(pwd) and watching for changes ━━━━━━━━━━━━━━━━━━━"
yarn clean
yarn rollup -c ./rollup.config.ts -w