#!/usr/bin/env node

/**
 * Este script examina minuciosamente todos os arquivos de rota do Express
 * para identificar e corrigir problemas específicos com o path-to-regexp
 * que causam o erro "Missing parameter name"
 */

const fs = require('fs');
const path = require('path');
const util = require('util');

// Promisify fs functions
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const stat = util.promisify(fs.stat);

// Diretório raiz para buscar arquivos
const rootDir = path.join(__dirname);

// Padrões problemáticos e suas correções
const problematicPatterns = [
  {
    // URLs literais em definições de rota
    pattern: /router\.(get|post|put|delete|patch|use)\s*\(\s*['"`]https?:\/\/[^'"`]+['"`]/g,
    fix: (match) => {
      console.log('⚠️ URL literal encontrada em rota:', match);
      // Substitui a URL por '/api/endpoint'
      return match.replace(/(['"`])https?:\/\/[^'"`]+(['"`])/, "$1/api/endpoint$2");
    }
  },
  {
    // Parâmetros de rota com formato inválido
    pattern: /router\.(get|post|put|delete|patch|use)\s*\(\s*['"`][^'"`]*:\w+\[[^\]]*\][^'"`]*['"`]/g,
    fix: (match) => {
      console.log('⚠️ Parâmetro de rota com formato inválido:', match);
      // Corrige remover os colchetes
      return match.replace(/:\w+\[[^\]]*\]/, (p) => p.replace(/\[[^\]]*\]/, ''));
    }
  },
  {
    // Templates literais em strings de rota
    pattern: /router\.(get|post|put|delete|patch|use)\s*\(\s*`[^`]*`/g,
    fix: (match) => {
      console.log('⚠️ Template literal em rota:', match);
      // Substitui o template literal por uma string normal
      return match.replace(/`([^`]*)`/, "'$1'");
    }
  },
  {
    // URLs como segundo parâmetro (redirecionamentos)
    pattern: /res\.(redirect|send)\s*\(\s*['"`]https?:\/\/git\.new\/[^'"`]+['"`]\s*\)/g,
    fix: (match) => {
      console.log('⚠️ URL com git.new encontrada em redirecionamento:', match);
      // Corrige para uma URL de redirecionamento local
      return match.replace(/(['"`])https?:\/\/git\.new\/[^'"`]+(['"`])/, "$1/redirect$2");
    }
  }
];

// Função para verificar um arquivo
async function checkFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    let modified = content;
    let hasChanges = false;

    // Verifica cada padrão problemático
    problematicPatterns.forEach(({pattern, fix}) => {
      if (pattern.test(modified)) {
        console.log(`\n🔍 Problemas encontrados em ${filePath}:`);
        modified = modified.replace(pattern, (match) => {
          hasChanges = true;
          return fix(match);
        });
      }
    });

    // Se houve mudanças, salva o arquivo
    if (hasChanges) {
      console.log(`✅ Corrigindo ${filePath}`);
      await writeFile(filePath, modified);
      return true;
    }
    
    return false;
  } catch (err) {
    console.error(`❌ Erro ao processar ${filePath}:`, err);
    return false;
  }
}

// Função para verificar literalmente a presença de "git.new"
async function checkLiteralGitNew(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    if (content.includes('git.new')) {
      console.log(`\n⚠️ Encontrado 'git.new' em ${filePath}`);
      // Aqui você poderia adicionar lógica para corrigir essas ocorrências específicas
      const modified = content.replace(/git\.new\/[^'"`\s)]+/g, 'example.com/redirect');
      if (modified !== content) {
        await writeFile(filePath, modified);
        console.log(`✅ Ocorrências de git.new corrigidas em ${filePath}`);
        return true;
      }
    }
    return false;
  } catch (err) {
    console.error(`❌ Erro ao verificar git.new em ${filePath}:`, err);
    return false;
  }
}

// Função para examinar diretórios recursivamente
async function scanDirectory(dir) {
  let changesCount = 0;
  
  try {
    const entries = await readdir(dir);
    
    for (const entry of entries) {
      const entryPath = path.join(dir, entry);
      try {
        const stats = await stat(entryPath);
        
        if (stats.isDirectory()) {
          // Pula node_modules e .git
          if (entry !== 'node_modules' && entry !== '.git') {
            changesCount += await scanDirectory(entryPath);
          }
        } else if (stats.isFile() && (entry.endsWith('.js') || entry.endsWith('.ts'))) {
          // Verifica e corrige o arquivo se necessário
          const fileChanged = await checkFile(entryPath);
          const gitNewChanged = await checkLiteralGitNew(entryPath);
          if (fileChanged || gitNewChanged) {
            changesCount++;
          }
        }
      } catch (err) {
        console.error(`Erro ao processar ${entryPath}:`, err);
      }
    }
  } catch (err) {
    console.error(`Erro ao ler diretório ${dir}:`, err);
  }
  
  return changesCount;
}

// Função principal
async function main() {
  console.log('🔍 Procurando rotas problemáticas que podem causar erro "Missing parameter name"...');
  
  // Primeiro, verifica os arquivos de rota que geralmente causam problemas
  const routesDir = path.join(rootDir, 'src', 'routes');
  if (fs.existsSync(routesDir)) {
    console.log(`\n🔍 Verificando arquivos de rota em ${routesDir}`);
    const routesChanges = await scanDirectory(routesDir);
    console.log(`\n${routesChanges} arquivos de rota foram modificados.`);
  }
  
  // Depois, verifica todos os outros arquivos JS do projeto
  console.log('\n🔍 Verificando outros arquivos JavaScript...');
  const totalChanges = await scanDirectory(rootDir);
  
  if (totalChanges > 0) {
    console.log(`\n✅ Total de ${totalChanges} arquivos corrigidos.`);
    console.log('\n⚠️ As rotas foram modificadas. Por favor, reinicie o servidor e teste novamente.');
  } else {
    console.log('\n🤔 Nenhum problema típico encontrado, mas o erro persiste.');
    console.log('\nAlgumas sugestões adicionais de verificação:');
    console.log('1. Verifique quaisquer plugins ou middlewares que registram rotas dinâmicas.');
    console.log('2. Verifique se o problema está relacionado às rotas de upload de arquivos.');
    console.log('3. Considere reinstalar as dependências: rm -rf node_modules && npm install');
  }
}

// Executa o script
main().catch(err => {
  console.error('❌ Erro fatal durante a execução do script:', err);
  process.exit(1);
});
