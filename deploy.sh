#!/bin/bash

set -e

DEPLOY_DIR="${DEPLOY_DIR:-/var/www}"  # Remplace si besoin

# Nettoie le dossier cible sans supprimer Docker volumes ou config
rm -rf "$DEPLOY_DIR/tmp_deploy"
mkdir -p "$DEPLOY_DIR/tmp_deploy"

# Archive le code versionné uniquement et extrais-le dans le dossier temporaire
git archive --format=tar HEAD | tar -x -C "$DEPLOY_DIR/tmp_deploy"

# Remplace le code actuel par la nouvelle version
rsync -a --delete "$DEPLOY_DIR/tmp_deploy/" "$DEPLOY_DIR/"
rm -rf "$DEPLOY_DIR/tmp_deploy"
