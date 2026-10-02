# ADR 0002: Eliminating Python Backend in Favor of Vercel AI SDK + Supabase pgvector

## Status
Accepted

## Context
The initial prototype used a Python FastAPI backend running LangGraph, local SQLite files (`chatbot.db`), PaddleOCR, and local Manim subprocess rendering:
- Local SQLite files prevented cloud horizontal scaling.
- Synchronous blocking HTTP responses caused 10–30 second latency without streaming.
- Subprocess execution of arbitrary LLM-generated code was an extreme security risk.
- Hosting dual Python and Node stacks doubled maintenance and cloud costs.

## Decision
1. Replace Python LangGraph with **Vercel AI SDK (`streamText`, `generateObject`, tools)** running on Next.js Route Handlers / Server Actions.
2. Replace local SQLite & Chroma vector stores with **Supabase PostgreSQL + `pgvector` (HNSW indexing)**.
3. Replace PaddleOCR server with **Multimodal Vision LLMs** (GPT-4o / Gemini 2.0 Flash) which deliver superior OCR accuracy with zero server overhead.
4. Replace local server-side Manim compilation with **KaTeX / LaTeX** math rendering and client-side interactive visual elements.

## Consequences
- **Positive**: 90% latency reduction (sub-200ms TTFT via streaming), zero server maintenance overhead, serverless scalability, and strict Postgres RLS security.
- **Trade-off**: Requires Node/Edge compatible libraries for PDF and text parsing.
