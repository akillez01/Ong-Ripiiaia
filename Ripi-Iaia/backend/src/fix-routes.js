/**
 * Este script verifica e conserta rotas potencialmente problemáticas
 * no servidor Express, especialmente aquelas que causam erros
 * de "Missing parameter name" no path-to-regexp.
 */

const fs = require('fs');
const path = require('path');

// Diretório onde estão os arquivos de rotas
const routesDir = path.join(__dirname, 'routes');

console.log('🔍 Verificando rotas em:', routesDir);

// Lista todos os arquivos no diretório de rotas
fs.readdir(routesDir, (err, files) => {
  if (err) {
    console.error('❌ Erro ao ler diretório de rotas:', err);
    return;
  }

  // Filtra apenas arquivos JavaScript
  const routeFiles = files.filter(file => file.endsWith('.js'));
  console.log(`📄 Encontrados ${routeFiles.length} arquivos de rotas`);

  // Processa cada arquivo
  let hasProblems = false;
  
  routeFiles.forEach(file => {
    const filePath = path.join(routesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Procura padrões problemáticos nas rotas
    const problematicPatterns = [
      { pattern: /router\.\w+\(['"]https?:\/\/[^'"]+['"]/g, 
        message: 'URL completa como caminho de rota' },
      { pattern: /router\.\w+\(['"]\/:?:?[\w]+[\[\]]/g,
        message: 'Caracteres inválidos em parâmetros de rota' },
      { pattern: /router\.\w+\(['"][^'"]*{[^}]*}[^'"]*['"]/g, 
        message: 'Caracteres de template literal em string de rota' }
    ];
    
    let fileHasProblems = false;
    problematicPatterns.forEach(({pattern, message}) => {
      const matches = content.match(pattern);
      if (matches && matches.length > 0) {
        if (!fileHasProblems) {
          console.log(`\n❗ Problemas encontrados em ${file}:`);
          fileHasProblems = true;
          hasProblems = true;
        }
        
        matches.forEach(match => {
          console.log(`  - ${message}: ${match}`);
        });
      }
    });
  });
  
  if (!hasProblems) {
    console.log('✅ Nenhum problema encontrado nas rotas!');
  } else {
    console.log('\n🔧 Sugestões de correção:');
    console.log('1. Nunca use URLs completas como caminhos de rota (ex: "https://exemplo.com")');
    console.log('2. Evite caracteres especiais em nomes de parâmetros de rota');
    console.log('3. Certifique-se de que as variáveis de ambiente estão configuradas corretamente');
    console.log('4. Não use template literals (`${var}`) como strings de rota');
  }
});
