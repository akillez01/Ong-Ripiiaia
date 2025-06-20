#!/bin/bash

# Este script busca literalmente pela string 'git.new' em todos os arquivos JS
# que podem estar causando o erro do path-to-regexp

echo "🔍 Procurando por referências a 'git.new' nos arquivos JavaScript..."

cd "$(dirname "$0")"

# Busca e exibe todas as ocorrências
grep -r "git.new" --include="*.js" .

if [ $? -eq 0 ]; then
    echo -e "\n⚠️ Referências encontradas! Estas podem estar causando o erro."
    echo "Você pode corrigir manualmente estes arquivos."
    
    # Perguntar se deve tentar correção automática
    read -p "Tentar correção automática? (s/n) " answer
    
    if [[ "$answer" == "s" || "$answer" == "S" ]]; then
        find . -name "*.js" -type f -exec sed -i 's/git\.new\/[^"'\''` )]*/"example.com\/redirect"/g' {} \;
        echo "✅ Tentativa de correção realizada. Verifique os arquivos modificados."
    fi
else
    echo "✅ Nenhuma referência direta encontrada."
fi

echo -e "\nVerificando possíveis URLs em rotas do Express..."

# Busca padrões de rotas com URLs
grep -r "router\.\(get\|post\|put\|delete\|patch\|use\).*http" --include="*.js" .

if [ $? -eq 0 ]; then
    echo -e "\n⚠️ Possíveis rotas com URLs encontradas! Estas podem estar causando o erro."
else
    echo "✅ Nenhuma rota com URL completa encontrada."
fi
