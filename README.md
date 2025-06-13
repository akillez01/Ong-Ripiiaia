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

**Dúvidas?**
Abra uma issue ou entre em contato!

######
