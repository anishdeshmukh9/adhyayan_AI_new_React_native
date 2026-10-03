import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADII, SHADOWS } from "@/constants/theme";
import { STUDY_TOOLS, FeatureTool, RecentDoubt } from "@/constants/config";
import { Card, Badge, Empty, Button } from "@/components/ui";

export default function HomeDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [quickQuestion, setQuickQuestion] = useState("");
  const [recentDoubts, setRecentDoubts] = useState<RecentDoubt[]>([]);

  const handleAskAI = () => {
    router.push("/(tabs)/chat");
  };

  const handleToolPress = (tool: FeatureTool) => {
    router.push(tool.route as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top || SPACING.lg }]}>
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

          <Badge variant="accent">🔥 5 Days</Badge>
        </View>

        {/* Quick Question Input Dock */}
        <Card style={styles.askDock} glassy>
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
            <Button
              size="sm"
              variant="primary"
              onPress={handleAskAI}
            >
              <Ionicons name="arrow-forward" size={16} color={COLORS.textInverse} />
            </Button>
          </View>
        </Card>

        {/* Study Tools Section (Config-Driven) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Study Tools</Text>
          <Text style={styles.sectionSubtitle}>Select an AI learning assistant</Text>
        </View>

        <View style={styles.toolsGrid}>
          {STUDY_TOOLS.map((tool) => {
            const badgeVariant = tool.badge?.variant ?? "primary";
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
                      badgeVariant === "accent" ? styles.toolIconAccent : styles.toolIconPrimary,
                    ]}
                  >
                    <Ionicons
                      name={tool.icon as any}
                      size={22}
                      color={badgeVariant === "accent" ? COLORS.accent : COLORS.primary}
                    />
                  </View>
                  {tool.badge && (
                    <Badge variant={badgeVariant}>
                      {tool.badge.text}
                    </Badge>
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

        {recentDoubts.length > 0 ? (
          <View style={styles.recentList}>
            {recentDoubts.map((doubt) => (
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
        ) : (
          <Empty
            icon="chatbubbles-outline"
            title="No Discussions Yet"
            description="Ask any question above or scan a problem to start your first session."
            action={
              <Button
                variant="default"
                size="sm"
                onPress={handleAskAI}
              >
                Start a New Discussion
              </Button>
            }
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.hero,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.xl,
    paddingTop: SPACING.xs,
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
  askDock: {
    padding: SPACING.md,
    marginBottom: SPACING.xxl,
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
    borderRadius: RADII.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
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
    borderRadius: RADII.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  toolIconPrimary: {
    backgroundColor: COLORS.primaryLight,
  },
  toolIconAccent: {
    backgroundColor: COLORS.accentLight,
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
