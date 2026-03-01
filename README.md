# Lojademo – Catálogo de E-commerce

Catálogo de produtos com autenticação: **Laravel** (API REST), **React** (frontend) e **MySQL**, orquestrado com **Docker**.

## Requisitos

- Docker e Docker Compose
- (Opcional) Make

## Como rodar

### 1. Variáveis de ambiente

Na raiz do projeto, crie um `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Ajuste senhas e nomes do banco se quiser (valores padrão já funcionam para desenvolvimento).

### 2. Subir os containers

```bash
docker compose up --build
```

Ou, com Make:

```bash
make up
```

Na primeira execução o backend irá:

- Instalar dependências (Composer)
- Gerar `APP_KEY`
- Rodar migrations
- Rodar seeders (categorias e produtos)

### 3. Acessar

| Serviço        | URL                    |
|----------------|------------------------|
| **Frontend**   | http://localhost:3000  |
| **API Laravel**| http://localhost:8000  |

### Endpoints da API

- **Produtos:** `GET /api/products` (paginação, `?category={id}`, `?search={query}`), `GET /api/products/{id}`
- **Categorias:** `GET /api/categories`
- **Auth:** `POST /api/login`, `POST /api/register`; endpoints de criação/edição/exclusão protegidos com `auth:sanctum`

## Comandos úteis (Make)

- `make up` – sobe os containers
- `make upd` – sobe em background
- `make down` – para e remove containers
- `make migrate` – roda migrations no backend
- `make seed` – roda seeders
- `make test` – testes do Laravel

## Estrutura

- `projects/lojademo-service` – API Laravel (Service + Repository, Sanctum, response collection)
- `projects/lojademo-react` – frontend React (listagem, filtros, busca, auth)
- `infra/` – configuração MySQL (init opcional)
- `docker-compose.yml` – orquestração (MySQL, backend, frontend)
