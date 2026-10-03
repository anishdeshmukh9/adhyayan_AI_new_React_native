/**
 * Adhyayan AI - Central UI & Feature Configuration Registry
 * Config-Driven Schema for Dynamic Rendering (Mobile & Web)
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
  hasSolution: boolean;
}

export const APP_CONFIG = {
  appName: "Adhyayan AI",
  appTagline: "Intelligent Socratic Learning & Doubt Resolution",
  version: "0.1.0",
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
    description: "Instant camera OCR extraction with step-by-step Socratic solution.",
    route: "/scan",
    icon: "scan-outline",
    badge: { text: "VISION OCR", variant: "primary" },
    category: "core",
    enabled: true,
  },
  {
    id: "pdf_chat",
    title: "Document & Book Chat",
    description: "Upload textbook chapters or lecture notes for interactive doubt resolution.",
    route: "/pdf-chat",
    icon: "document-text-outline",
    badge: { text: "PDF", variant: "primary" },
    category: "multimodal",
    enabled: true,
  },
  {
    id: "youtube_learning",
    title: "Video Learning",
    description: "Paste lecture URLs to get interactive timestamps and formula extractions.",
    route: "/youtube",
    icon: "play-circle-outline",
    badge: { text: "VIDEO", variant: "accent" },
    category: "multimodal",
    enabled: true,
  },
  {
    id: "podcast_player",
    title: "Audio Study Podcast",
    description: "Listen to AI-synthesized audio recaps of complex STEM concepts.",
    route: "/podcast",
    icon: "headset-outline",
    badge: { text: "AUDIO", variant: "accent" },
    category: "multimodal",
    enabled: true,
  },
  {
    id: "adaptive_tests",
    title: "Adaptive Test Generator",
    description: "Generate customized practice mock tests focused on weak topics.",
    route: "/(tabs)/practice",
    icon: "create-outline",
    badge: { text: "AI TEST", variant: "success" },
    category: "practice",
    enabled: true,
  },
];

export const RECENT_DOUBTS_SAMPLE: RecentDoubt[] = [
  {
    id: "1",
    question: "Derivation of Euler-Lagrange equations in Classical Mechanics",
    subject: "Physics",
    timeAgo: "15m ago",
    hasSolution: true,
  },
  {
    id: "2",
    question: "Eigenvalues and eigenvectors geometric interpretation in 3D space",
    subject: "Linear Algebra",
    timeAgo: "2h ago",
    hasSolution: true,
  },
  {
    id: "3",
    question: "Thermodynamic efficiency calculation in Carnot cycle",
    subject: "Thermodynamics",
    timeAgo: "Yesterday",
    hasSolution: true,
  },
];
