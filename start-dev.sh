#!/bin/bash

# Cores para melhor visualização
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sem cor

echo -e "${YELLOW}🚀 Iniciando o servidor backend e o frontend...${NC}"

# Diretório do projeto
PROJECT_DIR="$(dirname "$0")"
cd "$PROJECT_DIR"

# Iniciar backend em background
echo -e "${YELLOW}📡 Iniciando backend...${NC}"
cd Ripi-Iaia/backend
(npm run dev) &
BACKEND_PID=$!

# Pequena pausa para o backend iniciar
sleep 2

# Iniciar frontend 
echo -e "${YELLOW}🌐 Iniciando frontend...${NC}"
cd ../
npm run dev

# Quando o frontend terminar, termine também o backend
kill $BACKEND_PID
