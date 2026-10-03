import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADII } from "@/constants/theme";

export interface EmptyProps extends ViewProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function Empty({
  icon = "sparkles-outline",
  title,
  description,
  action,
  style,
  ...props
}: EmptyProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={28} color={COLORS.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {action && <View style={styles.actionContainer}>{action}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: RADII.full,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
    textAlign: "center",
  },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 18,
    maxWidth: 260,
  },
  actionContainer: {
    marginTop: SPACING.lg,
  },
});
