# Deploy no Coolify (produção)

Este guia descreve como publicar o LojaDemo no [Coolify](https://coolify.io) usando o build pack **Docker Compose**.

---

## 1. Criar o recurso no Coolify

1. No dashboard do Coolify, abra o projeto e clique em **Create New Resource**.
2. Escolha o repositório (público ou privado com GitHub App / Deploy Key).
3. Cole a URL do repositório Git.
4. Em **Build Pack**, selecione **Docker Compose** (não Nixpacks).

---

## 2. Configurar o Build Pack

| Campo | Valor |
|-------|--------|
| **Docker Compose Location** | `docker-compose.production.yaml` |
| **Base Directory** | `/` (raiz do repositório) |
| **Branch** | `main` (ou a branch que você usa) |

Avance com **Continue**.

**Dica (Coolify):** Em **Advanced**, desative **Include Source Commit in Build** para preservar o cache do Docker entre deploys e acelerar builds.

---

## 3. Variáveis de ambiente

No Coolify, em **Environment Variables** (e **Build / Shared** se existir), defina as variáveis abaixo. As que estão no `docker-compose.production.yaml` como `${VAR}` precisam estar preenchidas.

### Obrigatórias (MySQL + Backend)

| Variável | Descrição | Exemplo (não use em produção) |
|----------|-----------|-------------------------------|
| `MYSQL_ROOT_PASSWORD` | Senha root do MySQL | `sua_senha_root_segura` |
| `DB_DATABASE` | Nome do banco | `lojademo_db` |
| `DB_USERNAME` | Usuário do app | `lojademo_user` |
| `DB_PASSWORD` | Senha do usuário do app | `sua_senha_segura` |
| `APP_KEY` | Chave da aplicação Laravel (base64, 32 chars) | Gerar com `php artisan key:generate --show` |

### Gerar `APP_KEY`

No seu ambiente local (com PHP/Laravel), na pasta do backend:

```bash
cd projects/lojademo-service
php artisan key:generate --show
```

Cole o valor em `APP_KEY` no Coolify. **Não** altere depois em produção (invalidaria tokens/sessões).

### Opcionais (já têm valor padrão no compose)

- **API (backend):** `https://api-lojademo.rfconsultoria.com.br` (domínio do serviço)
- **Front:** `https://lojademo.rfconsultoria.com.br`
- **Base URL da API no front:** `https://api-lojademo.rfconsultoria.com.br/api` (com `/api`; o front usa essa base nas requisições)
- `APP_URL`, `SANCTUM_STATEFUL_DOMAINS` e a URL da API já estão definidas no compose. Se usar outros domínios, sobrescreva no Coolify.

---

## 4. Expor os serviços (domínios)

Para o Coolify (Traefik) rotear tráfego para os containers:

1. **Backend (API)**  
   - Serviço: `lojademo-service`  
   - Porta do container: **8081**  
   - Atribua o domínio da API: `https://api-lojademo.rfconsultoria.com.br`

2. **Frontend (SPA)**  
   - Serviço: `lojademo-react`  
   - Porta do container: **3000**  
   - Atribua o domínio do front: `https://lojademo.rfconsultoria.com.br`

No Coolify isso costuma ser feito em **Settings** do recurso ou na configuração do Proxy (Traefik), associando cada domínio ao serviço e à porta correta.

---

## 5. Build arguments (frontend)

O frontend usa a URL da API em tempo de **build** (Vite). No compose já está:

- `build.args.VITE_API_BASE_URL: https://api-lojademo.rfconsultoria.com.br/api` (base completa com `/api`)

Se você usar outro domínio para a API, configure no Coolify o **Build Argument**:

- Nome: `VITE_API_BASE_URL`  
- Valor: `https://seu-dominio-api.com.br/api`

Assim o build do React já sai com a URL certa.

---

## 6. Primeiro deploy

1. Salve as variáveis e inicie o **Deploy**.
2. O **primeiro build** pode levar **5–10 minutos** (o backend compila extensões PHP). Aguarde o build dos dois serviços e o healthcheck do MySQL.
3. O backend roda `migrate` na subida; **não** roda `db:seed` (evite seed em produção).
4. Para popular dados iniciais (categorias/produtos), use uma vez no container do backend, por exemplo:

   ```bash
   docker exec -it <container_lojademo-service> php artisan db:seed --force
   ```

   (substitua pelo ID/nome real do container no servidor.)

---

## 7. Resumo dos serviços

| Serviço | Porta | Função |
|---------|--------|--------|
| `mysql` | 3306 (interno) | Banco de dados |
| `lojademo-service` | 8081 | API Laravel |
| `lojademo-react` | 3000 | SPA React (build estático servido com `serve`) |

Volumes persistentes: `mysql_data`, `service_storage` (logs e arquivos do Laravel).

---

## 8. Problemas comuns

- **Build falha com exit 255 (comando interrompido durante o build)**  
  O build do backend compila extensões PHP (pdo_mysql, mbstring, gd, zip, etc.) e pode levar **5–10 minutos** no primeiro deploy. Se o build for interrompido no meio (por exemplo ao terminar de compilar extensões), é provável **timeout de build** no Coolify. Soluções:
  - Aumentar o **timeout de build** do recurso no Coolify (se a interface permitir; em alguns casos em **Advanced** ou nas configurações do servidor).
  - Manter **Include Source Commit in Build** desativado para aproveitar cache entre deploys e evitar rebuild completo.
  - No primeiro deploy, aguardar até ~10 minutos; em máquinas lentas ou com pouca memória o build pode demorar mais.

- **"dependency failed to start: container lojademo-service is unhealthy"**  
  O backend leva um tempo para subir (migrações + cache + `artisan serve`). O healthcheck tem `start_period: 90s` para esperar. Se ainda falhar: confira os logs do container `lojademo-service` no Coolify (ou `docker logs <container_id>` no servidor). Erros comuns: `APP_KEY` ausente, falha de conexão com MySQL, ou permissão em `storage`. Corrija as variáveis ou permissões e faça redeploy.

- **"No Available Server" ou healthcheck falhando**  
  Verifique se o container do backend está saudável (por exemplo `docker ps` no servidor). O healthcheck usa `GET /up` (rota padrão do Laravel); se não responder 200, o Coolify marca o serviço como indisponível.

- **Front não carrega ou chama API errada**  
  Confirme que o **build** do frontend foi feito com o `VITE_API_BASE_URL` correto (Build Args no Coolify ou valor no compose). Redeploy após alterar.

- **Erro 500 ou “APP_KEY invalid”**  
  Garanta que `APP_KEY` está definido no Coolify e que não foi trocado depois do primeiro deploy (senão tokens/sessões quebram).

- **CORS / Sanctum**  
  Os domínios do front e da API já estão em `SANCTUM_STATEFUL_DOMAINS` no compose. Se usar outros domínios, atualize essa variável e o `APP_URL` no Coolify.

---

## 9. Checklist antes do deploy

- [ ] Variáveis no Coolify: `MYSQL_ROOT_PASSWORD`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, `APP_KEY`
- [ ] `APP_KEY` gerado com `php artisan key:generate --show` (nunca alterar depois)
- [ ] Domínio da API atribuído ao serviço `lojademo-service`, porta **8081**
- [ ] Domínio do front atribuído ao serviço `lojademo-react`, porta **3000**
- [ ] Build do front com a base da API incluindo `/api` (build arg `VITE_API_BASE_URL`, ex.: `https://api-lojademo.rfconsultoria.com.br/api`)

---

Com isso o projeto fica pronto para deploy no Coolify em produção.
