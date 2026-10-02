export const COLORS = {
  // Backgrounds & Neutral Surfaces
  background: "#09090B",       // Deep Neutral Charcoal (Zinc-950)
  card: "#18181B",             // Clean Surface (Zinc-900)
  cardBorder: "#27272A",       // Subtle 1px Border (Zinc-800)
  cardHover: "#27272A",

  // Primary Brand Accent: Warm Premium Orange
  primary: "#F97316",          // Orange-500
  primaryHover: "#EA580C",     // Orange-600
  primaryMuted: "rgba(249, 115, 22, 0.12)",

  // Typography (Clean Whites & Grays)
  text: "#FAFAFA",             // Crisp White (Zinc-50)
  textMuted: "#A1A1AA",        // Slate Gray (Zinc-400)
  textDim: "#71717A",          // Dim Gray (Zinc-500)

  // Functional Status
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444"
} as const;

export const SHADOWS = {
  card: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 3
  },
  primaryBtn: {
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4
  }
} as const;
