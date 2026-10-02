# ADR 0003: Hybrid Data Architecture with Drizzle ORM and Supabase Postgres

## Status
Accepted

## Context
We evaluated two data layer strategies:
1. **Pure Supabase BaaS Client (`@supabase/supabase-js`)**: Couples queries to Supabase SDK syntax and Postgres RLS.
2. **Hybrid Architecture (Drizzle ORM + Supabase Postgres)**: Uses Supabase for free managed PostgreSQL hosting, `pgvector`, Auth, and Storage, while using **Drizzle ORM** for all database schemas, migrations, and typed queries.

## Decision
Adopt **Option B: Hybrid Architecture (Drizzle ORM + Supabase Postgres)**:
- **Database Engine**: Supabase Managed PostgreSQL with `pgvector`.
- **Data Access Layer**: Drizzle ORM (`drizzle-orm` + `drizzle-kit` for schema migrations).
- **Auth & Storage**: Supabase Auth (OAuth/Email) and Supabase S3 Storage.

## Consequences
- **Positive**:
  - **Zero Vendor Lock-in**: The entire data access layer is standard SQL. If we ever migrate to Neon, AWS RDS, or self-hosted Postgres, zero application query code needs to change.
  - **Compile-Time Type Safety**: Full TypeScript autocomplete and compile-time validation for all database queries and relations.
  - **Sub-1ms Overhead**: Drizzle has zero runtime binary overhead, perfectly suited for Next.js 15 Server Components and Edge functions.
  - **$0 Running Cost**: 100% covered by Supabase Free Tier.
- **Trade-off**: Requires running `drizzle-kit push` / `drizzle-kit generate` for SQL migration generation.
