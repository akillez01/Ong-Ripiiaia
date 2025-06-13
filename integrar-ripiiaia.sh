#!/bin/bash
# Script para automatizar o build e integração do projeto Ripi-Iaia na plataforma Plataforma-RipiIaia

set -e

# Caminhos relativos ao workspace
RIPI_IAIA_DIR="../Ripi-Iaia"
PLATAFORMA_DIST="../Plataforma-RipiIaia/dist"
RIPI_IAIA_DIST="$RIPI_IAIA_DIR/dist"

# 1. Build do projeto Ripi-Iaia
cd "$RIPI_IAIA_DIR"
echo "🔨 Gerando build do projeto Ripi-Iaia..."
npm install
npm run build

# 2. Copia o build para dentro do dist da plataforma
cd "$PLATAFORMA_DIST/.."
echo "🚚 Copiando build do Ripi-Iaia para a plataforma..."
rm -rf "$PLATAFORMA_DIST/Ripi-Iaia"
cp -r "$RIPI_IAIA_DIST" "$PLATAFORMA_DIST/Ripi-Iaia"

echo "✅ Integração concluída! O projeto Ripi-Iaia está disponível em /Ripi-Iaia/ dentro do build da plataforma."
