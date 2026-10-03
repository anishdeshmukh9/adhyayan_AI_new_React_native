import { z } from "zod";

// ==========================================
// 1. User & Authentication Schemas
// ==========================================
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string().nullable().optional(),
  avatarUrl: z.string().url().nullable().optional(),
  academicGoal: z.string().default("STEM"),
  streakCount: z.number().int().default(0),
  lastActiveAt: z.date().optional(),
  createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

// ==========================================
// 2. Chat & Doubt Solving Schemas
// ==========================================
export const ChatRoleSchema = z.enum(["user", "assistant", "system"]);
export type ChatRole = z.infer<typeof ChatRoleSchema>;

export const CitationSchema = z.object({
  pageNumber: z.number().optional(),
  sourceTitle: z.string().optional(),
  sourceUrl: z.string().optional(),
  quote: z.string().optional(),
});
export type Citation = z.infer<typeof CitationSchema>;

export const ChatMessageSchema = z.object({
  id: z.string().uuid(),
  sessionId: z.string().uuid(),
  role: ChatRoleSchema,
  content: z.string(),
  thinking: z.string().optional(),
  formula: z.string().optional(),
  citations: z.array(CitationSchema).optional(),
  createdAt: z.date(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatSessionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string(),
  subject: z.string().default("General STEM"),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type ChatSession = z.infer<typeof ChatSessionSchema>;

// ==========================================
// 3. Quiz & Practice Schemas
// ==========================================
export const QuizQuestionSchema = z.object({
  id: z.string(),
  questionText: z.string(),
  options: z.array(z.string()).min(2),
  correctIndex: z.number().int(),
  explanation: z.string(),
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export const PracticeTestSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  subject: z.string(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  questions: z.array(QuizQuestionSchema),
  score: z.number().optional(),
  totalQuestions: z.number().int(),
  isCompleted: z.boolean().default(false),
  createdAt: z.date(),
});
export type PracticeTest = z.infer<typeof PracticeTestSchema>;

// ==========================================
// 4. Config-Driven UI & Tool Schemas
// ==========================================
export const StudyToolSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  route: z.string(),
  icon: z.string(),
  badgeText: z.string().optional(),
  badgeVariant: z.enum(["primary", "accent", "success"]).optional(),
  category: z.enum(["core", "multimodal", "practice"]),
  enabled: z.boolean().default(true),
});
export type StudyTool = z.infer<typeof StudyToolSchema>;
