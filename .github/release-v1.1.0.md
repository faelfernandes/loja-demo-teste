## LojaDemo v1.1.0 — Documentação e demonstração

Atualização do README com seção de testes e GIFs de demonstração.

### O que mudou

- **README — Testes:** Nova seção documentando a suíte de 51 testes do backend (PHPUnit), com cobertura Feature (Auth, Products, Categories) e Unit (Models e Services), e comando para rodar via Docker.
- **README — Demonstração:** Nova seção com três GIFs (tela inicial, login e carrinho) para visualização rápida do fluxo da aplicação.
- **Assets:** Inclusão dos arquivos `home.gif`, `login.gif` e `carrinho.gif` na raiz do repositório.

### Links

- **Demo frontend:** https://lojademo.rfsolucoes.com.br
- **Demo API:** https://api-lojademo.rfsolucoes.com.br

### Como rodar os testes

```bash
docker compose exec lojademo-service php artisan test
```

Consulte o [README](https://github.com/faelfernandes/loja-demo-teste/blob/main/README.md) para o restante da documentação.
