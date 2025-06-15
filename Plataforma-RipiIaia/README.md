# Ripi Iaiá Nexus Platform

Plataforma digital multifacetada para cultura, inovação social e serviços profissionais, com foco em tecnologia, tradição, sustentabilidade e colaboração.

## Visão Geral

O projeto "Ripi Iaiá Nexus Platform" é uma plataforma web moderna construída com React, Vite, TailwindCSS e TypeScript. Ela reúne diferentes áreas (subdomínios) como Portal institucional, Comunidades, Comunicação (Rádio) e Serviços, promovendo integração entre tecnologia, cultura amazônica, espiritualidade e soluções profissionais.

## Funcionalidades

- **Portal**: Apresentação institucional, projetos sociais, equipe, parcerias e transparência.
- **Comunidades**: Conteúdo sobre espiritualidade, tradição, hinários e acervo histórico.
- **Comunicação**: Rádio online com programação cultural e espiritual.
- **Serviços**: Ofertas de hospedagem, domínios, desenvolvimento web e suporte técnico.
- **Valores**: Seção dedicada aos princípios e missão da plataforma.
- **Tema escuro/claro**: Alternância de tema com ThemeProvider.
- **Design responsivo**: Layout adaptado para desktop e mobile.
- **Navegação SPA**: React Router para navegação fluida entre páginas e seções.
- **Carrossel de imagens**: Destaque visual com imagens de fundo dinâmicas.

## Estrutura do Projeto

```
├── public/           # Arquivos estáticos e imagens
├── src/
│   ├── components/
│   │   ├── sections/ # Seções reutilizáveis (Header, Hero, Footer, etc)
│   │   ├── theme/    # ThemeProvider e ThemeToggle
│   │   └── ui/       # Componentes de UI (botão, badge, etc)
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Funções utilitárias
│   ├── pages/        # Páginas principais (Portal, Daime, Radio, Servicos, NotFound)
│   └── main.tsx      # Entry point
├── vite.config.ts    # Configuração do Vite
├── tailwind.config.ts# Configuração do TailwindCSS
├── package.json      # Dependências e scripts
└── README.md         # Este arquivo
```

## Instalação e Uso

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/ripiiaia-nexus-platform.git
   cd ripiiaia-nexus-platform
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Rode o projeto em modo desenvolvimento:**
   ```bash
   npm run dev
   ```
4. **Build para produção:**
   ```bash
   npm run build
   ```
   O build será gerado na pasta `dist/`.

## Deploy no GitHub Pages

- O projeto está configurado para deploy no GitHub Pages.
- O campo `base` do `vite.config.ts` já está ajustado para `/ripiiaia-nexus-platform/`.
- Para publicar, envie o conteúdo da pasta `dist/` para o branch `gh-pages` ou use uma action automatizada.

## Deploy no Plesk (Hospedagem)

Se você deseja publicar o projeto em um servidor Plesk, siga estas orientações:

### 1. Repositório remoto

- Use a URL do repositório: `https://github.com/akillez01/Plataforma-RipiIaia.git`
- Recomenda-se usar um **token de acesso pessoal** do GitHub como senha (não sua senha do GitHub).

### 2. Configuração no Plesk

- Nome do repositório: Plataforma-RipiIaia (ou outro nome exclusivo)
- Caminho do servidor: `/httpdocs` (ou o Document Root do seu domínio)
- Modo de implantação: **Automático** (recomendado)

### 3. Comandos pós-deploy (ações adicionais)

Adicione estes comandos para garantir que o build seja gerado e copiado corretamente:

```bash
npm install
npm run build
cp -r dist/* httpdocs/
```

Se o Document Root já for a pasta do projeto, apenas:

```bash
npm install
npm run build
```

### 4. Observações

- O campo `base` do `vite.config.ts` deve ser `/` para Plesk (quando o Document Root aponta para dist).
- Para deploy no GitHub Pages, o base deve ser `/Plataforma-RipiIaia/`.
- Você pode alternar o base usando a variável de ambiente `VITE_BASE_URL` no build:
  - Para Plesk: `VITE_BASE_URL=/ npm run build`
  - Para GitHub Pages: `npm run build` (já usa o base correto por padrão)

---

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Router](https://reactrouter.com/)

## Scripts Disponíveis

- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera o build de produção
- `npm run preview` — Visualiza o build localmente

## Organização das Rotas

- `/portal` — Portal institucional
- `/daime` — Comunidades (espiritualidade)
- `/radio` — Comunicação (rádio online)
- `/servicos` — Serviços profissionais
- `/sobre` — Sobre/Nossa História
- `/espacos` — Explorar Espaços (pode ser âncora ou página)
- `/valores` — Nossos Valores

## Temas e Acessibilidade

- Suporte a tema claro/escuro
- Layout responsivo
- Navegação por teclado e acessibilidade básica

## Contribuição

Pull requests são bem-vindos! Para contribuir:

1. Fork este repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha nova feature'`
4. Push para o branch: `git push origin minha-feature`
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

## Comandos Git Úteis para Este Projeto

```bash
# Verificar o status do repositório
git status

# Adicionar arquivos para commit
git add .

# Fazer commit das alterações
git commit -m "mensagem do commit"

# Enviar alterações para o repositório remoto
git push

# Trocar de branch
git checkout nome-da-branch

# Stash de arquivos não rastreados (guardar alterações temporariamente)
git stash --include-untracked

# Remover arquivos não rastreados (cuidado: apaga os arquivos)
rm package.json package-lock.json

# Deploy para o GitHub Pages usando o script do package.json
npm run deploy

# Instalar dependências do projeto
npm install

# Gerar build de produção
npm run build

# Atualizar o branch gh-pages manualmente (caso precise)
git checkout gh-pages
cp -r dist/* .
git add .
git commit -m "deploy: atualização do site"
git push origin gh-pages
```

> Dica: Use sempre `npm run deploy` para publicar no GitHub Pages, pois ele já faz o build e publica automaticamente.

---

Dúvidas ou sugestões? Abra uma issue ou entre em contato!
