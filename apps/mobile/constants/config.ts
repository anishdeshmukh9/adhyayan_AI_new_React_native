/**
 * Adhyayan AI - Central UI & Feature Configuration Registry
 * Simple, human-friendly feature configurations
 */

export interface FeatureTool {
  id: string;
  title: string;
  description: string;
  route: string;
  icon: string;
  badge?: {
    text: string;
    variant: "primary" | "accent" | "success";
  };
  category: "core" | "multimodal" | "practice";
  enabled: boolean;
}

export interface NavigationTab {
  name: string;
  title: string;
  icon: string;
  route: string;
}

export interface RecentDoubt {
  id: string;
  question: string;
  subject: string;
  timeAgo: string;
}

export const APP_CONFIG = {
  appName: "Adhyayan AI",
  appTagline: "AI Tutor & Learning Workspace",
  version: "0.1.2",
} as const;

export const NAVIGATION_TABS: NavigationTab[] = [
  {
    name: "index",
    title: "Home",
    icon: "home-outline",
    route: "/(tabs)",
  },
  {
    name: "chat",
    title: "AI Tutor",
    icon: "chatbubble-ellipses-outline",
    route: "/(tabs)/chat",
  },
  {
    name: "practice",
    title: "Practice",
    icon: "layers-outline",
    route: "/(tabs)/practice",
  },
  {
    name: "profile",
    title: "Profile",
    icon: "person-outline",
    route: "/(tabs)/profile",
  },
];

export const STUDY_TOOLS: FeatureTool[] = [
  {
    id: "scan_question",
    title: "Scan Question",
    description: "Take a photo of any question to get an instant explanation.",
    route: "/scan",
    icon: "scan-outline",
    badge: { text: "VISION", variant: "primary" },
    category: "core",
    enabled: true,
  },
  {
    id: "pdf_chat",
    title: "Document Chat",
    description: "Upload study notes or books to ask questions and find summaries.",
    route: "/pdf-chat",
    icon: "document-text-outline",
    badge: { text: "PDF", variant: "primary" },
    category: "multimodal",
    enabled: true,
  },
  {
    id: "youtube_learning",
    title: "Video Learning",
    description: "Paste a lecture link to get key timestamps and notes.",
    route: "/youtube",
    icon: "play-circle-outline",
    badge: { text: "VIDEO", variant: "accent" },
    category: "multimodal",
    enabled: true,
  },
  {
    id: "podcast_player",
    title: "Audio Podcast",
    description: "Listen to audio summaries of your study topics on the go.",
    route: "/podcast",
    icon: "headset-outline",
    badge: { text: "AUDIO", variant: "accent" },
    category: "multimodal",
    enabled: true,
  },
  {
    id: "adaptive_tests",
    title: "Practice Tests",
    description: "Generate practice quizzes to test your understanding.",
    route: "/(tabs)/practice",
    icon: "create-outline",
    badge: { text: "PRACTICE", variant: "success" },
    category: "practice",
    enabled: true,
  },
];

export const RECENT_DOUBTS_SAMPLE: RecentDoubt[] = [
  {
    id: "1",
    question: "How does Newton's second law apply on an inclined plane?",
    subject: "Physics",
    timeAgo: "15m ago",
  },
  {
    id: "2",
    question: "Explain matrix multiplication step-by-step",
    subject: "Mathematics",
    timeAgo: "2h ago",
  },
  {
    id: "3",
    question: "Difference between mitosis and meiosis",
    subject: "Biology",
    timeAgo: "Yesterday",
  },
];
