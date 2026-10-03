import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import { COLORS, SPACING, RADII } from "@/constants/theme";

export interface BadgeProps extends ViewProps {
  variant?: "default" | "primary" | "accent" | "success" | "outline";
  children: React.ReactNode;
}

export function Badge({ variant = "default", style, children, ...props }: BadgeProps) {
  return (
    <View style={[styles.base, styles[variant], style]} {...props}>
      <Text style={[styles.textBase, styles[`text_${variant}`]]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: 3,
    borderRadius: RADII.full,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  textBase: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  default: {
    backgroundColor: COLORS.surfaceSubtle,
    borderColor: COLORS.border,
  },
  text_default: {
    color: COLORS.textSecondary,
  },
  primary: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryBorder,
  },
  text_primary: {
    color: COLORS.primary,
  },
  accent: {
    backgroundColor: COLORS.accentLight,
    borderColor: COLORS.accentBorder,
  },
  text_accent: {
    color: COLORS.accent,
  },
  success: {
    backgroundColor: COLORS.successLight,
    borderColor: "rgba(16, 185, 129, 0.25)",
  },
  text_success: {
    color: COLORS.success,
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: COLORS.border,
  },
  text_outline: {
    color: COLORS.textSecondary,
  },
});
