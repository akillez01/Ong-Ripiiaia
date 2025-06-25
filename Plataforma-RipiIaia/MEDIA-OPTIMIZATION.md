# Instruções para otimização de imagens e vídeos no projeto Ripi Iaiá

Este guia explica como utilizar os componentes e scripts de otimização de mídia para melhorar o desempenho do seu site no servidor Plesk.

## Estrutura de otimização

O sistema de otimização de mídia foi configurado com os seguintes componentes:

1. **Componentes React otimizados**:

   - `OptimizedImage`: Para carregar imagens com formato moderno (WebP) e fallbacks
   - `LazyVideo`: Para carregar vídeos apenas quando visíveis na tela

2. **Scripts de otimização**:

   - `optimize-images.js`: Converte imagens para múltiplos tamanhos e formatos
   - `optimize-videos.js`: Converte vídeos para formatos web otimizados

3. **Configurações do servidor**:
   - Arquivo `.htaccess` com regras de cache e compressão

## Como usar

### 1. Instalando as dependências

```bash
# Instale as dependências para otimização de imagens
npm install --save-dev sharp fs-extra glob

# Instale as dependências para otimização de vídeos
npm install --save-dev fluent-ffmpeg ffmpeg-static
```

### 2. Preparando as imagens

1. Crie as pastas necessárias:

   ```bash
   npm run create-image-dirs
   ```

2. Coloque suas imagens originais em `src/images-original`
3. Execute o script de otimização:
   ```bash
   npm run optimize-images
   ```
4. As imagens otimizadas serão geradas em `public/images` em vários tamanhos e formatos

### 3. Preparando os vídeos

1. Coloque seus vídeos originais em `src/videos-original`
2. Execute o script de otimização:
   ```bash
   npm run optimize-videos
   ```
3. Os vídeos otimizados serão gerados em `public/videos` em diferentes qualidades

### 4. Usando os componentes otimizados

#### OptimizedImage

```tsx
import { OptimizedImage } from "@/components/ui/media/OptimizedImage";

// Em seu componente:
<OptimizedImage
  src="minha-imagem.jpg"
  alt="Descrição da imagem"
  className="w-full h-auto rounded-lg"
  sizes="(max-width: 768px) 100vw, 50vw"
/>;
```

#### LazyVideo

```tsx
import { LazyVideo } from "@/components/ui/media/LazyVideo";

// Em seu componente:
<LazyVideo
  src="meu-video.mp4"
  poster="thumbnail-do-video.jpg"
  title="Meu Vídeo"
  className="rounded-lg shadow-lg"
/>;
```

## Configuração do servidor Plesk

1. **Estrutura de pastas no servidor**:

   - Mantenha as imagens otimizadas em `/public/images/`
   - Mantenha os vídeos otimizados em `/public/videos/`

2. **Arquivo .htaccess**:

   - Copie o arquivo `.htaccess` da pasta `public` para a raiz do seu domínio no Plesk
   - Ou combine com o arquivo .htaccess existente

3. **Configurações adicionais no Plesk**:
   - Ative o HTTP/2 para seu domínio
   - Configure limites adequados para upload de arquivos no PHP (se necessário)
   - Considere ativar um CDN se disponível no seu plano

## Preparação para deploy

Antes de fazer o deploy, execute:

```bash
npm run optimize-media   # Otimiza imagens e vídeos
npm run build            # Constrói o projeto
```

## Práticas recomendadas

1. **Imagens**:

   - Use o formato WebP como padrão (com fallback para JPEG/PNG)
   - Forneça múltiplas resoluções para telas diferentes
   - Use lazy loading para imagens abaixo da dobra

2. **Vídeos**:

   - Use autoplay apenas quando necessário
   - Sempre forneça uma imagem poster
   - Use preload="none" ou "metadata" para vídeos não críticos
   - Considere usar o YouTube para vídeos muito grandes

3. **Monitoramento**:
   - Teste regularmente o desempenho com o Google Lighthouse
   - Monitore o uso de largura de banda no Plesk
   - Verifique a experiência do usuário em dispositivos móveis
