<img src="https://i.imgur.com/Mj19Rqs.png" alt="banner" />

## Sobre
Aplicação desenvolvida em Vite + React para ser utilizada como Frontend da API Tasks+.</br>
O objetivo é ter uma UI simples para realizar a navegação e interação de CRUD com o sistema.

---

## Funcionalidades
- **CRUD de Tarefas**: Criação, leitura, atualização e exclusão de tarefas.


## Tecnologias Utilizadas
- **Vite**: Ferramenta de build ultrarrápida.
- **React**: Biblioteca para construção de interfaces.
- **React Router**: Navegação de páginas SPA.
- **Fetch API**: Requisições HTTP para comunicação com a API Tasks+.

## Requisitos
Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js**: 20.18.1
- **Gerenciador de pacotes**: NPM

## Como Utilizar Localmente?
**OBS:** O funcionamento do CRUD depende a API, antes de iniciar o frontend certifique-se de que a API está em execução.

1. Clone o repositório:
   ```bash
   git clone https://github.com/oalvesxp/nodejs_mvp_devOps.git
   cd nodejs_mvp_devOps/services/webapp
2. Instale as dependências da aplicação:
   ```bash
   npm install
3. Prepare o `.env`:
   ```.env
   REACT_APP_API_URL=http://localhost
4. Faça o build do orval:
   ```bash
   npm run generate:api
5. Inicie o docker compose:
   ```bash
   docker compose up -d
5. Acesse a aplicação via browser:
   ```bash
   http://localhost
