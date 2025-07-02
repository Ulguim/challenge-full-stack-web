# COMMENTS.md

## Decisão da Arquitetura Utilizada

O projeto foi estruturado seguindo o padrão de arquitetura em camadas, separando responsabilidades em módulos distintos para garantir escalabilidade, manutenibilidade e testabilidade. As principais camadas são:

- **Controller:** Responsável por receber as requisições HTTP, validar dados de entrada e repassar para a camada de serviço.
- **Service:** Contém a lógica de negócio da aplicação, executando regras antes de acessar o banco de dados.
- **Repository/ORM (Prisma):** Responsável pela persistência dos dados, utilizando o Prisma ORM para abstração do banco PostgreSQL.
- **Middlewares:** Implementam funcionalidades transversais como autenticação JWT e tratamento de erros.
- **Validações:** Utilizadas para garantir integridade dos dados antes de persistir ou processar informações.

A aplicação backend é exposta via API RESTful, seguindo boas práticas de versionamento, autenticação e tratamento de erros. O uso do Docker e Docker Compose permite fácil replicação do ambiente, incluindo banco de dados PostgreSQL e dependências.

O frontend utiliza Vue.js com Vuetify para UI, compondo uma SPA responsiva, comunicando-se com a API via HTTP.

## Lista de Bibliotecas de Terceiros Utilizadas

- **Backend:**
  - Express (roteamento e servidor HTTP)
  - Prisma ORM (acesso ao banco de dados PostgreSQL)
  - JWT (autenticação)
  - Bcrypt (hash de senhas)
  - Jest (testes automatizados)
  - Supertest (testes de integração) (Não utilizado)
  - Dotenv (variáveis de ambiente)
  - Cors, Helmet (segurança)

- **Frontend:**
  - Vue.js (framework principal)
  - Vuetify (UI)
  - vueUse (useFetch, useLocalStorage)
  - Pinia (state management) (Não utilizado)
  - Vue Router (roteamento)

## O que melhoraria se tivesse mais tempo

- Implementaria testes de integração completos para todos os fluxos críticos.
- Adicionaria documentação com swagger.
- Melhoraria a cobertura de testes unitários e de integração.
- Refinaria de UX/UI no frontend.
- Implementaria deploy automatizado (CI/CD).


## Quais requisitos obrigatórios não foram entregues
- Todos os requisitos obrigatórios do desafio foram implementados.

## Diagrama das Tabelas (Banco de Dados)

```text
+-------------------+         +-------------------+         +-------------------+
|    seeders        |         |      users        |         |    students       |
+-------------------+         +-------------------+         +-------------------+
| id (PK)           |         | id (PK)           |         | id (PK)           |
| name              |         | email             |         | name              |
| created_at        |         | password          |         | email             |
| deleted_at        |         | createdAt         |         | ra (unique)       |
+-------------------+         | updatedAt         |         | cpf               |
                              | deletedAt         |         | createdAt         |
                              +-------------------+         | updatedAt         |
                                                            | deletedAt         |
                                                            +-------------------+
```

- As tabelas não possuem relacionamentos diretos (FK) entre si.
- O campo `ra` em `students` é único e serve como identificador acadêmico.


