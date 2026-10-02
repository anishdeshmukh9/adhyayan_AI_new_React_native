---
name: git-tracking-convention
description: Git branching, commit message formatting, and Semantic Versioning (SemVer) workflow rules for the Adhyayan AI SaaS project.
---

# Git Tracking & Release Convention for Adhyayan AI

This skill defines the mandatory Git workflow, branch naming strategy, commit message conventions, and release promotion rules for this repository.

---

## 1. Branch Naming Strategy

Development takes place on feature branches cut from `main`. Branches MUST follow this pattern:

```text
dev-v<MAJOR>.<MINOR>.<PATCH>-<feature_name_in_snake_or_kebab_case>
```

### Examples:
- `dev-v0.0.1-monorepo-scaffold`
- `dev-v0.1.0-supabase-schema-auth`
- `dev-v0.2.0-vercel-ai-chat-streaming`
- `dev-v0.3.0-rag-embeddings-vector-search`

---

## 2. Commit Message Convention

Every commit MUST start with the current active version tag prefix:

```text
dev-v<MAJOR>.<MINOR>.<PATCH>: <concise description of changes>
```

### Format Rules:
- Prefix: `dev-vX.Y.Z: ` (Always mandatory)
- Imperative mood, clear description
- Examples:
  - `dev-v0.0.1: setup turborepo workspace and base configs`
  - `dev-v0.1.0: add supabase schema with pgvector and rls policies`
  - `dev-v0.2.0: implement vercel ai streamText route and teacher prompt`

---

## 3. Semantic Versioning (SemVer) Lifecycle

$$\mathbf{MAJOR}.\mathbf{MINOR}.\mathbf{PATCH}$$

1. **`PATCH` (`0.0.X`)**:
   - Small bug fixes, typo corrections, dependency upgrades, minor styling tweaks.
2. **`MINOR` (`0.X.0`)**:
   - Milestone additions (e.g. Auth module, Database schemas, AI streaming routes, Quiz Generator).
3. **`MAJOR` (`X.0.0`)**:
   - Production deployment milestones merged into `main`.

---

## 4. Milestone Merging Workflow

1. Finish and test all components for the milestone in `dev-vX.Y.Z-<feature>`.
2. Commit all changes with `dev-vX.Y.Z: ...`.
3. Switch to `main`, merge the development branch, and push.
4. Cut the next development branch with the incremented version number:
   ```bash
   git checkout main
   git merge dev-v0.0.1-monorepo-scaffold
   git checkout -b dev-v0.1.0-<next-feature>
   ```
