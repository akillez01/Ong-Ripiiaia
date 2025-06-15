# Monorepo: Plataforma-RipiIaia + Ripi-Iaia

Este repositório contém dois projetos React integrados:

- **Plataforma-RipiIaia**: Plataforma principal, com diversas funcionalidades e integração de portais.
- **Ripi-Iaia**: Portal de musicalidade e mídias do Santo Daime, integrado como uma aba/rota dentro da plataforma.

## Estrutura

```
Ong-Ripiiaia/
├── Plataforma-RipiIaia/   # Plataforma principal
├── Ripi-Iaia/             # Projeto Ripi-Iaia
├── build-tudo.sh          # Script para buildar e integrar tudo
├── integrar-ripiiaia.sh   # Script para buildar e integrar só o Ripi-Iaia
```

## Como rodar localmente

Abra dois terminais:

1. Plataforma:
   ```bash
   cd Plataforma-RipiIaia
   npm install
   npm run dev
   ```
2. Ripi-Iaia:
   ```bash
   cd Ripi-Iaia
   npm install
   npm run dev
   ```

Acesse:

- Plataforma: [http://localhost:8080](http://localhost:8080)
- Ripi-Iaia: [http://localhost:5173/Ripi-Iaia/](http://localhost:5173/Ripi-Iaia/)

A aba "/ripi-iaia" da plataforma carrega o projeto Ripi-Iaia via iframe.

## Como buildar para produção

Execute na raiz do monorepo:

```bash
bash build-tudo.sh
```

O build final estará em `Plataforma-RipiIaia/dist`, com o Ripi-Iaia integrado em `/Ripi-Iaia/`.

## Deploy

Basta subir o conteúdo de `Plataforma-RipiIaia/dist` para o seu servidor web.

- `/` abre a plataforma
- `/ripi-iaia` abre o portal Ripi-Iaia integrado

## CI/CD com GitHub Actions

O workflow sugerido faz:

- Instalação das dependências
- Build dos dois projetos
- Integração do build do Ripi-Iaia na plataforma
- (Opcional) Deploy para FTP, S3, etc

Veja o exemplo em `.github/workflows/build.yml`.

---

# Plataforma Ripi ia iá - Documentação de Migração e Estrutura de Banco de Dados

## Migração do Supabase (PostgreSQL) para MariaDB/MySQL

### 1. Conversão do Dump

- O dump do Supabase foi exportado em formato PostgreSQL (`meu_dump_supabase.sql`).
- Utilizamos o SQLines para converter o dump para o formato MySQL/MariaDB:
  ```bash
  ./sqlines -s=postgresql -t=mysql -in=../meu_dump_supabase.sql -out=../dump_mysql.sql
  ```
- O arquivo convertido foi revisado e limpo manualmente, removendo comandos incompatíveis e mantendo apenas as tabelas necessárias.

### 2. Estrutura das Tabelas no MariaDB/MySQL

- As tabelas principais do projeto são:

  - `users`
  - `categories`
  - `videos`
  - `media_items`
  - `products`
  - `orders`
  - `order_items`
  - `posts`
  - `audios`
  - `hymns`
  - `books`

- Os tipos de dados foram ajustados:

  - `uuid` → `CHAR(36)`
  - `text` → `VARCHAR(255)` ou `TEXT`
  - `timestamptz` → `DATETIME`
  - `boolean` → `TINYINT(1)`

- Exemplo de schema final (arquivo `dump_mysql.sql`):

```sql
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  password VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE videos (
  id CHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  url VARCHAR(255) NOT NULL,
  thumbnail_url VARCHAR(255),
  category_id CHAR(36),
  is_published TINYINT(1) DEFAULT 0,
  view_count INT DEFAULT 0,
  created_by CHAR(36),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE media_items (
  id CHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  url VARCHAR(255) NOT NULL,
  thumbnail_url VARCHAR(255),
  category_id CHAR(36),
  is_published TINYINT(1) DEFAULT 0,
  download_count INT DEFAULT 0,
  created_by CHAR(36),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE products (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(255),
  category_id CHAR(36),
  stock_quantity INT DEFAULT 0,
  is_available TINYINT(1) DEFAULT 1,
  created_by CHAR(36),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE orders (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36),
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  id CHAR(36) PRIMARY KEY,
  order_id CHAR(36),
  product_id CHAR(36),
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hymns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  author VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Importação no MariaDB

- Importe o arquivo `dump_mysql.sql` pelo phpMyAdmin ou MySQL Workbench.
- Caso precise inserir dados, utilize comandos `INSERT INTO ...` compatíveis com o novo schema.

### 4. Observações

- Comandos, funções, triggers, policies e extensões do PostgreSQL foram removidos.
- O banco está pronto para uso com backend Node.js e aplicações web.

---

**Dúvidas?**
Abra uma issue ou entre em contato!

######
