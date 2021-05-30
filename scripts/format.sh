#!/usr/bin/env bash
echo "┏━━━ 💅 FORMAT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
yarn prettier --single-quote --write src/*.ts src/**/*.ts
