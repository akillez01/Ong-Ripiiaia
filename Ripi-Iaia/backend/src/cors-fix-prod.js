// Arquivo para corrigir o CORS no servidor de produção
// Salve como cors-fix-prod.js na pasta backend/src

/**
 * Configura o CORS para ambiente de produção com domínios específicos
 * Importar e usar este arquivo no início do index.js para produção
 */
const configureCorsForProduction = (app) => {
  console.log('🔒 Configurando CORS para ambiente de produção');
  
  // Lista de domínios permitidos
  const allowedOrigins = [
    'https://ripiiaia.org',
    'https://www.ripiiaia.org',
    'https://dreamy-carson.66-179-92-233.plesk.page', // Seu URL temporário do Plesk
    'https://api.ripiiaia.org',                        // API própria
    'http://dreamy-carson.66-179-92-233.plesk.page',   // Versão HTTP do subdomínio
    // Adicione outros domínios conforme necessário
  ];

  // Middleware para verificar a origem e configurar cabeçalhos CORS
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // Registrar todas as requisições para debug
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Origem: ${origin || 'desconhecida'}`);
    
    // Permitir origens específicas ou qualquer uma em desenvolvimento
    if (origin && (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production')) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Expires');
      res.header('Access-Control-Expose-Headers', 'Content-Length, X-Timestamp, Content-Type');
      res.header('Access-Control-Allow-Credentials', 'true');
      
      // Para requisições OPTIONS (preflight)
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
    } else if (process.env.NODE_ENV === 'production') {
      console.warn(`⚠️ Requisição bloqueada de origem não permitida: ${origin || 'desconhecida'}`);
    }
    
    next();
  });
  
  // Rota para teste de CORS
  app.options('/api/test-cors', (req, res) => {
    res.status(200).end();
  });
  
  app.get('/api/test-cors', (req, res) => {
    res.json({ 
      success: true, 
      cors_status: 'enabled',
      client_origin: req.headers.origin || 'unknown',
      environment: process.env.NODE_ENV || 'development',
      allowed_origins: allowedOrigins
    });
  });
};

module.exports = configureCorsForProduction;
