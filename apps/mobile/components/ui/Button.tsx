import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import { COLORS, SPACING, RADII, SHADOWS } from "@/constants/theme";

export interface ButtonProps extends TouchableOpacityProps {
  variant?: "default" | "primary" | "secondary" | "outline" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  style,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        isDisabled && styles.disabled,
        style,
      ]}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "outline" || variant === "ghost" ? COLORS.primary : COLORS.textInverse}
        />
      ) : typeof children === "string" ? (
        <Text style={[styles.textBase, styles[`text_${variant}`]]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADII.md,
    gap: SPACING.xs,
  },
  size_sm: {
    height: 36,
    paddingHorizontal: SPACING.md,
  },
  size_md: {
    height: 46,
    paddingHorizontal: SPACING.lg,
  },
  size_lg: {
    height: 52,
    paddingHorizontal: SPACING.xxl,
  },
  textBase: {
    fontSize: 14,
    fontWeight: "600",
  },
  primary: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.primaryBtn,
  },
  text_primary: {
    color: COLORS.textInverse,
  },
  default: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  text_default: {
    color: COLORS.text,
  },
  secondary: {
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  text_secondary: {
    color: COLORS.textSecondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  text_outline: {
    color: COLORS.text,
  },
  accent: {
    backgroundColor: COLORS.accent,
  },
  text_accent: {
    color: COLORS.textInverse,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  text_ghost: {
    color: COLORS.primary,
  },
  disabled: {
    opacity: 0.5,
  },
});
