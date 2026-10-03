import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

// ==========================================
// 1. Users Table
// ==========================================
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  academicGoal: text("academic_goal").default("STEM"),
  streakCount: integer("streak_count").default(0),
  lastActiveAt: timestamp("last_active_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ==========================================
// 2. Chat Sessions Table
// ==========================================
export const chatSessions = pgTable("chat_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  subject: text("subject").default("General STEM").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ==========================================
// 3. Chat Messages Table
// ==========================================
export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id")
    .references(() => chatSessions.id, { onDelete: "cascade" })
    .notNull(),
  role: text("role", { enum: ["user", "assistant", "system"] }).notNull(),
  content: text("content").notNull(),
  thinking: text("thinking"),
  formula: text("formula"),
  citations: jsonb("citations"), // Array of { pageNumber, quote, sourceTitle }
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ==========================================
// 4. Practice Tests Table
// ==========================================
export const practiceTests = pgTable("practice_tests", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  subject: text("subject").notNull(),
  difficulty: text("difficulty", { enum: ["Easy", "Medium", "Hard"] }).notNull(),
  questions: jsonb("questions").notNull(), // Array of QuizQuestion
  score: integer("score"),
  totalQuestions: integer("total_questions").notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ==========================================
// 5. Config-Driven UI Layouts Table
// ==========================================
export const uiConfigs = pgTable("ui_configs", {
  id: uuid("id").primaryKey().defaultRandom(),
  screenName: text("screen_name").notNull().unique(),
  layoutConfig: jsonb("layout_config").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
