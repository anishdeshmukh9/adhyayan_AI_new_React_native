export const COLORS = {
  // 1. Deep Obsidian Void
  background: "#030712",
  // 2. Frosted Dark Glass Surface
  card: "#0F172A",
  cardBorder: "#1E293B",
  cardGlass: "rgba(15, 23, 42, 0.8)",
  // 3. Electric Hyper-Violet (Primary Brand)
  primary: "#8B5CF6",
  primaryHover: "#7C3AED",
  primaryGlow: "rgba(139, 92, 246, 0.35)",
  // 4. Cyber Cyan Glow (Secondary Accent)
  secondary: "#06B6D4",
  secondaryGlow: "rgba(6, 182, 212, 0.35)",
  // 5. Crisp Contrast Typography
  text: "#F8FAFC",
  textMuted: "#94A3B8",
  textDim: "#64748B",
  // Functional Colors
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444"
} as const;

export const SHADOWS = {
  glowPrimary: {
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8
  },
  glowSecondary: {
    shadowColor: "#06B6D4",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8
  },
  card: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4
  }
} as const;
