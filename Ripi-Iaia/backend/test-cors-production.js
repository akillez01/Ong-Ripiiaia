/**
 * Script para testar a configuração de CORS em produção
 * Salve este arquivo como test-cors-production.js
 * Execute com: node test-cors-production.js
 * 
 * Este script testará a configuração de CORS entre seu frontend e backend
 */

const fetch = require('node-fetch');

// URLs para testar
const FRONTEND_URL = 'https://dreamy-carson.66-179-92-233.plesk.page';
const BACKEND_URL = 'https://api.ripiiaia.org';
const TEST_ENDPOINT = '/api/test-cors';

async function testCors() {
  console.log('🧪 Iniciando teste de CORS para produção');
  console.log(`Frontend: ${FRONTEND_URL}`);
  console.log(`Backend: ${BACKEND_URL}`);
  console.log('----------------------------------------');
  
  try {
    // Testando com Origin do frontend
    const response = await fetch(`${BACKEND_URL}${TEST_ENDPOINT}`, {
      method: 'GET',
      headers: {
        'Origin': FRONTEND_URL,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Resposta do servidor recebida:');
      console.log(JSON.stringify(data, null, 2));
      
      // Verificar se o cabeçalho CORS está presente
      const corsHeader = response.headers.get('access-control-allow-origin');
      console.log(`\n🔍 Cabeçalho Access-Control-Allow-Origin: ${corsHeader || 'NÃO ENCONTRADO'}`);
      
      if (corsHeader) {
        if (corsHeader === FRONTEND_URL || corsHeader === '*') {
          console.log('✅ Configuração de CORS parece correta!');
        } else {
          console.log('⚠️ Cabeçalho CORS presente, mas não corresponde à origem esperada.');
          console.log(`   Esperado: ${FRONTEND_URL} ou *`);
          console.log(`   Recebido: ${corsHeader}`);
        }
      } else {
        console.log('❌ Cabeçalho CORS ausente - isso causará problemas de CORS no navegador!');
      }
    } else {
      console.log(`❌ Erro na requisição: ${response.status} ${response.statusText}`);
    }
    
    // Tentando OPTIONS preflight
    console.log('\n🧪 Testando requisição OPTIONS (preflight)...');
    const optionsResponse = await fetch(`${BACKEND_URL}${TEST_ENDPOINT}`, {
      method: 'OPTIONS',
      headers: {
        'Origin': FRONTEND_URL,
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type,Authorization'
      }
    });
    
    console.log(`Status da resposta OPTIONS: ${optionsResponse.status} ${optionsResponse.statusText}`);
    console.log('Cabeçalhos da resposta OPTIONS:');
    optionsResponse.headers.forEach((value, name) => {
      console.log(`${name}: ${value}`);
    });
    
  } catch (error) {
    console.error('❌ Erro ao conectar com o servidor:', error.message);
  }
}

testCors();
