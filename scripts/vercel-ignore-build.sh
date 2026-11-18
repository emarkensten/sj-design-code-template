#!/usr/bin/env bash
# Vercel kör det här skriptet före varje bygge (vercel.json → ignoreCommand).
# Exit 0 = hoppa över bygget, exit 1 = bygg.
#
# Varje push från en Claude-session, @claude i GitHub eller en kollega till en
# egen gren blev förut ett eget bygge, och varje bygge lagras. Därför byggs
# bara main (huvudlänken) och grenar som uttryckligen ska ha en egen länk:
# variant-* (varianter att visa) och preview-* (förhandslänk innan något
# hamnar på main). Samma regel finns i scripts/ship.mjs.
case "${VERCEL_GIT_COMMIT_REF:-main}" in
  main | variant-* | preview-*) exit 1 ;;
  *) echo "Hoppar över bygget av grenen ${VERCEL_GIT_COMMIT_REF}. Bara main, variant-* och preview-* byggs."; exit 0 ;;
esac
