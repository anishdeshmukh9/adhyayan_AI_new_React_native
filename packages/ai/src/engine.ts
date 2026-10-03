import { streamText, generateObject, generateText } from "ai";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { SOCRATIC_TUTOR_PROMPT, QUIZ_GENERATOR_PROMPT } from "./prompts";
import { QuizQuestionSchema } from "@adhyayan/types";

// Default model provider fallback
export const getAIModel = () => {
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return google("gemini-1.5-flash");
  }
  if (process.env.OPENAI_API_KEY) {
    return openai("gpt-4o-mini");
  }
  // Fallback to Google Gemini
  return google("gemini-1.5-flash");
};

/**
 * Stream Socratic AI Doubt Explanation
 */
export async function streamSocraticDoubt({
  prompt,
  history = [],
}: {
  prompt: string;
  history?: { role: "user" | "assistant"; content: string }[];
}) {
  const model = getAIModel();

  return streamText({
    model,
    system: SOCRATIC_TUTOR_PROMPT,
    messages: [
      ...history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: prompt },
    ],
  });
}

/**
 * Generate Adaptive STEM Quiz Questions
 */
export async function generateAdaptiveQuiz({
  subject,
  difficulty,
  count = 5,
}: {
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  count?: number;
}) {
  const model = getAIModel();

  const { object } = await generateObject({
    model,
    system: QUIZ_GENERATOR_PROMPT,
    prompt: `Generate ${count} ${difficulty} difficulty questions for the subject: ${subject}.`,
    schema: z.object({
      questions: z.array(QuizQuestionSchema),
    }),
  });

  return object.questions;
}
