#!/bin/bash

# Script para verificar se o frontend está configurado corretamente para acessar a API
# Execute este script após fazer o deploy para verificar configurações do frontend

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Caminho para o diretório do frontend
FRONTEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/Ripi-Iaia"
FRONTEND_ENV="${FRONTEND_DIR}/.env.production"
FRONTEND_VITE_CONFIG="${FRONTEND_DIR}/vite.config.ts"

echo -e "${YELLOW}=== Verificando configuração do frontend ===${NC}"

# Verificar configuração de ambiente do frontend
echo -e "${GREEN}Verificando .env.production...${NC}"
if [ -f "$FRONTEND_ENV" ]; then
  echo "Arquivo .env.production encontrado:"
  grep -i "VITE_API_URL" "$FRONTEND_ENV" || echo -e "${RED}VITE_API_URL não está definido!${NC}"
else
  echo -e "${RED}Arquivo .env.production não encontrado!${NC}"
  echo "Você deve criar este arquivo com o seguinte conteúdo:"
  echo "VITE_API_URL=https://api.ripiiaia.org"
fi

echo ""
echo -e "${GREEN}Verificando vite.config.ts para CORS e proxy...${NC}"
if [ -f "$FRONTEND_VITE_CONFIG" ]; then
  echo "Procurando configuração de proxy ou CORS:"
  grep -n -A10 "server" "$FRONTEND_VITE_CONFIG" | grep -E "proxy|cors"
else
  echo -e "${RED}Arquivo vite.config.ts não encontrado!${NC}"
fi

echo ""
echo -e "${YELLOW}=== Recomendações ===${NC}"
echo "1. Verifique se a variável VITE_API_URL está configurada para apontar para a API:"
echo "   https://api.ripiiaia.org"
echo ""
echo "2. Se estiver testando localmente com o frontend em localhost:5173,"
echo "   adicione um proxy no vite.config.ts:"
echo '   server: {'
echo '     proxy: {'
echo '       "/api": {'
echo '         target: "https://api.ripiiaia.org",'
echo '         changeOrigin: true,'
echo '         secure: false'
echo '       }'
echo '     }'
echo '   }'
echo ""
echo "3. Para testar a conexão do frontend com o backend, você pode adicionar"
echo "   um botão de teste que faz uma requisição para /api/test-cors"

# Verifica se há código no frontend que faz chamadas para a API
echo ""
echo -e "${GREEN}Verificando chamadas à API no código do frontend...${NC}"
echo "Arquivos que fazem chamadas fetch ou axios para a API:"
grep -r --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" -l -E "fetch\(|axios" "$FRONTEND_DIR/src"

echo ""
echo -e "${YELLOW}=== Para resolver problemas de CORS ===${NC}"
echo "1. Certifique-se de que o backend está configurado com o middleware CORS correto"
echo "2. Verifique se NODE_ENV=production no servidor backend"
echo "3. Certifique-se de que o domínio do frontend está na lista de origens permitidas"
echo "4. Use HTTPS tanto para o frontend quanto para o backend"
