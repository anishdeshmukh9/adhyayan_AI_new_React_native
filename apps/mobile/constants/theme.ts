/**
 * Adhyayan AI - Global Design Tokens System
 * Single Source of Truth for Mobile App (React Native)
 */

export const COLORS = {
  // Base Canvas & Surfaces (Crisp White / Slate Grays)
  background: "#F8FAFC",       // Screen canvas (Slate-50)
  surface: "#FFFFFF",          // Card / Modal / Sheet surface (White)
  surfaceSubtle: "#F1F5F9",    // Secondary container / Input bg (Slate-100)
  border: "#E2E8F0",           // Default 1px divider/border (Slate-200)
  borderFocused: "#94A3B8",    // Focused input border (Slate-400)

  // Typography Tokens
  text: "#0F172A",             // High contrast primary text (Slate-900)
  textSecondary: "#475569",    // Secondary body / labels (Slate-600)
  textMuted: "#94A3B8",        // Placeholders / captions (Slate-400)
  textInverse: "#FFFFFF",      // Text on colored CTA buttons

  // Primary Brand Scale (Logo Blues)
  primary: "#2563EB",          // Primary CTA buttons, key actions (Blue-600)
  primaryHover: "#1D4ED8",     // Pressed / hover state (Blue-700)
  primaryLight: "#EFF6FF",     // Subtle active pill / highlight bg (Blue-50)
  primaryBorder: "#BFDBFE",    // Active pill border (Blue-200)

  // Enhancement / Accent Scale (Warm Orange - Badges, Streaks, Sparkles)
  accent: "#F97316",           // AI sparkles, study streaks, badges (Orange-500)
  accentHover: "#EA580C",      // Darker accent (Orange-600)
  accentLight: "#FFF7ED",      // Badge background (Orange-50)
  accentBorder: "#FED7AA",     // Badge outline (Orange-200)

  // Functional Status
  success: "#10B981",
  successLight: "#ECFDF5",
  warning: "#F59E0B",
  warningLight: "#FFFBEB",
  error: "#EF4444",
  errorLight: "#FEF2F2",
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  hero: 32,
} as const;

export const RADII = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  full: 9999,
} as const;

export const SHADOWS = {
  card: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  primaryBtn: {
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  subtle: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
} as const;

export const TYPOGRAPHY = {
  title: {
    fontSize: 26,
    fontWeight: "700" as const,
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: COLORS.textSecondary,
    textTransform: "uppercase" as const,
    letterSpacing: 0.8,
  },
  button: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: COLORS.textInverse,
  },
} as const;
