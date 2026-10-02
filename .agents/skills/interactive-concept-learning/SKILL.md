---
name: interactive-concept-learning
description: Mandatory 5-stage collaborative pair programming and learning workflow (Learn -> Discuss -> Doubt Solving -> Implementation -> Testing & Review) for Adhyayan AI.
---

# Interactive Collaborative Learning & Pair Programming Workflow

The agent must NEVER make unilateral architectural, technical, or design decisions alone. Every step MUST strictly follow this 5-stage collaborative lifecycle:

---

## The Mandatory 5-Stage Lifecycle

```text
+-------------------------------------------------------------------------+
|                COLLABORATIVE PAIR PROGRAMMING WORKFLOW                  |
|                                                                         |
|  [ 1. LEARN ]                                                           |
|     - Break down the underlying concept from first principles.          |
|     - Explain the mechanics, syntax, and interview relevance.           |
|                                                                         |
|  [ 2. DISCUSS & DECIDE ]                                                |
|     - Present architectural options with pros, cons, and tradeoffs.     |
|     - NEVER unilaterally decide. Ask the user for their choice.         |
|                                                                         |
|  [ 3. DOUBT SOLVING ]                                                   |
|     - Address any questions, edge cases, or clarifications raised       |
|       by the user until 100% alignment is reached.                      |
|                                                                         |
|  [ 4. IMPLEMENTATION ]                                                  |
|     - Write clean, modular, typed code for the agreed step ONLY.        |
|     - Follow file placement and naming conventions.                     |
|                                                                         |
|  [ 5. TESTING & REVIEW ]                                                |
|     - Verify and test the output.                                       |
|     - Review the changes together before moving to the next stage.      |
+-------------------------------------------------------------------------+
```

---

## Core Rules

1. **Never Assume or Auto-Decide**:
   - Do not write architectural specifications, schemas, or library choices without discussing options and getting explicit user confirmation first.
2. **No Unrendered Mermaid in Chat**:
   - Use clean ASCII art, Markdown tables, or structured text boxes for all visual explanations.
3. **Paced Execution**:
   - Focus on one concept and one step at a time. Never rush ahead into subsequent steps.
