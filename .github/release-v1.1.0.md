## LojaDemo v1.1.0 — Testes e documentação

Suíte de testes no backend, atualização do README e notas de release.

### O que mudou

- **Backend — 51 testes (PHPUnit):**
  - **Feature:** Auth (registro, login, logout, alteração de senha), Products (CRUD, listagem com filtros/busca, validações), Categories (CRUD e validações).
  - **Unit:** Models Product e Category (relacionamentos, preço promocional), ProductService e CategoryService.
  - **Factories:** CategoryFactory e ProductFactory para os testes.
- **README — Testes:** Seção documentando a suíte e o comando para rodar via Docker.
- **README — Demonstração:** Seção com GIFs (tela inicial, login, carrinho) e assets `home.gif`, `login.gif`, `carrinho.gif` na raiz do repositório.
- **Release notes:** Arquivos em `.github/release-v1.0.0.md` e `release-v1.1.0.md`.

### Links

- **Demo frontend:** https://lojademo.rfsolucoes.com.br
- **Demo API:** https://api-lojademo.rfsolucoes.com.br

### Como rodar os testes

```bash
docker compose exec lojademo-service php artisan test
```

Consulte o [README](https://github.com/faelfernandes/loja-demo-teste/blob/main/README.md) para o restante da documentação.
