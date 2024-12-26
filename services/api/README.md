<img src="https://i.imgur.com/h2SaP1q.png" alt="banner">

**CRUD básico para controle de tarefas do usuário.**
A API permite criar, atualizar, listar e excluir tarefas, além de verificar a saúde do sistema através de métricas.

## **Endpoints da Aplicação**
**OBS:** Todas as rotas podem ser visualizadas e testadas através do Swagger na URL: [http://localhost:3000/docs](http://localhost:3000/docs).

### **GET**

- **`/tasks`**
  - **Descrição:** Lista todas as tarefas cadastradas.
  - **Resposta:**
    - `200 OK`: `{ tasks: [ { ... } ] }`

- **`/tasks/{id}`**
  - **Descrição:** Lista uma tarefa específica pelo ID.
  - **Resposta:**
    - `200 OK`: `{ task: { ... } }`
    - `404 Not Found`: `{ message: "Tarefa não encontrada" }`

- **`/metrics/health`**
  - **Descrição:** Verifica a saúde da aplicação.
  - **Resposta:**
    - `200 OK`: `null`

### **POST**

- **`/tasks`**
  - **Descrição:** Cria uma nova tarefa.
  - **Body:**
    ```json
    {
      "title": "string required",
      "description": "string"
    }
    ```
  - **Resposta:**
    - `201 Created`: `{}`

### **PUT**

- **`/tasks/{id}`**
  - **Descrição:** Atualiza informações de uma tarefa.
  - **Body:**
    ```json
    {
      "title": "string",
      "description": "string"
    }
    ```
  - **Resposta:**
    - `204 No Content`: `{}`
    - `400 Bad Request`: `{ message: "Erro na requisição" }`
    - `404 Not Found`: `{ message: "Tarefa não encontrada" }`

### **PATCH**

- **`/tasks/{id}`**
  - **Descrição:** Marca uma tarefa como concluída.
  - **Resposta:**
    - `200 OK`: `{ task: { ... } }`
    - `404 Not Found`: `{ message: "Tarefa não encontrada" }`

### **DELETE**

- **`/tasks/{id}`**
  - **Descrição:** Exclui uma tarefa da base de dados.
  - **Resposta:**
    - `204 No Content`: `{}`
    - `404 Not Found`: `{ message: "Tarefa não encontrada" }`

---

## **Como Usar Localmente?**

### **1. Configuração Inicial**

Acesse o diretório do `services/api` e instale todas as dependências:

```bash
cd ./services/api && npm install
```

Prepare o arquivo `.env` com a URL do banco de dados:

```
NODE_ENV=dev
PORT=3000
DATABASE_URL="postgresql://docker:D7uli0o71H@localhost:5432/tasksdb?schema=public"
```

### **2. Build da Aplicação**
Faça o build da aplicação:

```bash
npm run build
```

### **3. Inicie o Docker Compose**
Suba os containers necessários:

```bash
docker compose up -d
```

### **4. Aplique as Migrations**
Crie as tabelas no banco de dados:

```bash
npx prisma migrate dev
```

### **5. Teste a API**
Acesse os seguintes endpoints pelo navegador ou ferramenta de testes:

- **Swagger UI:** [http://localhost:3000/docs](http://localhost:3000/docs)
- **Lista de Tarefas:** [http://localhost:3000/tasks](http://localhost:3000/tasks)

---

## **Licença**

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](../../LICENSE) para mais detalhes.
