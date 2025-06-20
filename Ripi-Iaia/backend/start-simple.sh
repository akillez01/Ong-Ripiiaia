#!/bin/bash

# Cores para melhor visualização
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sem cor

echo -e "${YELLOW}🔍 Verificando e corrigindo problemas de rota...${NC}"

# Navegação para o diretório correto
cd "$(dirname "$0")"
if [ ! -d "src" ]; then
    echo -e "${RED}❌ Erro: Diretório src não encontrado.${NC}"
    exit 1
fi

# Executar script de correção de caminhos
echo -e "${YELLOW}🔧 Executando script de correção de rotas problemáticas...${NC}"
node fix-path-issues.js

# Após a correção, tenta iniciar o servidor simplificado
echo -e "\n${YELLOW}🚀 Iniciando servidor simplificado para contornar problemas...${NC}"
echo -e "${YELLOW}⚠️  Este é um servidor mínimo apenas para teste!${NC}"

# Configura o ambiente
export NODE_ENV=development

# Inicia o servidor simplificado
node src/simple-server.js
