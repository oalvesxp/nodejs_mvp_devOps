# Tasks+ API
CRUD básico para controle de tarefas do usuário.

## Endpoints da Aplicação
Rotas para realizar chamadas na API:

- GET
  - /tasks
    - Descrição: Lista todos os recursos cadastradas
    - 200: Sucesso
      - Retorno: { tasks: [ { ... } ] }
  - /tasks/{id}
    - Descrição: Lista um recurso específico pelo ID
    - 200: Sucesso
      - Retorno: { task: { ... } }
    - 404: Recurso não encontrado
      - Retorno: { message: { ... } }
  - /metrics/health
    - Descrição: Health check da aplicação
    - 200: sucesso
      - Retorno: null
- POST
  - /tasks
    - Cria um novo recurso
    - Body: { "title": "string required", "description": "string" }
    - 201: Criado com sucesso
     - Retorno: { }
- PUT
  - /tasks/{id}
    - Atualiza informações de um recurso
    - Body: { "title": "string", "description": "string" }
    - 204: Sucesso sem retorno
      - Retorno: { }
    - 400: Requisição ruim
      - Retorno: { message: { ... } }
    - 404: Recurso não encontrado
      - Retorno: { message: { ... } }
- PATCH
  - /tasks/{id}
    - Descrição: Marca um recurso como concluído
    - 200: Sucesso
      - Retorno: { tasks: [ { ... } ] }
    - 404: Recurso não encontrado
      - Retorno: { message: { ... } }
- DELETE
  - /tasks/{id}
    - Descrição: Excluí um recurso da base
    - 204: Sucesso sem retorno
      - Retorno: { }
    - 404: Recurso não encontrado
      - Retorno: { message: { ... } }

## Como Usar Localmente?
Acesse o diretório do `services/api` e instale todas as dependências:
```powershell
cd ./services/api && npm install
```

Prepare o .env para apontar um URL do banco de dados:
```.env
NODE_ENV=dev
PORT=3000
DATABASE_URL="postgresql://docker:D7uli0o71H@localhost:5432/tasksdb?schema=public"
```

Faça o build da aplicação:
```powershell
npm run build
```

Inicie o docker compose:
```powershell
docker compose up -d
```

Aplique as migrations no banco de dados:
```powershell
npx prisma migrate dev
```
