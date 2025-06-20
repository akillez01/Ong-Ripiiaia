#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Testando configurações de CORS${NC}"

# Definir base URL
BASE_URL=${1:-"http://localhost:5000"}

echo -e "${YELLOW}Testando conexão com $BASE_URL${NC}"

# Teste 1: GET simples para a rota de teste
echo -e "\n${YELLOW}1. Testando GET /api/test${NC}"
curl -v -X GET \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET" \
  "${BASE_URL}/api/test" 2>&1 | grep -E "access-control|< HTTP"

# Teste 2: OPTIONS preflight para a rota de posts com cabeçalhos personalizados
echo -e "\n${YELLOW}2. Testando OPTIONS preflight para /api/posts com cabeçalhos personalizados${NC}"
curl -v -X OPTIONS \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type, Cache-Control, Authorization" \
  "${BASE_URL}/api/posts" 2>&1 | grep -E "access-control|< HTTP"

# Teste 3: POST para a rota de posts com cabeçalho Cache-Control
echo -e "\n${YELLOW}3. Testando POST /api/posts com cabeçalho Cache-Control${NC}"
curl -v -X POST \
  -H "Origin: http://localhost:5173" \
  -H "Content-Type: application/json" \
  -H "Cache-Control: no-cache" \
  -d '{"title":"Teste de CORS","content":"Este é um teste de CORS com cache-control","author":"Teste"}' \
  "${BASE_URL}/api/posts" 2>&1 | grep -E "access-control|< HTTP"

echo -e "\n${GREEN}✅ Testes de CORS concluídos${NC}"
echo -e "${YELLOW}Se você vir \"Access-Control-Allow-Origin\" em todas as respostas, o CORS está configurado corretamente.${NC}"
