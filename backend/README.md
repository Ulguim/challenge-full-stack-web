# EduSystem – Backend

## Sobre o Projeto

Este é o backend do sistema de gestão acadêmica EduSystem, desenvolvido em Node.js, Express e Prisma ORM. Ele fornece a API para autenticação, cadastro, listagem, edição e exclusão de alunos, além de controle de acesso por JWT.

---

## Como Rodar o Backend

### Pré-requisitos
- Node.js 18+
- Yarn ou npm
- **Banco de dados PostgreSQL** (padrão, já configurado via Docker)
- **Ou** Docker e Docker Compose (recomendado para ambiente de produção ou testes rápidos)

### Configuração de Variáveis de Ambiente
Crie um arquivo `.env` na raiz do diretório `backend` com base no arquivo `env.example`:

```
cp env.example .env
```

Edite o arquivo `.env` se necessário para ajustar a URL do banco de dados ou outras configurações. Por padrão, o sistema já está configurado para usar PostgreSQL via Docker Compose.

### Instalação e Execução (modo local)
```bash
# Acesse a pasta do backend
cd backend

# Instale as dependências
yarn install # ou npm install

# Rode as migrations do banco de dados
yarn prisma migrate dev # ou npx prisma migrate dev

# (Opcional) Popule o banco com dados de exemplo
yarn prisma db seed # ou npx prisma db seed

# Inicie o servidor
yarn dev # ou npm run dev
```
O backend estará disponível em `http://localhost:4000` (ou porta definida no .env).

---

## Rodando com Docker

### Pré-requisitos
- Docker
- Docker Compose

### Subindo os containers

```bash
# Acesse a pasta do backend
cd backend

# Suba os containers (API e banco de dados)
docker-compose up -d --build
```

### Rodando migrations e seeders dentro do container

Após subir os containers, execute:

```bash
docker exec -it api sh -c "npx prisma migrate deploy && npm run seed"
```

- O backend estará disponível em `http://localhost:4000` (ou porta definida no .env).
- O banco de dados PostgreSQL estará disponível no container `database` na porta definida pelo `.env`.

---

## Como Funciona

- **Autenticação:**
  - Login via endpoint `/auth/login`.
  - Geração de token JWT para acesso às rotas protegidas.

- **Gestão de Alunos:**
  - CRUD completo de alunos via endpoints REST.
  - Exclusão lógica (soft delete) de alunos.
  - Filtros e busca por nome/email/RA.

- **Seeders:**
  - Populam o banco com um usuário admin e alunos de exemplo.

- **Tecnologias:**
  - Node.js, Express, Prisma ORM, PostgreSQL, JWT, Jest

---

## Scripts Úteis
- `yarn dev` – Inicia o servidor em modo desenvolvimento
- `yarn prisma migrate dev` – Aplica as migrations do banco
- `yarn seed` – Popula o banco com dados de exemplo
- `yarn test` – Executa a suíte de testes automatizados com Jest

---

## Observações
- O sistema utiliza autenticação JWT.
- O banco padrão é **PostgreSQL** e já está configurado para uso via Docker Compose. Se desejar usar outro banco, ajuste a variável `DATABASE_URL` no arquivo `.env`.
- Para acessar como admin, utilize o usuário criado pelo seed (ver código do seeder para credenciais).

---
