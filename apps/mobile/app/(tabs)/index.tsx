import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADII, SHADOWS, TYPOGRAPHY } from "@/constants/theme";
import { STUDY_TOOLS, RECENT_DOUBTS_SAMPLE, FeatureTool } from "@/constants/config";

export default function HomeDashboard() {
  const router = useRouter();
  const [quickQuestion, setQuickQuestion] = useState("");

  const handleAskAI = () => {
    if (quickQuestion.trim()) {
      router.push("/(tabs)/chat");
    } else {
      router.push("/(tabs)/chat");
    }
  };

  const handleToolPress = (tool: FeatureTool) => {
    router.push(tool.route as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top App Bar */}
        <View style={styles.topBar}>
          <View style={styles.userProfile}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.userName}>Scholar</Text>
            </View>
          </View>

          {/* Streak Badge */}
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={16} color={COLORS.accent} />
            <Text style={styles.streakText}>5 Days</Text>
          </View>
        </View>

        {/* Quick Question Input Dock */}
        <View style={styles.askDock}>
          <View style={styles.askInputContainer}>
            <Ionicons
              name="sparkles"
              size={18}
              color={COLORS.primary}
              style={styles.askIcon}
            />
            <TextInput
              style={styles.askInput}
              placeholder="Ask any question or doubt..."
              placeholderTextColor={COLORS.textMuted}
              value={quickQuestion}
              onChangeText={setQuickQuestion}
              onSubmitEditing={handleAskAI}
            />
          </View>
          <View style={styles.dockActions}>
            <TouchableOpacity
              style={styles.dockCameraBtn}
              onPress={() => router.push("/scan" as any)}
              activeOpacity={0.7}
            >
              <Ionicons name="camera-outline" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dockSendBtn}
              onPress={handleAskAI}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-forward" size={18} color={COLORS.textInverse} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Study Tools Section (Config-Driven) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Study Tools</Text>
          <Text style={styles.sectionSubtitle}>Select an AI learning assistant</Text>
        </View>

        <View style={styles.toolsGrid}>
          {STUDY_TOOLS.map((tool) => {
            const isAccent = tool.badge?.variant === "accent";
            return (
              <TouchableOpacity
                key={tool.id}
                style={styles.toolCard}
                onPress={() => handleToolPress(tool)}
                activeOpacity={0.75}
              >
                <View style={styles.toolCardTop}>
                  <View
                    style={[
                      styles.toolIconContainer,
                      isAccent ? styles.toolIconAccent : styles.toolIconPrimary,
                    ]}
                  >
                    <Ionicons
                      name={tool.icon as any}
                      size={22}
                      color={isAccent ? COLORS.accent : COLORS.primary}
                    />
                  </View>
                  {tool.badge && (
                    <View
                      style={[
                        styles.toolBadge,
                        isAccent ? styles.toolBadgeAccent : styles.toolBadgePrimary,
                      ]}
                    >
                      <Text
                        style={[
                          styles.toolBadgeText,
                          isAccent ? styles.toolBadgeTextAccent : styles.toolBadgeTextPrimary,
                        ]}
                      >
                        {tool.badge.text}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={styles.toolTitle}>{tool.title}</Text>
                <Text style={styles.toolDescription} numberOfLines={2}>
                  {tool.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Recent Doubts Activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Discussions</Text>
          <Text style={styles.sectionSubtitle}>Pick up where you left off</Text>
        </View>

        <View style={styles.recentList}>
          {RECENT_DOUBTS_SAMPLE.map((doubt) => (
            <TouchableOpacity
              key={doubt.id}
              style={styles.recentItem}
              onPress={() => router.push("/(tabs)/chat")}
              activeOpacity={0.7}
            >
              <View style={styles.recentIconBox}>
                <Ionicons
                  name="chatbubble-outline"
                  size={18}
                  color={COLORS.primary}
                />
              </View>
              <View style={styles.recentContent}>
                <Text style={styles.recentQuestion} numberOfLines={1}>
                  {doubt.question}
                </Text>
                <View style={styles.recentMeta}>
                  <Text style={styles.recentSubject}>{doubt.subject}</Text>
                  <Text style={styles.recentDot}>•</Text>
                  <Text style={styles.recentTime}>{doubt.timeAgo}</Text>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.textMuted}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  userProfile: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: RADII.full,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },
  greeting: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.accentLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADII.full,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    gap: SPACING.xs,
  },
  streakText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.accent,
  },
  askDock: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.xxl,
    ...SHADOWS.card,
  },
  askInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  askIcon: {
    marginRight: SPACING.sm,
  },
  askInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
    color: COLORS.text,
  },
  dockActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  dockCameraBtn: {
    width: 36,
    height: 36,
    borderRadius: RADII.md,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dockSendBtn: {
    width: 36,
    height: 36,
    borderRadius: RADII.md,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.primaryBtn,
  },
  sectionHeader: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  toolsGrid: {
    gap: SPACING.md,
    marginBottom: SPACING.xxl,
  },
  toolCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.subtle,
  },
  toolCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  toolIconContainer: {
    width: 44,
    height: 44,
    borderRadius: RADII.md,
    alignItems: "center",
    justifyContent: "center",
  },
  toolIconPrimary: {
    backgroundColor: COLORS.primaryLight,
  },
  toolIconAccent: {
    backgroundColor: COLORS.accentLight,
  },
  toolBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADII.sm,
    borderWidth: 1,
  },
  toolBadgePrimary: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryBorder,
  },
  toolBadgeAccent: {
    backgroundColor: COLORS.accentLight,
    borderColor: COLORS.accentBorder,
  },
  toolBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  toolBadgeTextPrimary: {
    color: COLORS.primary,
  },
  toolBadgeTextAccent: {
    color: COLORS.accent,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  toolDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  recentList: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    ...SHADOWS.card,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  recentIconBox: {
    width: 36,
    height: 36,
    borderRadius: RADII.md,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.md,
  },
  recentContent: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  recentQuestion: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  recentMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  recentSubject: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "600",
  },
  recentDot: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginHorizontal: SPACING.xs,
  },
  recentTime: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
});
