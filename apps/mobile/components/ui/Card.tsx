import React from "react";
import { View, Text, StyleSheet, ViewProps, TextProps } from "react-native";
import { COLORS, SPACING, RADII, SHADOWS } from "@/constants/theme";

export interface CardProps extends ViewProps {
  glassy?: boolean;
}

export function Card({ style, glassy, children, ...props }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        glassy && styles.glassy,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

export function CardHeader({ style, children, ...props }: ViewProps) {
  return <View style={[styles.header, style]} {...props}>{children}</View>;
}

export function CardTitle({ style, children, ...props }: TextProps) {
  return <Text style={[styles.title, style]} {...props}>{children}</Text>;
}

export function CardDescription({ style, children, ...props }: TextProps) {
  return <Text style={[styles.description, style]} {...props}>{children}</Text>;
}

export function CardContent({ style, children, ...props }: ViewProps) {
  return <View style={[styles.content, style]} {...props}>{children}</View>;
}

export function CardFooter({ style, children, ...props }: ViewProps) {
  return <View style={[styles.footer, style]} {...props}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  glassy: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderColor: "rgba(226, 232, 240, 0.8)",
  },
  header: {
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
  content: {
    gap: SPACING.sm,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
});
