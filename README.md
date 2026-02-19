# 🚗 CNH Marketplace

Plataforma para conectar alunos e instrutores de CNH em todo o Brasil.

## Visão Geral

Este monorepo contém todos os serviços da plataforma CNH Marketplace:

| Pacote | Descrição | Tecnologia |
|--------|-----------|------------|
| `apps/web` | Frontend da aplicação | Next.js 14 (App Router) |
| `apps/api` | Backend REST API | NestJS + Fastify |

## Arquitetura

```
cnh/
├── apps/
│   ├── api/                  # NestJS + Fastify API
│   │   ├── prisma/           # Schema e seed do banco
│   │   └── src/
│   │       ├── health/       # Health check endpoint
│   │       ├── auth/         # Autenticação JWT (stub)
│   │       ├── users/        # Gestão de usuários (stub)
│   │       ├── instructors/  # Listagem e perfil de instrutores
│   │       ├── bookings/     # Agendamentos (stub)
│   │       ├── payments/     # Pagamentos Mercado Pago (stub)
│   │       └── cache/        # Camada de cache Redis
│   └── web/                  # Next.js Frontend
│       └── app/
│           ├── page.tsx      # Home
│           └── instrutores/  # Listagem e perfil de instrutores
├── docker-compose.yml        # PostgreSQL + Redis
└── .github/workflows/ci.yml  # Pipeline CI/CD
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/) >= 9
- [Docker](https://www.docker.com/) e Docker Compose

## Configuração

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Subir serviços de infraestrutura

```bash
docker compose up -d
```

### 3. Configurar variáveis de ambiente

```bash
# API
cp apps/api/.env.example apps/api/.env

# Web
cp apps/web/.env.example apps/web/.env.local
```

#### Variáveis da API (`apps/api/.env`)

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `DATABASE_URL` | URL de conexão com PostgreSQL | `postgresql://cnh:cnh@localhost:5432/cnh` |
| `REDIS_URL` | URL de conexão com Redis | `redis://localhost:6379` |
| `JWT_SECRET` | Segredo para assinar tokens JWT | — |
| `PORT` | Porta da API | `3001` |
| `MERCADOPAGO_ACCESS_TOKEN` | Token do Mercado Pago | — |

#### Variáveis do Web (`apps/web/.env.local`)

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `NEXT_PUBLIC_API_URL` | URL base da API | `http://localhost:3001` |

### 4. Migrar banco de dados

```bash
cd apps/api
pnpm prisma:migrate
pnpm prisma:seed
```

### 5. Iniciar em desenvolvimento

```bash
# Terminal 1 - API
pnpm --filter @cnh/api start:dev

# Terminal 2 - Web
pnpm --filter @cnh/web dev
```

- API: http://localhost:3001
- Web: http://localhost:3000

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm build` | Build de todos os pacotes |
| `pnpm lint` | Lint de todos os pacotes |
| `pnpm test` | Testes de todos os pacotes |
| `pnpm typecheck` | Verificação de tipos TypeScript |

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/health` | Status da API |
| `GET` | `/instructors` | Lista instrutores (cursor pagination) |
| `GET` | `/instructors/:id` | Perfil do instrutor |

### Cursor Pagination

```
GET /instructors?limit=20&cursor=instructor-20
```

Resposta:
```json
{
  "data": [...],
  "nextCursor": "instructor-40",
  "total": 50
}
```

## CI/CD

O pipeline de CI (`.github/workflows/ci.yml`) executa nos pushes e PRs para `main`:

- **lint** – ESLint em todos os pacotes
- **typecheck** – Verificação de tipos TypeScript
- **test** – Testes unitários
- **build-web** – Build do Next.js
- **build-api** – Build do NestJS

## Deploy

- **Web**: Deploy automático na [Vercel](https://vercel.com/) via `vercel.json`
- **API**: Docker container ou plataforma de sua escolha