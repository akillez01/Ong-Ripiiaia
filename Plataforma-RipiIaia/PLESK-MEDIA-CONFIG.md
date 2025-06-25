# Configuração de Otimização de Mídia no Plesk

Este guia explica como configurar seu servidor Plesk para otimizar o desempenho de arquivos de mídia (imagens e vídeos) para o projeto Ripi-Iaiá.

## Índice

1. [Estrutura de arquivos no servidor](#estrutura-de-arquivos-no-servidor)
2. [Configurações do .htaccess](#configurações-do-htaccess)
3. [Habilitando HTTP/2](#habilitando-http2)
4. [Configurando limites de PHP](#configurando-limites-de-php)
5. [Configurando cache no Plesk](#configurando-cache-no-plesk)
6. [Monitoramento de desempenho](#monitoramento-de-desempenho)

## Estrutura de arquivos no servidor

Organize seus arquivos de mídia seguindo esta estrutura para melhor gerenciamento e otimização:

```
/public_html
  /.htaccess            # Arquivo de configuração do servidor
  /index.html           # Página principal do site
  /assets/              # Arquivos de estilo e script
  /images/
    /backgrounds/       # Imagens de fundo (em diferentes tamanhos)
    /thumbnails/        # Miniaturas (em diferentes tamanhos)
    /logos/             # Logos e ícones
  /videos/
    /thumbnails/        # Capas para vídeos
    /low/               # Versões com qualidade menor (480p)
    /medium/            # Versões com qualidade média (720p)
    /high/              # Versões com alta qualidade (1080p)
```

## Configurações do .htaccess

1. Acesse seu painel de controle Plesk
2. Navegue até seu domínio
3. Vá para "Arquivos" ou "Gerenciador de Arquivos"
4. Localize ou crie o arquivo `.htaccess` na raiz do site
5. Adicione as configurações abaixo:

```apache
# Ativa a compressão
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript text/javascript application/json
  # Não comprimir imagens/vídeos (já são formatos comprimidos)
</IfModule>

# Cache para arquivos estáticos
<IfModule mod_expires.c>
  ExpiresActive On

  # Imagens
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"

  # Vídeo
  ExpiresByType video/mp4 "access plus 1 month"
  ExpiresByType video/webm "access plus 1 month"

  # CSS/JS
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Diretivas para tipos MIME modernos
<IfModule mod_mime.c>
  AddType image/webp .webp
  AddType video/webm .webm
  AddType font/woff2 .woff2
</IfModule>
```

## Habilitando HTTP/2

O HTTP/2 permite carregar múltiplos arquivos em paralelo:

1. Acesse o painel de controle Plesk
2. Vá para "Domínios" > [Seu domínio]
3. Clique em "Configurações de Hospedagem"
4. Encontre a seção "Configurações avançadas" ou "Configurações do Apache e nginx"
5. Ative a opção "HTTP/2" se disponível
6. Clique em "OK" ou "Salvar"

## Configurando limites de PHP

Para permitir upload de arquivos grandes:

1. Acesse o painel de controle Plesk
2. Vá para "Domínios" > [Seu domínio] > "PHP Settings" ou "Configurações PHP"
3. Encontre e ajuste as seguintes configurações:

```
upload_max_filesize = 64M
post_max_size = 64M
memory_limit = 256M
max_execution_time = 300
```

4. Salve as alterações

## Configurando cache no Plesk

1. Acesse o painel de controle Plesk
2. Vá para "Domínios" > [Seu domínio]
3. Clique em "Configurações de Hospedagem" > "Configurações de Cache"
4. Configure o cache:
   - Ative "Cache de arquivos estáticos"
   - Defina o tempo de cache para arquivos estáticos: 2592000 segundos (30 dias)
   - Ative "Compressão Gzip" se disponível

## Monitoramento de desempenho

Após configurar o site, verifique o desempenho:

1. **Google PageSpeed Insights**:

   - Acesse [PageSpeed Insights](https://pagespeed.web.dev/)
   - Insira a URL do seu site
   - Analise as recomendações, especialmente para carregamento de mídia

2. **Lighthouse no Chrome**:

   - Abra o Chrome DevTools (F12)
   - Vá para a aba "Lighthouse"
   - Execute uma análise de desempenho
   - Observe especialmente "Largest Contentful Paint" e "Cumulative Layout Shift"

3. **Monitor de Recursos do Plesk**:
   - Verifique regularmente o uso de largura de banda
   - Configure alertas para picos de tráfego
   - Monitore espaço em disco usado pelos arquivos de mídia

## Práticas recomendadas adicionais

1. **Ferramentas de CDN**:

   - Se seu plano Plesk permitir, configure um CDN para conteúdo estático
   - O Cloudflare tem um plano gratuito que pode ser integrado facilmente

2. **Revisão Periódica**:

   - Verifique mensalmente as imagens mais acessadas
   - Otimize especialmente esses arquivos para melhor desempenho
   - Considere remover arquivos de mídia não utilizados

3. **Logs e Análise**:
   - Analise os logs do servidor para identificar problemas de carregamento
   - Use ferramentas como Google Analytics para ver tempos de carregamento reais
   - Configure alertas para respostas lentas do servidor
