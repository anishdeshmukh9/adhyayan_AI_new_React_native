# 🗄️ Database & Security Architecture

## 1. Schema Overview

Adhyayan AI uses **Supabase PostgreSQL** with the **`pgvector`** extension.

```text
+--------------------------------------------------------------------------+
|                            ENTITY RELATIONSHIPS                          |
|                                                                          |
|   [ auth.users ] (Supabase Auth Engine)                                  |
|         |                                                                |
|         v (1:1 ON DELETE CASCADE)                                        |
|   [ public.profiles ]                                                    |
|         |                                                                |
|         +-------------------+--------------------+                       |
|         | (1:N)             | (1:N)              | (1:N)                 |
|         v                   v                    v                       |
|   [ chat_sessions ]   [ rag_documents ]    [ test_evaluations ]          |
|         |                   |                                            |
|         | (1:N)             | (1:N)                                      |
|         v                   v                                            |
|   [ chat_messages ]   [ rag_document_chunks (pgvector 1536-dim) ]        |
+--------------------------------------------------------------------------+
```

---

## 2. Table Specifications

### 2.1 `profiles`
- `id` (UUID, Primary Key, references `auth.users.id`)
- `email` (TEXT, Unique)
- `full_name` (TEXT)
- `avatar_url` (TEXT)
- `grade_level` (TEXT)
- `target_exam` (TEXT - e.g. JEE, NEET, SAT, UPSC)
- `created_at` / `updated_at` (TIMESTAMPTZ)

### 2.2 `chat_sessions`
- `id` (UUID, Primary Key)
- `user_id` (UUID, references `profiles.id`)
- `title` (TEXT)
- `mode` (TEXT: `ai-teacher`, `ocr-solver`, `pdf-rag`, `youtube-rag`, `podcast-gen`, `gita-counselor`, `quiz-practice`)
- `context_url` (TEXT)
- `summary` (TEXT)

### 2.3 `chat_messages`
- `id` (UUID, Primary Key)
- `chat_id` (UUID, references `chat_sessions.id`)
- `user_id` (UUID, references `profiles.id`)
- `role` (TEXT: `user`, `assistant`, `system`, `data`)
- `content` (TEXT)
- `generative_blocks` (JSONB - for dynamic UI cards, quiz prompts, and formula viewers)
- `media_urls` (TEXT[])

### 2.4 `rag_documents` & `rag_document_chunks`
- Document tracking and chunked text segments.
- `embedding` (`VECTOR(1536)`) indexed with **HNSW (`m=16, ef_construction=64`)** for sub-millisecond approximate nearest neighbor search.

---

## 3. Row Level Security (RLS) Matrix

Every table has RLS explicitly enabled:

| Table | SELECT | INSERT | UPDATE | DELETE |
| :--- | :--- | :--- | :--- | :--- |
| `profiles` | `auth.uid() = id` | System Trigger | `auth.uid() = id` | `auth.uid() = id` |
| `chat_sessions` | `auth.uid() = user_id` | `auth.uid() = user_id` | `auth.uid() = user_id` | `auth.uid() = user_id` |
| `chat_messages` | `auth.uid() = user_id` | `auth.uid() = user_id` | `auth.uid() = user_id` | `auth.uid() = user_id` |
| `rag_documents` | `auth.uid() = user_id` | `auth.uid() = user_id` | `auth.uid() = user_id` | `auth.uid() = user_id` |
