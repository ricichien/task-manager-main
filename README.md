# Task-Manager

Aplicacao focada em criacao de usuarios e gerencimanto de tarefas com autenticacao JWT, integracao com Banco de Dados usando pgAdmin. O aplicativo permite que usuários façam login com credenciais previamente registradas para criar e gerenciar suas próprias tarefas. Após o login, é possível adicionar, atualizar ou remover workspaces e tarefas. Os dados são armazenados em um banco de dados PostgreSQL. O perfil do usuário também pode ser atualizado.

![Captura de tela 2025-05-22 155004](https://github.com/user-attachments/assets/6f9989a2-599d-4e9e-b127-e42a181a98ba)

Vídeo demonstrativo: https://youtu.be/FKS8Zi0oNE4

---

## Imagens do projeto

![image](https://github.com/user-attachments/assets/97e26e7d-aae4-45d1-ae26-b3bdb7f9e4de)

## Funcionalidades

### Gerenciamento de Tarefas e Perfil

- Usuários podem criar, visualizar, atualizar e excluir tarefas
- Edição de perfil do usuário e suas respectivas tarefas

### Autenticação e Controle de Acesso

- bcryptjs para hash seguro de senhas
- Sistema completo de cadastro, login e logout de usuários
- Acesso às tarefas restrito a usuários autenticados
- Sessões seguras com JWT (JSON Web Tokens)
- Rotas protetivas (Public e Private (Private precisa de Login))

## Backend

- Persistência de dados usando PostgreSQL
- Acesso ao banco via Prisma ORM, com tipagem automática e migrações
- API construída com Nest.js

## Frontend

- Interface desenvolvida com React.js
- Estilização moderna com Material UI
- Formulários reativos com React Hook Form + Zod para validação robusta
- Feedback ao usuário via toasts
- Consumo e cache de dados com TanStack Query (React Query)

### Experiência do Usuário

- Design responsivo
- Aplicação estruturada como monorepo usando Turborepo

---

## Imagens da Aplicação

## Estrutura da Aplicação

A aplicação é dividida em duas partes:

- **Backend**:
- **Frontend**:

---

### Tecnologias utilizadas

## Backend

- Prisma
- NestJS
- Jest
- JWT + Passport

## Frontend

- React
- React Hook Form + Zod
- Vite
- jwt-decode
- Material UI

### Estrutura, Instalação e Execução

> **Observação**: O projeto está estruturado em duas partes:
>
> - A pasta **`backend/`** contém a aplicação backend, utilizando o **PostgreSQL / pgAdmin** como banco de dados. O .env do backend deve ser configurado da seguinte maneira:

```bash
PORT=4000
DATABASE_URL=
DIRECT_URL=
JWT_SECRET=
REFRESH_JWT_SECRET=
```

> - A pasta **`frontend/`** contém o frontend em **React**. O .env deve ser configurado da seguinte maneira:

```bash
VITE_BACKEND_ADDR=http://localhost:4000
VITE_API_LOGIN=${VITE_BACKEND_ADDR}/api/auth/login
VITE_API_LOGOUT=${VITE_BACKEND_ADDR}/api/auth/logout
VITE_API_REGISTER=${VITE_BACKEND_ADDR}/api/auth/register
VITE_API_JWT_REFRESH=${VITE_BACKEND_ADDR}/api/auth/refresh
VITE_API_WORKSPACES=${VITE_BACKEND_ADDR}/api/workspaces
VITE_API_BOARDS=${VITE_BACKEND_ADDR}/api/boards
VITE_API_LISTS=${VITE_BACKEND_ADDR}/api/lists
VITE_API_CARDS=${VITE_BACKEND_ADDR}/api/cards
VITE_API_USER=${VITE_BACKEND_ADDR}/api/user
```

Para executar o projeto corretamente, siga as instruções abaixo:

---

<h1>Instruções de Instalação e Execução</h1>

<p>Assumindo que você está na pasta <code>task-manager</code>, use o comando abaixo no terminal para instalar os pacotes iniciais:</p>

<pre><code>npm install
</code></pre>

<hr />

<h2>Backend (NestJS + Prisma)</h2>

<h3>1. Acesse a pasta do backend:</h3>
<pre><code>cd backend
</code></pre>

<h3>2. Instale as dependências:</h3>
<pre><code>npm install
</code></pre>

<h3>3. Configure o arquivo <code>.env</code> na raiz da pasta <code>backend/</code> com as variáveis necessárias (exemplo a seguir) (Precisa ser criado um banco de dados no pgAdmin):</h3>
<pre><code>DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta"
</code></pre>

<blockquote>
  <p>⚠️ O arquivo <code>.env</code> <strong>não está incluído</strong> no repositório por questões de segurança.<br>
  Ele é essencial para conectar ao banco de dados e gerar tokens JWT.
  Importante ter o pgAdmin instalado e configurado, usuario é seu owner e senha, a senha do seu superuser</p>
</blockquote>

<h3>4. Gere o client do Prisma e execute as migrações (se aplicável):</h3>
<pre><code>npx prisma generate
npx prisma migrate dev
</code></pre>

<h3>5. Inicie o servidor em modo de desenvolvimento:</h3>
<pre><code>npm run dev
</code></pre>

<hr />

<h2>Frontend (React + Vite)</h2>

<h3>1. Acesse a pasta do frontend:</h3>
<pre><code>cd frontend
</code></pre>

<h3>2. Instale as dependências:</h3>
<pre><code>npm install
</code></pre>

<h3>3. Inicie a aplicação:</h3>
<pre><code>npm run dev
</code></pre>

<p>A aplicação estará disponível em:</p>
<pre><code>http://localhost:5173
</code></pre>
