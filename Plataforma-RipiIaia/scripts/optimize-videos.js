/**
 * Script para otimização de vídeos do projeto Ripi-Iaia
 * Este script processa vídeos da pasta src/videos-original e os converte para formatos web em public/videos
 * 
 * Uso:
 * 1. Instale as dependências: npm install fluent-ffmpeg ffmpeg-static
 * 2. Coloque seus vídeos em src/videos-original
 * 3. Execute: node scripts/optimize-videos.js
 */
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// Configura o caminho do ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

// Configuração
const config = {
  inputDir: 'src/videos-original', // Pasta com vídeos originais
  outputDir: 'public/videos', // Pasta para vídeos otimizados
  thumbnailDir: 'public/videos/thumbnails', // Pasta para thumbnails dos vídeos
  
  // Configurações para MP4 (H.264)
  mp4: {
    codec: 'libx264', // Codec de vídeo
    preset: 'medium', // Preset de compressão (slow = melhor qualidade, fast = mais rápido)
    crf: 23, // Fator de qualidade constante (18-28, menor = melhor qualidade)
    audioBitrate: '128k', // Bitrate do áudio
    audioCodec: 'aac', // Codec de áudio
  },
  
  // Configurações para WebM (VP9)
  webm: {
    codec: 'libvpx-vp9', // Codec de vídeo
    crf: 30, // Fator de qualidade constante
    bitrate: '0', // Bitrate (0 = usa CRF)
    audioBitrate: '128k', // Bitrate do áudio
    audioCodec: 'libopus', // Codec de áudio
  },
  
  // Configurações para diferentes qualidades
  qualities: {
    low: { height: 480, bitrate: '800k' },
    medium: { height: 720, bitrate: '1500k' },
    high: { height: 1080, bitrate: '3000k' }
  }
};

// Função principal
async function optimizeVideos() {
  try {
    console.log('🔍 Iniciando otimização de vídeos...');
    
    // Cria as pastas de saída se não existirem
    await fs.ensureDir(config.outputDir);
    await fs.ensureDir(config.thumbnailDir);
    
    // Lê todos os arquivos de vídeo na pasta de entrada
    const videoFiles = glob.sync(
      path.join(config.inputDir, '**/*.{mp4,mov,avi,mkv,webm,flv}'),
      { nodir: true }
    );
    
    if (videoFiles.length === 0) {
      console.log('❌ Nenhum vídeo encontrado na pasta de entrada.');
      console.log(`   Crie a pasta '${config.inputDir}' e adicione seus vídeos lá.`);
      return;
    }
    
    console.log(`🎬 Encontrados ${videoFiles.length} vídeos para processar.`);
    
    // Processa cada vídeo
    for (const filePath of videoFiles) {
      await processVideo(filePath);
    }
    
    console.log('✅ Otimização de vídeos concluída com sucesso!');
    console.log(`📁 Vídeos salvos em: ${config.outputDir}`);
    
  } catch (error) {
    console.error('❌ Erro durante a otimização de vídeos:', error);
  }
}

// Função para processar cada vídeo
async function processVideo(filePath) {
  return new Promise((resolve, reject) => {
    try {
      const fileName = path.basename(filePath);
      const fileNameWithoutExt = path.parse(fileName).name;
      let relativePath = path.dirname(filePath).replace(config.inputDir, '');
      
      if (relativePath.startsWith('/')) {
        relativePath = relativePath.slice(1);
      }
      
      const outputFolder = path.join(config.outputDir, relativePath);
      fs.ensureDirSync(outputFolder);
      
      console.log(`🔄 Processando: ${fileName}`);
      
      // Obtém informações do vídeo
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          console.error(`  ❌ Erro ao analisar o vídeo: ${err.message}`);
          return reject(err);
        }
        
        const { width, height } = metadata.streams[0];
        const aspectRatio = width / height;
        
        let processedCount = 0;
        let totalTasks = Object.keys(config.qualities).length * 2; // MP4 e WebM para cada qualidade
        
        // Gera uma thumbnail para o vídeo
        ffmpeg(filePath)
          .screenshots({
            timestamps: ['25%'],
            filename: `${fileNameWithoutExt}.jpg`,
            folder: config.thumbnailDir,
            size: '1280x720'
          })
          .on('end', () => {
            console.log(`  ✓ Thumbnail gerada com sucesso`);
          })
          .on('error', (err) => {
            console.error(`  ❌ Erro ao gerar thumbnail: ${err.message}`);
          });
        
        // Converte para cada qualidade
        for (const [qualityName, quality] of Object.entries(config.qualities)) {
          // Calcula largura proporcional à altura
          const newHeight = Math.min(quality.height, height);
          const newWidth = Math.round(newHeight * aspectRatio);
          
          // Converte para MP4
          ffmpeg(filePath)
            .videoCodec(config.mp4.codec)
            .addOption('-preset', config.mp4.preset)
            .addOption('-crf', config.mp4.crf)
            .addOption('-movflags', '+faststart') // Para streaming otimizado
            .audioCodec(config.mp4.audioCodec)
            .audioBitrate(config.mp4.audioBitrate)
            .size(`${newWidth}x${newHeight}`)
            .output(path.join(outputFolder, `${fileNameWithoutExt}-${qualityName}.mp4`))
            .on('end', () => {
              console.log(`  ✓ MP4 (${qualityName}) processado com sucesso`);
              processedCount++;
              if (processedCount === totalTasks) {
                resolve(true);
              }
            })
            .on('error', (err) => {
              console.error(`  ❌ Erro ao converter para MP4 (${qualityName}): ${err.message}`);
              processedCount++;
              if (processedCount === totalTasks) {
                resolve(false);
              }
            })
            .on('progress', (progress) => {
              if (progress.percent) {
                process.stdout.write(`  🔄 MP4 (${qualityName}): ${Math.round(progress.percent)}%\r`);
              }
            })
            .run();
            
          // Converte para WebM (se não for muito grande para economizar espaço)
          if (qualityName !== 'high') {
            ffmpeg(filePath)
              .videoCodec(config.webm.codec)
              .addOption('-crf', config.webm.crf)
              .addOption('-b:v', config.webm.bitrate)
              .audioCodec(config.webm.audioCodec)
              .audioBitrate(config.webm.audioBitrate)
              .size(`${newWidth}x${newHeight}`)
              .output(path.join(outputFolder, `${fileNameWithoutExt}-${qualityName}.webm`))
              .on('end', () => {
                console.log(`  ✓ WebM (${qualityName}) processado com sucesso`);
                processedCount++;
                if (processedCount === totalTasks) {
                  resolve(true);
                }
              })
              .on('error', (err) => {
                console.error(`  ❌ Erro ao converter para WebM (${qualityName}): ${err.message}`);
                processedCount++;
                if (processedCount === totalTasks) {
                  resolve(false);
                }
              })
              .on('progress', (progress) => {
                if (progress.percent) {
                  process.stdout.write(`  🔄 WebM (${qualityName}): ${Math.round(progress.percent)}%\r`);
                }
              })
              .run();
          } else {
            // Pula WebM para alta qualidade para economizar espaço
            processedCount++;
            if (processedCount === totalTasks) {
              resolve(true);
            }
          }
        }
      });
    } catch (error) {
      console.error(`  ❌ Erro ao processar ${filePath}:`, error.message);
      reject(error);
    }
  });
}

// Executa o script
optimizeVideos();
