import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADII, SHADOWS, TYPOGRAPHY } from "@/constants/theme";

interface KeyMoment {
  id: string;
  time: string;
  title: string;
  summary: string;
}

const SAMPLE_MOMENTS: KeyMoment[] = [
  {
    id: "1",
    time: "02:15",
    title: "Introduction to Wave-Particle Duality",
    summary: "Historical experiments by Young and de Broglie.",
  },
  {
    id: "2",
    time: "08:40",
    title: "Double-slit experiment setup",
    summary: "Interference patterns and probability wave functions.",
  },
  {
    id: "3",
    time: "17:20",
    title: "Mathematical derivation of de Broglie wavelength",
    summary: "Relating momentum p to wavelength lambda: lambda = h / p.",
  },
];

export default function YouTubeLearningScreen() {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState("https://youtube.com/watch?v=quantum-mechanics-intro");
  const [activeTab, setActiveTab] = useState<"moments" | "notes" | "qa">("moments");

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Video Learning</Text>
        <View style={styles.videoBadge}>
          <Ionicons name="logo-youtube" size={14} color="#EF4444" />
          <Text style={styles.videoBadgeText}>AI Notes</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* URL Input Bar */}
        <View style={styles.urlCard}>
          <View style={styles.urlInputContainer}>
            <Ionicons name="link-outline" size={18} color={COLORS.textMuted} />
            <TextInput
              style={styles.urlInput}
              placeholder="Paste YouTube lecture URL..."
              placeholderTextColor={COLORS.textMuted}
              value={videoUrl}
              onChangeText={setVideoUrl}
            />
          </View>
          <TouchableOpacity style={styles.analyzeBtn} activeOpacity={0.8}>
            <Ionicons name="sparkles" size={16} color={COLORS.textInverse} />
            <Text style={styles.analyzeBtnText}>Analyze</Text>
          </TouchableOpacity>
        </View>

        {/* Video Player Box */}
        <View style={styles.playerBox}>
          <Ionicons name="play-circle" size={56} color={COLORS.primary} />
          <Text style={styles.playerTitle}>MIT 8.04: Quantum Physics I - Lecture 1</Text>
          <Text style={styles.playerMeta}>Prof. Barton Zwiebach • 48:22 Duration</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "moments" && styles.tabBtnActive]}
            onPress={() => setActiveTab("moments")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabBtnText,
                activeTab === "moments" && styles.tabBtnTextActive,
              ]}
            >
              Key Moments
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "notes" && styles.tabBtnActive]}
            onPress={() => setActiveTab("notes")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabBtnText,
                activeTab === "notes" && styles.tabBtnTextActive,
              ]}
            >
              Summary Notes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "qa" && styles.tabBtnActive]}
            onPress={() => setActiveTab("qa")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabBtnText,
                activeTab === "qa" && styles.tabBtnTextActive,
              ]}
            >
              Ask Video
            </Text>
          </TouchableOpacity>
        </View>

        {/* Key Moments List */}
        {activeTab === "moments" && (
          <View style={styles.momentsList}>
            {SAMPLE_MOMENTS.map((moment) => (
              <TouchableOpacity
                key={moment.id}
                style={styles.momentItem}
                activeOpacity={0.7}
              >
                <View style={styles.timeTag}>
                  <Ionicons name="time-outline" size={12} color={COLORS.primary} />
                  <Text style={styles.timeTagText}>{moment.time}</Text>
                </View>
                <View style={styles.momentContent}>
                  <Text style={styles.momentTitle}>{moment.title}</Text>
                  <Text style={styles.momentSummary}>{moment.summary}</Text>
                </View>
                <Ionicons name="play" size={16} color={COLORS.textMuted} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Summary Notes View */}
        {activeTab === "notes" && (
          <View style={styles.notesCard}>
            <Text style={styles.notesTitle}>Core Lecture Takeaways</Text>
            <View style={styles.notePoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.noteText}>
                Light exhibits both wave-like (interference) and particle-like (photoelectric effect) properties.
              </Text>
            </View>
            <View style={styles.notePoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.noteText}>
                Matter waves with wavelength lambda = h / p apply to all particles, observable primarily at subatomic scale.
              </Text>
            </View>
          </View>
        )}

        {/* Ask Video View */}
        {activeTab === "qa" && (
          <View style={styles.qaCard}>
            <Text style={styles.qaPromptText}>
              Ask any question about this lecture:
            </Text>
            <TextInput
              style={styles.qaInput}
              placeholder="e.g. What experiment proved wave duality?"
              placeholderTextColor={COLORS.textMuted}
            />
            <TouchableOpacity
              style={styles.qaSubmitBtn}
              onPress={() => router.push("/(tabs)/chat")}
              activeOpacity={0.8}
            >
              <Text style={styles.qaSubmitBtnText}>Ask AI Tutor</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
  },
  videoBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceSubtle,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADII.sm,
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  videoBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.text,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  urlCard: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  urlInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.md,
    paddingHorizontal: SPACING.md,
    height: 44,
    gap: SPACING.xs,
  },
  urlInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.text,
  },
  analyzeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADII.md,
    gap: SPACING.xs,
    ...SHADOWS.primaryBtn,
  },
  analyzeBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textInverse,
  },
  playerBox: {
    height: 180,
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
    ...SHADOWS.card,
  },
  playerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: SPACING.sm,
    textAlign: "center",
  },
  playerMeta: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  tabRow: {
    flexDirection: "row",
    backgroundColor: COLORS.surfaceSubtle,
    padding: 3,
    borderRadius: RADII.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: "center",
    borderRadius: RADII.md,
  },
  tabBtnActive: {
    backgroundColor: COLORS.surface,
    ...SHADOWS.subtle,
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.textSecondary,
  },
  tabBtnTextActive: {
    fontWeight: "700",
    color: COLORS.primary,
  },
  momentsList: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    ...SHADOWS.card,
  },
  momentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: SPACING.md,
  },
  timeTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADII.sm,
    gap: 2,
  },
  timeTagText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
  },
  momentContent: {
    flex: 1,
  },
  momentTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 2,
  },
  momentSummary: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  notesCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  notesTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  notePoint: {
    flexDirection: "row",
    marginBottom: SPACING.sm,
    gap: SPACING.xs,
  },
  bullet: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
  qaCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  qaPromptText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  qaInput: {
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.md,
    paddingHorizontal: SPACING.md,
    height: 44,
    fontSize: 14,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  qaSubmitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADII.md,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.primaryBtn,
  },
  qaSubmitBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textInverse,
  },
});
