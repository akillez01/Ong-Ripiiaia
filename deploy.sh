#!/bin/bash

# Script para deploy para o Plesk
# Execute com: ./deploy.sh [frontend|backend|all]

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configurações (edite conforme necessário)
PLESK_HOST="plesk.ripiiaia.org"
FRONTEND_SSH_USER="ripiiaia"
BACKEND_SSH_USER="api_ripiiaia"
FRONTEND_REMOTE_PATH="/var/www/vhosts/ripiiaia.org/httpdocs"
BACKEND_REMOTE_PATH="/var/www/vhosts/api.ripiiaia.org/httpdocs"

# Pasta de trabalho local
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="${BASE_DIR}/Ripi-Iaia"
BACKEND_DIR="${BASE_DIR}/Ripi-Iaia/backend"

# Deploy Frontend
deploy_frontend() {
    echo -e "${YELLOW}=== Iniciando deploy do frontend ===${NC}"
    
    echo -e "${GREEN}Construindo o frontend...${NC}"
    cd "$FRONTEND_DIR" || exit 1
    npm run build
    
    echo -e "${GREEN}Enviando arquivos para o Plesk...${NC}"
    # Primeiro envia os arquivos
    scp -r dist/* "${FRONTEND_SSH_USER}@${PLESK_HOST}:${FRONTEND_REMOTE_PATH}"
    
    echo -e "${GREEN}Deploy do frontend concluído!${NC}"
    
    # Aviso para configuração de redirecionamento
    echo -e "${YELLOW}NOTA: Lembre-se de configurar o redirecionamento para o SPA no Plesk.${NC}"
    echo "1. Acesse o Plesk > domínio ripiiaia.org > Apache & nginx Settings"
    echo "2. Adicione o seguinte ao arquivo .htaccess (se não existir):"
    echo -e "${GREEN}RewriteEngine On\nRewriteBase /\nRewriteRule ^index\.html$ - [L]\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule . /index.html [L]${NC}"
}

# Deploy Backend
deploy_backend() {
    echo -e "${YELLOW}=== Iniciando deploy do backend ===${NC}"
    
    echo -e "${GREEN}Preparando arquivos do backend...${NC}"
    cd "$BACKEND_DIR" || exit 1
    
    # Cria um diretório temporário para o deploy
    TEMP_DIR="$(mktemp -d)"
    
    # Copia os arquivos necessários
    rsync -av --exclude 'node_modules' --exclude '.env' --exclude '.git' \
          --exclude '.env.*' --exclude '*.log' \
          --exclude 'uploads/*' \
          . "$TEMP_DIR"
    
    # Copia o .htaccess, Procfile e plesk-node-config.json se existirem
    [ -f .htaccess ] && cp .htaccess "$TEMP_DIR/"
    [ -f Procfile ] && cp Procfile "$TEMP_DIR/"
    [ -f plesk-node-config.json ] && cp plesk-node-config.json "$TEMP_DIR/"
    
    echo -e "${GREEN}Enviando arquivos para o Plesk...${NC}"
    rsync -avz --delete "$TEMP_DIR/" "${BACKEND_SSH_USER}@${PLESK_HOST}:${BACKEND_REMOTE_PATH}"
    
    echo -e "${GREEN}Instalando dependências no servidor...${NC}"
    ssh "${BACKEND_SSH_USER}@${PLESK_HOST}" "cd ${BACKEND_REMOTE_PATH} && npm install --production"
    
    echo -e "${GREEN}Criando diretório de uploads se não existir...${NC}"
    ssh "${BACKEND_SSH_USER}@${PLESK_HOST}" "mkdir -p ${BACKEND_REMOTE_PATH}/public/uploads && chmod 755 ${BACKEND_REMOTE_PATH}/public/uploads"
    
    echo -e "${GREEN}Verificando arquivo .env no servidor...${NC}"
    ssh "${BACKEND_SSH_USER}@${PLESK_HOST}" "if [ ! -f ${BACKEND_REMOTE_PATH}/.env ]; then 
      echo 'AVISO: Arquivo .env não encontrado no servidor. Criando um básico.' 
      echo 'NODE_ENV=production' > ${BACKEND_REMOTE_PATH}/.env
      echo 'PORT=5000' >> ${BACKEND_REMOTE_PATH}/.env
      echo 'Lembre-se de configurar completamente o arquivo .env no servidor!'
    else
      # Garantir que NODE_ENV=production esteja definido no .env
      grep -q 'NODE_ENV=production' ${BACKEND_REMOTE_PATH}/.env || echo 'NODE_ENV=production' >> ${BACKEND_REMOTE_PATH}/.env
    fi"

    echo -e "${GREEN}Reiniciando a aplicação Node.js...${NC}"
    ssh "${BACKEND_SSH_USER}@${PLESK_HOST}" "cd ${BACKEND_REMOTE_PATH} && NODE_ENV=production pm2 restart all || NODE_ENV=production pm2 start src/index.js"
    
    # Limpeza
    rm -rf "$TEMP_DIR"
    
    echo -e "${GREEN}Deploy do backend concluído!${NC}"
    
    echo -e "${YELLOW}=== Verificando CORS após deploy ===${NC}"
    echo "Para testar a configuração de CORS em produção:"
    echo "1. Rode o seguinte comando localmente: node backend/test-cors-production.js"
    echo "2. Verifique se o endpoint /api/test-cors está respondendo corretamente"
    echo "3. Verifique se os cabeçalhos CORS estão sendo enviados corretamente"
    echo -e "${YELLOW}Para testar diretamente no navegador, acesse: ${BACKEND_REMOTE_PATH}/api/test-cors${NC}"
    
    # Verificar status do NODE_ENV no servidor
    echo -e "${YELLOW}=== Verificando variável NODE_ENV no servidor ===${NC}"
    ssh "${BACKEND_SSH_USER}@${PLESK_HOST}" "cd ${BACKEND_REMOTE_PATH} && echo 'NODE_ENV atual:' && grep NODE_ENV .env || echo 'NODE_ENV não encontrado no .env!'"
}

# Determina o que deploy fazer
case "$1" in
    frontend)
        deploy_frontend
        ;;
    backend)
        deploy_backend
        ;;
    all|"")
        deploy_frontend
        deploy_backend
        ;;
    *)
        echo -e "${RED}Uso: $0 [frontend|backend|all]${NC}"
        exit 1
        ;;
esac

echo -e "${GREEN}Deploy concluído com sucesso!${NC}"
