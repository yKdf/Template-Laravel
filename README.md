# Site Template

Base genérica para criar sites com uma organização inspirada no Pterodactyl, sem nenhum código de gerenciamento de servidores de jogos.

## Tecnologias

- Laravel 13 e PHP 8.5
- React 18 e TypeScript
- Webpack 5
- SQLite por padrão; MySQL e Redis disponíveis pelo Docker Compose
- PHPUnit

## Primeira instalação

```bash
cp .env.example .env
composer install
php artisan key:generate
touch database/database.sqlite
php artisan migrate
npm install
npm run build
php artisan serve
```

Durante o desenvolvimento, execute `npm run watch` em outro terminal. Para usar o servidor de desenvolvimento do Webpack com hot reload, execute `npm run dev`.

> O Laravel Sail deste repositório existe somente para desenvolvimento local. Não use o `docker-compose.yml` diretamente em produção.

O `docker-compose.yml` carrega credenciais e configurações diretamente do `.env`, mas sobrescreve ambiente, debug e endereços internos apenas dentro dos containers. Antes do primeiro uso, copie `.env.example` para `.env`, instale as dependências com Composer, gere `APP_KEY` e altere `DB_PASSWORD`.

O `.env.example` mantém os valores seguros esperados para uma instalação de produção (`APP_ENV=production` e `APP_DEBUG=false`). Em desenvolvimento, o Sail executa com `APP_ENV=local`, `APP_DEBUG=true` e publica a aplicação em `http://localhost`.

```bash
composer install
cp .env.example .env
php artisan key:generate
./vendor/bin/sail up -d
./vendor/bin/sail npm install
./vendor/bin/sail npm run watch
```

O site fica em `http://localhost`, o Webpack Dev Server em `http://localhost:8080` e o Mailpit em `http://localhost:8025`.

## Redis

O Docker Compose configura Redis automaticamente para cache, sessões e filas. Para habilitá-lo fora do Docker, altere no `.env`:

```env
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

O servidor Redis real é executado pelo serviço `redis:7.4-alpine` do Docker Compose. A extensão `phpredis` instalada na imagem PHP serve apenas para conectar o Laravel ao servidor; Predis não é usado.

Para processar trabalhos em fila, execute:

```bash
php artisan queue:work
```

## Arquivos de build

`npm run build` limpa e recria `public/assets` com arquivos versionados pelo conteúdo:

```text
public/assets/
├── app.12ab34cd.css
├── app.56ef78ab.js
├── app.56ef78ab.js.map
├── manifest.json
└── media/
```

O helper `webpack_asset()` consulta o manifest para que as views nunca precisem conhecer o hash. Em desenvolvimento, `npm run watch` gera nomes estáveis (`app.js` e `app.css`) e atualiza o mesmo manifest.

## Estrutura

```text
app/
├── Http/Controllers/    Entrada HTTP e respostas
├── Models/              Entidades do banco
├── Providers/           Registro e inicialização
├── Repositories/        Acesso a dados e APIs externas
└── Services/            Regras de negócio
database/
├── migrations/          Estrutura do banco
└── seeders/             Dados iniciais
resources/
├── css/                 Estilos globais
├── js/
│   ├── components/      Componentes reutilizáveis
│   ├── pages/           Páginas ligadas às rotas
│   └── services/        Cliente da API
└── views/               Página Blade que inicia o React
routes/
├── api.php              Endpoints JSON
├── console.php          Comandos agendáveis
└── web.php              Páginas do navegador
tests/
├── Feature/             Fluxos HTTP e integração
└── Unit/                Regras isoladas
```

## Criando um módulo

Para um recurso `Product`, normalmente crie:

1. `app/Models/Product.php`
2. uma migration em `database/migrations/`
3. `app/Repositories/ProductRepository.php`
4. `app/Services/ProductService.php`
5. `app/Http/Controllers/Api/ProductController.php`
6. endpoints em `routes/api.php`
7. página em `resources/js/pages/`
8. testes em `tests/Feature/` e `tests/Unit/`

O módulo `Example` demonstra o fluxo Controller → Service → Repository e pode ser apagado quando o primeiro recurso real for criado.
