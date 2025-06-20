# Solucionando Problemas de CORS e path-to-regexp no Backend Ripi Iaiá

Este documento explica como resolver problemas comuns encontrados no backend da aplicação Ripi Iaiá, especialmente relacionados a CORS e erro "Missing parameter name" do path-to-regexp.

## Problema: Erro "Missing parameter name"

### Descrição

```
TypeError: Missing parameter name at 1: https://git.new/pathToRegexpError
```

Este erro ocorre quando o `path-to-regexp` (usado pelo Express) encontra um formato inválido em uma rota.

### Solução

1. **Execute o script de verificação de rotas**:

```bash
cd backend
node src/fix-routes.js
```

2. **Corrija manualmente qualquer rota problemática identificada**:
   - Não use URLs completas como caminhos de rota
   - Não use caracteres especiais em parâmetros de rota
   - Não use template literals em strings de rota

## Problema: Erro de CORS

### Descrição

```
Requisição cross-origin bloqueada: A diretiva Same Origin (mesma origem) não permite a leitura do recurso remoto em http://localhost:5000/api/posts (motivo: falha na requisição CORS).
```

### Solução

1. **Inicie o servidor com CORS configurado corretamente**:

```bash
cd backend
chmod +x start-safe.sh
./start-safe.sh
```

2. **Ou edite manualmente a configuração CORS no arquivo `src/index.js`**:

```javascript
app.use(
  cors({
    origin: true, // Permite todas as origens em desenvolvimento
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
```

3. **Certifique-se que o servidor está ouvindo em todos os IPs**:
   - Alteramos `app.listen(PORT, 'localhost', ...)` para `app.listen(PORT, ...)`.

## Problema: Diretório de uploads não existe

### Solução

```bash
mkdir -p backend/public/uploads
mkdir -p backend/public/uploads/videos
mkdir -p backend/public/uploads/pdfs
```

## Configuração do Arquivo `.env`

Certifique-se de ter um arquivo `.env` na pasta `backend` com as seguintes configurações:

```
# Configurações do Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=ripiiaia_db

# Configuração do Servidor
PORT=5000

# JWT para autenticação
JWT_SECRET=sua_chave_jwt_secreta_aqui

# Configuração de uploads
UPLOAD_DIR=./uploads

# Ambiente
NODE_ENV=development
```

## Teste de Conexão

Após iniciar o servidor, verifique se está funcionando acessando:

```
http://localhost:5000/api/posts
```

O servidor deve responder com um array JSON (possivelmente vazio se não houver posts).
