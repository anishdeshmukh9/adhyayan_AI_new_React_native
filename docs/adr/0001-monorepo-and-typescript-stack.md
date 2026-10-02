# ADR 0001: Monorepo Architecture with Turborepo and pnpm

## Status
Accepted

## Context
Adhyayan AI is an educational SaaS platform requiring:
1. A rich desktop/tablet Web experience (Next.js 15, Shadcn UI, KaTeX).
2. A companion Mobile experience (React Native Expo).
3. Shared backend utilities, domain types, database schemas, and AI prompts.

Managing two separate Git repositories would lead to:
- Code duplication of types and API contracts.
- High risk of schema drift.
- Double the deployment overhead.

## Decision
Adopt a **Turborepo** monorepo workspace powered by **pnpm workspaces**:
- Apps: `apps/web` (Next.js), `apps/mobile` (Expo).
- Packages: `packages/types`, `packages/db`, `packages/ai`, `packages/ui`, `packages/config`.

## Consequences
- **Positive**: Single Source of Truth for Zod schemas and DB types; instant end-to-end type safety; parallel cached builds via Turborepo.
- **Trade-off**: Requires proper workspace dependency configuration (`workspace:*`).
