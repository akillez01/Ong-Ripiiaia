#!/bin/bash
# Script para buildar e integrar TUDO em um só comando
set -e

# Caminhos
PLATAFORMA_DIR="Plataforma-RipiIaia"
RIPI_IAIA_DIR="Ripi-Iaia"
PLATAFORMA_DIST="$PLATAFORMA_DIR/dist"
RIPI_IAIA_DIST="$RIPI_IAIA_DIR/dist"

# 1. Build da plataforma
cd "$PLATAFORMA_DIR"
echo "🔨 Buildando Plataforma-RipiIaia..."
npm install
npm run build
cd ..

# 2. Build do Ripi-Iaia
cd "$RIPI_IAIA_DIR"
echo "🔨 Buildando Ripi-Iaia..."
npm install
npm run build
cd ..

# 3. Copia o build do Ripi-Iaia para dentro do dist da plataforma
rm -rf "$PLATAFORMA_DIST/Ripi-Iaia"
cp -r "$RIPI_IAIA_DIST" "$PLATAFORMA_DIST/Ripi-Iaia"

echo "✅ Tudo pronto! O build da plataforma já inclui o Ripi-Iaia em /Ripi-Iaia/"
