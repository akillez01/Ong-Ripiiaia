#!/bin/bash

# Este script facilita a inicialização do servidor backend
# a partir do diretório correto

echo "🚀 Iniciando servidor backend Ripi Iaiá..."

# Navega para o diretório correto do backend
cd "$(dirname "$0")/Ripi-Iaia/backend"

# Verifica se chegou ao diretório correto
if [ ! -f "./src/index.js" ]; then
    echo "❌ Erro: Não foi possível encontrar o arquivo src/index.js no diretório atual."
    echo "Diretório atual: $(pwd)"
    exit 1
fi

# Configura o ambiente
export NODE_ENV=development

# Inicia o servidor
echo "📂 Diretório: $(pwd)"
echo "🔧 Ambiente: $NODE_ENV"
echo "🌐 Iniciando servidor..."

node src/index.js
