#!/bin/bash

# Verifica se o .env existe, se não, cria a partir do exemplo
if [ ! -f .env ]; then
  echo "Arquivo .env não encontrado. Criando a partir do exemplo..."
  cp .env.example .env
  echo "Por favor, edite o arquivo .env com suas configurações"
fi

# Inicia o servidor em modo de desenvolvimento com log de CORS
echo "Iniciando o servidor backend com suporte a CORS..."
NODE_ENV=development DEBUG=express:* nodemon src/index.js
