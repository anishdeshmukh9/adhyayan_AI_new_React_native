# @adhyayan/db

Type-safe database layer powered by **Drizzle ORM** connected to **Supabase PostgreSQL (`pgvector`)**.

## Architectural Decisions
- **ORM & Migrations**: Drizzle ORM (`drizzle-orm`) + Drizzle Kit (`drizzle-kit`).
- **Database Engine**: Supabase PostgreSQL with `pgvector` for RAG similarity search.
- **Zero Vendor Lock-in**: All queries and schemas are pure TypeScript SQL definitions, completely decoupled from any proprietary BaaS API.

## Directory Layout
```text
packages/db/
├── src/
│   ├── schema/           <-- Drizzle table definitions (users, chats, documents, chunks)
│   ├── client.ts         <-- Drizzle database client instance
│   └── index.ts          <-- Public exports for apps/web and packages/ai
├── drizzle.config.ts     <-- Drizzle Kit migration & introspect configuration
└── README.md
```
