# 🏛️ Adhyayan AI — System Architecture

## 1. High-Level Architecture Overview

Adhyayan AI is a full-stack, multimodal educational SaaS platform engineered with a **Turborepo Monorepo**, **Next.js 15 (App Router)**, **React Native (Expo SDK 54)**, **Supabase (PostgreSQL + pgvector)**, and **Vercel AI SDK**.

```text
+-------------------------------------------------------------------------+
|                              CLIENT LAYER                               |
|                                                                         |
|   +----------------------------------+  +---------------------------+   |
|   |         apps/web (Next.js 15)    |  |  apps/mobile (Expo RN)    |   |
|   |  - React Server Components (RSC) |  |  - Expo Router (v4/v5)    |   |
|   |  - Shadcn UI + Tailwind CSS v4   |  |  - NativeWind / Reusables |   |
|   |  - KaTeX Math & LaTeX Renderer   |  |  - Haptics, Audio, Vision |   |
|   |  - Vercel AI SDK UI Hooks        |  |  - Offline-first cache    |   |
|   +----------------------------------+  +---------------------------+   |
+------------------------------------+------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                        SHARED INTERNAL PACKAGES                         |
|                                                                         |
|   +-------------------+  +-------------------+  +-------------------+   |
|   |  packages/types   |  |   packages/db     |  |   packages/ai     |   |
|   |  - Zod Schemas    |  |  - Supabase client|  |  - Vercel AI SDK  |   |
|   |  - TS Interfaces  |  |  - pgvector RAG   |  |  - Upstash Cache  |   |
|   |  - API Contracts  |  |  - RLS Security   |  |  - System Prompts |   |
|   +-------------------+  +-------------------+  +-------------------+   |
+------------------------------------+------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                         BACKEND & CLOUD SERVICES                        |
|                                                                         |
|   +----------------------------+  +---------------------------------+   |
|   |       Supabase Cloud       |  |       AI & Model Providers      |   |
|   |  - PostgreSQL with RLS     |  |  - OpenAI (GPT-4o, Embeddings)  |   |
|   |  - pgvector (HNSW Index)   |  |  - Google Gemini 2.0 Flash      |   |
|   |  - Supabase Auth (OAuth)   |  |  - Anthropic Claude 3.5 Sonnet  |   |
|   |  - Storage (PDFs, Audio)   |  |  - Upstash Redis (Semantic)     |   |
|   +----------------------------+  +---------------------------------+   |
+-------------------------------------------------------------------------+
```

---

## 2. Monorepo Package Breakdown

| Directory | Package Name | Scope & Responsibilities |
| :--- | :--- | :--- |
| `apps/web` | `web` | Next.js 15 Web Application with App Router, SSR, RSC, and Shadcn UI. |
| `apps/mobile` | `mobile` | Universal React Native / Expo application for iOS and Android. |
| `packages/types` | `@adhyayan/types` | Single Source of Truth for Zod schemas, TypeScript types, and validation contracts. |
| `packages/db` | `@adhyayan/db` | Supabase Postgres client, generated database types, migrations, and vector similarity search. |
| `packages/ai` | `@adhyayan/ai` | AI orchestration layer: Vercel AI SDK wrappers, prompts, structured output schemas, and semantic caching. |
| `packages/ui` | `@adhyayan/ui` | Shared UI tokens, primitives, and styling configurations. |
| `packages/config` | `@adhyayan/config` | Shared TypeScript (`tsconfig.json`), ESLint, and Prettier rules. |

---

## 3. Data & Request Lifecycle

```text
[ Student ] ---> [ Next.js Route Handler / Server Action ]
                       |
                       +---> 1. Check Upstash Redis Semantic Cache (Hit -> return in 40ms)
                       |
                       +---> 2. Check Supabase Auth Session & RLS Policy
                       |
                       +---> 3. Query pgvector for Context Chunks (HNSW Cosine Search)
                       |
                       +---> 4. Stream AI Response via Vercel AI SDK (streamText)
                       |
                       +---> 5. Persist Chat History in Supabase Postgres
                       |
[ Student ] <--- [ Streamed Markdown + KaTeX LaTeX + Generative UI Blocks ]
```
