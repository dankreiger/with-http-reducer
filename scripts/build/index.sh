#!/usr/bin/env bash
echo "┏━━━ 📦 Building $(pwd) ━━━━━━━━━━━━━━━━━━━"
yarn clean
yarn rollup -c ./rollup.config.ts