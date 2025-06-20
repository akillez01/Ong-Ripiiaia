#!/bin/bash

# Script para testar CORS entre o frontend e backend
# Execute este script após fazer o deploy para verificar se o CORS está configurado corretamente

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

FRONTEND_URL="https://dreamy-carson.66-179-92-233.plesk.page"
BACKEND_URL="https://api.ripiiaia.org"
TEST_ENDPOINT="/api/test-cors"

echo -e "${YELLOW}=== Testando configuração de CORS ===${NC}"
echo -e "Frontend: ${GREEN}${FRONTEND_URL}${NC}"
echo -e "Backend: ${GREEN}${BACKEND_URL}${NC}"
echo -e "Endpoint de teste: ${GREEN}${TEST_ENDPOINT}${NC}"
echo "----------------------------------------"

# Testar com curl simulando uma requisição do frontend
echo -e "${YELLOW}Realizando requisição GET com origem do frontend...${NC}"
curl -i -H "Origin: ${FRONTEND_URL}" \
     -H "Content-Type: application/json" \
     -X GET "${BACKEND_URL}${TEST_ENDPOINT}"

echo ""
echo "----------------------------------------"

# Testar preflight OPTIONS
echo -e "${YELLOW}Realizando requisição OPTIONS (preflight)...${NC}"
curl -i -H "Origin: ${FRONTEND_URL}" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type,Authorization" \
     -X OPTIONS "${BACKEND_URL}${TEST_ENDPOINT}"

echo ""
echo "----------------------------------------"
echo -e "${YELLOW}=== Verificando se NODE_ENV está configurado como 'production' ===${NC}"
echo -e "Acesse o servidor via SSH e execute: ${GREEN}cat .env | grep NODE_ENV${NC}"
echo -e "Ou verifique a resposta da API em: ${GREEN}${BACKEND_URL}${TEST_ENDPOINT}${NC}"

echo ""
echo -e "${YELLOW}=== Verificando se o blog está acessando a API corretamente ===${NC}"
echo -e "1. Abra o navegador em: ${GREEN}${FRONTEND_URL}${NC}"
echo -e "2. Abra as ferramentas de desenvolvedor (F12)"
echo -e "3. Verifique na aba Network se há erros de CORS ao acessar ${GREEN}${BACKEND_URL}${NC}"

echo ""
echo -e "${YELLOW}=== Se ainda houver problemas de CORS ===${NC}"
echo "1. Verifique se NODE_ENV=production no servidor"
echo "2. Verifique se o domínio do frontend está na lista de origens permitidas em cors-fix-prod.js"
echo "3. Certifique-se de que o arquivo cors-fix-prod.js está sendo importado e usado no index.js"
echo "4. Reinicie o servidor Node.js com: pm2 restart all"
