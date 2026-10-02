---
trigger: always_on
---

# Git Workflow & Commit Rules

1. **Branch Naming**: All active working branches must follow:
   `dev-v<MAJOR>.<MINOR>.<PATCH>-<feature_name>`
   Example: `dev-v0.0.1-monorepo-scaffold`

2. **Commit Prefix**: Every git commit MUST start with the active version identifier prefix:
   `dev-v<MAJOR>.<MINOR>.<PATCH>: <description>`
   Example: `dev-v0.0.1: add git tracking convention skill`

3. **Ignore Legacy Code**: Never stage or commit anything from `old_shit/`.
