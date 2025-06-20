#!/bin/bash

# Cores para melhor visualização
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sem cor

echo -e "${YELLOW}🔍 Verificando dependências...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado. Por favor instale o Node.js.${NC}"
    exit 1
fi

echo -e "${YELLOW}🛠️ Verificando configurações...${NC}"

# Reinstalar dependências
echo -e "${YELLOW}📦 Reinstalando path-to-regexp...${NC}"
npm uninstall path-to-regexp
npm install path-to-regexp

# Verificar conteúdo do arquivo path-to-regexp
echo -e "${YELLOW}🔍 Verificando arquivo path-to-regexp...${NC}"
grep "DEBUG_URL" node_modules/path-to-regexp/dist/index.js
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Arquivo path-to-regexp não encontrado ou corrompido${NC}"
else
    echo -e "${GREEN}✅ Arquivo path-to-regexp parece estar ok${NC}"
fi

# Verificar se .env existe
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️ Arquivo .env não encontrado. Criando a partir do exemplo...${NC}"
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}✅ Arquivo .env criado com sucesso!${NC}"
        echo -e "${YELLOW}⚠️ ATENÇÃO: Edite o arquivo .env com suas configurações corretas.${NC}"
    else
        echo -e "${RED}❌ Arquivo .env.example não encontrado. Criando .env básico...${NC}"
        cat > .env << EOF
# Configurações do Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=ripiiaia_db

# Configuração do Servidor
PORT=5000

# JWT para autenticação
JWT_SECRET=$(openssl rand -hex 32)

# Configuração de uploads
UPLOAD_DIR=./uploads

# Ambiente
NODE_ENV=development
EOF
        echo -e "${GREEN}✅ Arquivo .env básico criado com sucesso!${NC}"
        echo -e "${YELLOW}⚠️ ATENÇÃO: Edite o arquivo .env com suas configurações corretas.${NC}"
    fi
fi

echo -e "${YELLOW}🔍 Verificando problemas nas rotas...${NC}"
if [ -f "src/fix-routes.js" ]; then
    node src/fix-routes.js
else
    echo -e "${YELLOW}⚠️ Arquivo fix-routes.js não encontrado. Pulando etapa.${NC}"
fi

echo -e "${YELLOW}🚀 Tentando iniciar servidor principal...${NC}"
NODE_OPTIONS="--trace-warnings" node src/index.js

# Se o servidor principal falhar, inicie o servidor simplificado
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Falha ao iniciar o servidor principal.${NC}"
    echo -e "${YELLOW}🔄 Iniciando servidor simplificado como alternativa...${NC}"
    node src/simple-server.js
fi
