# EduSystem – Frontend

## Sobre o Projeto

Este é o frontend do sistema de gestão acadêmica EduSystem, desenvolvido em Vue 3, Vite e Vuetify. Permite a visualização, cadastro, edição e exclusão de alunos, além de autenticação e controle de acesso.

---

## Como Rodar o Frontend

### Pré-requisitos
- Node.js 18+
- Yarn ou npm
- Backend rodando (consulte o README do backend para instruções)

### Configuração de Variáveis de Ambiente
Crie um arquivo `.env` na raiz do diretório `front` com o seguinte conteúdo:

```
VITE_API_BASE_URL=http://localhost:4000
```

Altere o valor conforme o endereço da sua API backend.

### Instalação e Execução
```bash
# Acesse a pasta do frontend
cd front

# Instale as dependências
yarn install # ou npm install

# Inicie o servidor de desenvolvimento
yarn dev # ou npm run dev
```
O frontend estará disponível em `http://localhost:3000`.

---

## Como Funciona

- **Autenticação:**
  - Login obrigatório para acessar as rotas protegidas.
  - Usuários administradores podem cadastrar, editar e excluir alunos.

- **Gestão de Alunos:**
  - Listagem de alunos com busca e filtros.
  - Cadastro e edição de alunos.
  - Exclusão lógica (soft delete) de alunos.
  - Indicadores de total de alunos ativos, inativos e cadastrados nas últimas 24h.

- **Tecnologias:**
  - Vue 3, Vite, Vuetify

---

## Scripts Úteis
- `yarn dev` – Inicia o frontend em modo desenvolvimento

---

## Observações
- O frontend consome a API do backend (por padrão em `http://localhost:4000`).
- Para acessar como admin, utilize o usuário criado pelo seed do backend.

