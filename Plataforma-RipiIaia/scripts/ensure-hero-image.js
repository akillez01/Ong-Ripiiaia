/**
 * Script para garantir que a imagem de fundo do hero está disponível
 * Este script simplesmente verifica se a imagem existe e a copia para o local correto
 */
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SOURCES = [
  // Lista de possíveis locais onde o arquivo pode estar
  path.join(rootDir, 'src/images-original/Frame2.jpg'),
  path.join(rootDir, 'public/images/Frame2.jpg'),
  path.join(rootDir, 'src/assets/Frame2.jpg')
];

const TARGET = path.join(rootDir, 'public/images/Frame2.jpg');

async function ensureHeroImage() {
  console.log('🔍 Verificando imagem do Hero...');
  
  // Verifica se o destino já existe
  if (fs.existsSync(TARGET)) {
    console.log('✅ Imagem do Hero já existe no local correto.');
    return;
  }
  
  // Tenta copiar de uma das fontes
  for (const source of SOURCES) {
    if (fs.existsSync(source)) {
      console.log(`🔄 Copiando imagem de ${source} para ${TARGET}`);
      
      // Certifica-se que a pasta existe
      fs.ensureDirSync(path.dirname(TARGET));
      
      // Copia o arquivo
      try {
        await fs.copy(source, TARGET);
        console.log('✅ Imagem de fundo do Hero copiada com sucesso!');
        return;
      } catch (err) {
        console.error('❌ Erro ao copiar arquivo:', err);
      }
    }
  }
  
  // Se chegou até aqui, não encontrou a imagem
  console.error('❌ ERRO: Imagem do Hero não encontrada em nenhum local conhecido.');
  console.error('Por favor, adicione manualmente a imagem Frame2.jpg em public/images/');
}

ensureHeroImage().catch(err => {
  console.error('❌ Falha no script:', err);
  process.exit(1);
});
