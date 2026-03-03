<p align="center">
  <img src="logo.png" alt="LojaDemo" width="120" />
</p>

# LojaDemo

Catálogo de e-commerce com autenticação: listagem de produtos, filtro por categoria, busca e detalhes de produto. Backend em Laravel, frontend em React, banco MySQL e ambiente containerizado com Docker.

---

## Stack

| Camada      | Tecnologia |
|------------|------------|
| Backend    | Laravel 12, PHP 8.4, Laravel Sanctum |
| Frontend   | React 19, TypeScript, Vite 6, Tailwind CSS, Zustand, React Router |
| Banco      | MySQL 8.0 |
| Infra      | Docker, Docker Compose |

A API segue os padrões **Service** e **Repository** e utiliza **API Resources** para respostas padronizadas.

---

## Estrutura do repositório

```
lojademo/
├── docker-compose.yaml         # Orquestração dos serviços
├── .env.example                # Variáveis do MySQL (raiz)
└── projects/
    ├── lojademo-service/       # API Laravel
    │   ├── app/
    │   │   ├── Http/Controllers/Api/
    │   │   ├── Http/Resources/  # Response collection
    │   │   ├── Repositories/
    │   │   └── Services/
    │   └── database/migrations/
    └── lojademo-react/         # SPA React
        └── src/
            ├── components/
            ├── pages/
            ├── services/
            └── store/
```

---

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)

---

## Execução com Docker

### 1. Variáveis de ambiente

Na raiz do projeto, crie um `.env` (ou use os valores padrão do `.env.example`):

```bash
cp .env.example .env
```

Variáveis utilizadas pelo `docker-compose`:

| Variável        | Descrição           | Padrão        |
|-----------------|---------------------|---------------|
| `MYSQL_ROOT_PASSWORD` | Senha root do MySQL | `rootpassword` |
| `DB_DATABASE`   | Nome do banco       | `lojademo_db`  |
| `DB_USERNAME`   | Usuário do app      | `lojademo_user` |
| `DB_PASSWORD`   | Senha do usuário    | `lojademo_pass` |

### 2. Subir os serviços

```bash
docker compose up -d
```

Isso sobe:

- **MySQL** na porta `3306` (com healthcheck)
- **lojademo-service** (Laravel) na porta `8081`
- **lojademo-react** (Vite) na porta `3000`

### 3. Configurar o backend (primeira vez)

Garanta que exista `projects/lojademo-service/.env` (copie de `.env.example`). Depois suba os containers e rode:

```bash
docker compose up -d
docker compose exec lojademo-service php artisan key:generate
docker compose exec lojademo-service php artisan migrate --force
docker compose exec lojademo-service php artisan db:seed --force
```

> [!NOTE]
> O `docker-compose` sobrescreve `DB_HOST`, `DB_DATABASE`, `DB_USERNAME` e `DB_PASSWORD` no container; o restante vem do `.env` do serviço. O `key:generate` persiste no `.env` do host via volume.

### 4. Acessar a aplicação

- **Frontend:** http://localhost:3000  
- **API:** http://localhost:8081  

O frontend espera a API em `http://localhost:8081/api`. Em `projects/lojademo-react` configure `VITE_API_BASE_URL` (ou `.env`) se usar outra URL.

---

## Variáveis do frontend (React)

Em `projects/lojademo-react`:

| Variável              | Descrição                    | Exemplo                    |
|-----------------------|-----------------------------|----------------------------|
| `VITE_APP_NAME`       | Nome exibido na aplicação   | `LojaDemo`                 |
| `VITE_API_BASE_URL`   | Base URL da API             | `http://localhost:8081/api` |

---

## API – Endpoints

### Públicos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/login` | Login (retorna token Sanctum) |
| `POST` | `/api/register` | Registro de usuário |
| `GET`  | `/api/products` | Listar produtos (paginação, `?category={id}`, `?search={query}`) |
| `GET`  | `/api/products/{id}` | Detalhes do produto |
| `GET`  | `/api/categories` | Listar categorias |

### Protegidos (auth:sanctum)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/logout` | Encerrar sessão |
| `PUT`  | `/api/user/password` | Alterar senha |
| `POST` | `/api/products` | Criar produto |
| `PUT`  | `/api/products/{id}` | Atualizar produto |
| `DELETE` | `/api/products/{id}` | Remover produto |
| `POST` | `/api/categories` | Criar categoria |
| `PUT`  | `/api/categories/{id}` | Atualizar categoria |
| `DELETE` | `/api/categories/{id}` | Remover categoria |

Requisições protegidas devem enviar o header: `Authorization: Bearer {token}`.

---

## Banco de dados

- **Produtos:** `id`, `name`, `description`, `price`, `category_id`, `image_url`, `created_at`, `updated_at`
- **Categorias:** `id`, `name`, `created_at`, `updated_at`
- **Usuários:** `id`, `name`, `email`, `password`, `created_at`, `updated_at`

Cadastro de usuário exige e-mail único e senha forte; autenticação é por token (Laravel Sanctum).

---

## Comandos úteis

```bash
# Logs do backend
docker compose logs -f lojademo-service

# Logs do frontend
docker compose logs -f lojademo-react

# Parar todos os serviços
docker compose down

# Parar e remover volumes (apaga dados do MySQL)
docker compose down -v
```

---

Este projeto foi desenvolvido como catálogo de e-commerce com autenticação, seguindo os requisitos de backend (Laravel + MySQL + Sanctum), frontend (React + UI), padrões Service/Repository, response collection e Docker descritos no escopo.
