/**
 * Script para otimização de imagens do projeto Ripi-Iaia
 * Este script processa imagens da pasta src/images-original e as salva em diferentes
 * tamanhos e formatos em public/images
 * 
 * Uso:
 * 1. Instale as dependências: npm install sharp fs-extra glob
 * 2. Coloque suas imagens em src/images-original
 * 3. Execute: node scripts/optimize-images.js
 */
import fs from 'fs-extra';
import { glob } from 'glob';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Obter o diretório atual em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração
const config = {
  inputDir: 'src/images-original', // Pasta com imagens originais
  outputDir: 'public/images', // Pasta para imagens otimizadas
  sizes: [400, 800, 1200], // Tamanhos para imagens responsivas
  formats: ['webp', 'jpg'], // Formatos a serem gerados
  quality: {
    webp: 80, // Qualidade para WebP
    jpg: 80, // Qualidade para JPEG
    png: 80  // Qualidade para PNG
  },
  // Pastas específicas para diferentes tipos de imagens
  categorias: {
    backgrounds: {
      folder: 'backgrounds',
      sizes: [800, 1200, 1600, 1920],
      formats: ['webp', 'jpg']
    },
    thumbnails: {
      folder: 'thumbnails',
      sizes: [100, 200, 400],
      formats: ['webp', 'jpg']
    },
    icons: {
      folder: 'icons',
      sizes: [16, 32, 64, 128],
      formats: ['webp', 'png']
    }
  }
};

// Função principal
async function optimizeImages() {
  try {
    console.log('🔍 Iniciando otimização de imagens...');
    
    // Cria a pasta de saída se não existir
    await fs.ensureDir(config.outputDir);
    
    // Lê todos os arquivos de imagem na pasta de entrada
    const imageFiles = await glob(
      path.join(config.inputDir, '**/*.{jpg,jpeg,png,gif,svg}'),
      { nodir: true }
    );
    
    if (imageFiles.length === 0) {
      console.log('❌ Nenhuma imagem encontrada na pasta de entrada.');
      console.log(`   Crie a pasta '${config.inputDir}' e adicione suas imagens lá.`);
      return;
    }
    
    console.log(`🖼️  Encontradas ${imageFiles.length} imagens para processar.`);
    
    // Processa cada imagem
    for (const filePath of imageFiles) {
      await processImage(filePath);
    }
    
    console.log('✅ Otimização de imagens concluída com sucesso!');
    console.log(`📁 Imagens salvas em: ${config.outputDir}`);
    
  } catch (error) {
    console.error('❌ Erro durante a otimização de imagens:', error);
  }
}

// Função para processar cada imagem
async function processImage(filePath) {
  try {
    const fileName = path.basename(filePath);
    const fileNameWithoutExt = path.parse(fileName).name;
    let relativePath = path.dirname(filePath).replace(config.inputDir, '');
    
    if (relativePath.startsWith('/')) {
      relativePath = relativePath.slice(1);
    }
    
    // Determina a categoria da imagem com base no caminho
    let categoria = null;
    for (const [key, value] of Object.entries(config.categorias)) {
      if (relativePath.includes(key) || fileName.includes(key)) {
        categoria = value;
        break;
      }
    }
    
    // Define tamanhos e formatos com base na categoria ou usa os padrões
    const sizes = categoria?.sizes || config.sizes;
    const formats = categoria?.formats || config.formats;
    const outputFolder = categoria 
      ? path.join(config.outputDir, categoria.folder) 
      : path.join(config.outputDir, relativePath);
    
    // Cria a pasta de saída
    await fs.ensureDir(outputFolder);
    
    console.log(`🔄 Processando: ${fileName}`);
    
    // Carrega a imagem com sharp
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Processa cada tamanho e formato
    for (const size of sizes) {
      // Pula tamanhos maiores que a imagem original para evitar interpolação de baixa qualidade
      if (size > metadata.width) {
        console.log(`  ⚠️ Pulando tamanho ${size}px (maior que original: ${metadata.width}px)`);
        continue;
      }
      
      for (const format of formats) {
        const outputPath = path.join(outputFolder, `${fileNameWithoutExt}-${size}.${format}`);
        
        // Redimensiona e salva a imagem
        const resizedImage = image.clone().resize({ width: size, withoutEnlargement: true });
        
        // Aplica o formato correto
        if (format === 'webp') {
          await resizedImage.webp({
            quality: config.quality[format] || 80,
            lossless: false
          }).toFile(outputPath);
        } else if (format === 'jpg' || format === 'jpeg') {
          await resizedImage.jpeg({
            quality: config.quality[format] || 80,
            progressive: true
          }).toFile(outputPath);
        } else if (format === 'png') {
          await resizedImage.png({
            quality: config.quality[format] || 80
          }).toFile(outputPath);
        }
          
        console.log(`  ✓ ${format.toUpperCase()} ${size}px`);
      }
    }
    
    // Também salva a versão original em cada formato para casos especiais
    for (const format of formats) {
      const outputPath = path.join(outputFolder, `${fileNameWithoutExt}.${format}`);
      
      const clonedImage = image.clone();
      
      // Aplica o formato correto
      if (format === 'webp') {
        await clonedImage.webp({
          quality: config.quality[format] || 80,
          lossless: false
        }).toFile(outputPath);
      } else if (format === 'jpg' || format === 'jpeg') {
        await clonedImage.jpeg({
          quality: config.quality[format] || 80,
          progressive: true
        }).toFile(outputPath);
      } else if (format === 'png') {
        await clonedImage.png({
          quality: config.quality[format] || 80
        }).toFile(outputPath);
      }
        
      console.log(`  ✓ ${format.toUpperCase()} original`);
    }
    
    return true;
  } catch (error) {
    console.error(`  ❌ Erro ao processar ${filePath}:`, error.message);
    return false;
  }
}

// Executa o script
optimizeImages();
