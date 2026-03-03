## LojaDemo — E-commerce fullstack

Primeiro release do catálogo de e-commerce com autenticação.

### O que tem neste release

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS + Zustand
- **Backend:** Laravel 12 + Sanctum + MySQL 8
- **Funcionalidades:** listagem de produtos (paginação, filtro por categoria, busca), carrinho persistente, registro/login, alteração de senha, indicador de força de senha, CRUD de produtos e categorias (autenticado)
- **Infra:** Docker Compose (dev e produção com Traefik/SSL)

### Links

- **Demo frontend:** https://lojademo.rfsolucoes.com.br
- **Demo API:** https://api-lojademo.rfsolucoes.com.br

### Como rodar localmente

```bash
git clone https://github.com/faelfernandes/loja-demo-teste.git
cd loja-demo-teste
cp .env.example .env
cp projects/lojademo-service/.env.example projects/lojademo-service/.env
cp projects/lojademo-react/.env.example projects/lojademo-react/.env
docker compose up --build
```

**Acesso:** Frontend http://localhost:3000 | API http://localhost:8081

Consulte o [README](https://github.com/faelfernandes/loja-demo-teste/blob/main/README.md) para variáveis de ambiente e primeiros passos (migrations, seeders, `APP_KEY`).
