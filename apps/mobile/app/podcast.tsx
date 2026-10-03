import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADII, SHADOWS, TYPOGRAPHY } from "@/constants/theme";

interface PodcastEpisode {
  id: string;
  title: string;
  subject: string;
  duration: string;
  description: string;
  isPlaying?: boolean;
}

const SAMPLE_EPISODES: PodcastEpisode[] = [
  {
    id: "1",
    title: "Thermodynamics in 15 Minutes",
    subject: "Physics",
    duration: "14:20",
    description: "First and second laws, entropy intuition, and Carnot cycle breakdown.",
    isPlaying: true,
  },
  {
    id: "2",
    title: "Organic Chemistry Reaction Mechanisms",
    subject: "Chemistry",
    duration: "18:45",
    description: "Nucleophilic substitution (SN1 vs SN2) and elimination rules.",
  },
  {
    id: "3",
    title: "Calculus: Intuition behind Taylor Series",
    subject: "Mathematics",
    duration: "12:10",
    description: "Polynomial approximation, convergence intervals, and Euler's formula.",
  },
];

export default function PodcastScreen() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState("1.0x");
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode>(SAMPLE_EPISODES[0]);

  const speeds = ["1.0x", "1.25x", "1.5x", "2.0x"];

  const cycleSpeed = () => {
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

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
        <Text style={styles.headerTitle}>Study Podcasts</Text>
        <View style={styles.badge}>
          <Ionicons name="headset" size={13} color={COLORS.accent} />
          <Text style={styles.badgeText}>Audio Recaps</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Active Player Card */}
        <View style={styles.playerCard}>
          <View style={styles.nowPlayingRow}>
            <View style={styles.nowPlayingDot} />
            <Text style={styles.nowPlayingLabel}>NOW PLAYING</Text>
          </View>

          <Text style={styles.trackTitle}>{activeEpisode.title}</Text>
          <Text style={styles.trackSubject}>{activeEpisode.subject} • Chapter Summary</Text>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: "42%" }]} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>06:05</Text>
              <Text style={styles.timeText}>{activeEpisode.duration}</Text>
            </View>
          </View>

          {/* Audio Controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity style={styles.speedBtn} onPress={cycleSpeed} activeOpacity={0.7}>
              <Text style={styles.speedBtnText}>{playbackSpeed}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.seekBtn} activeOpacity={0.7}>
              <Ionicons name="play-back" size={22} color={COLORS.text} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.playPauseBtn}
              onPress={() => setIsPlaying(!isPlaying)}
              activeOpacity={0.85}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={26}
                color={COLORS.textInverse}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.seekBtn} activeOpacity={0.7}>
              <Ionicons name="play-forward" size={22} color={COLORS.text} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.seekBtn} activeOpacity={0.7}>
              <Ionicons name="bookmark-outline" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Episodes List */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Audio Summaries</Text>
          <Text style={styles.sectionSubtitle}>Select a topic to start listening</Text>
        </View>

        <View style={styles.episodesList}>
          {SAMPLE_EPISODES.map((ep) => {
            const isSelected = activeEpisode.id === ep.id;
            return (
              <TouchableOpacity
                key={ep.id}
                style={[
                  styles.episodeCard,
                  isSelected && styles.episodeCardActive,
                ]}
                onPress={() => setActiveEpisode(ep)}
                activeOpacity={0.75}
              >
                <View style={styles.epIconContainer}>
                  <Ionicons
                    name={isSelected && isPlaying ? "volume-high" : "headset-outline"}
                    size={20}
                    color={isSelected ? COLORS.accent : COLORS.primary}
                  />
                </View>

                <View style={styles.epContent}>
                  <View style={styles.epHeader}>
                    <Text style={styles.epSubject}>{ep.subject}</Text>
                    <Text style={styles.epDuration}>{ep.duration}</Text>
                  </View>
                  <Text style={styles.epTitle}>{ep.title}</Text>
                  <Text style={styles.epDescription} numberOfLines={2}>
                    {ep.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
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
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.accentLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADII.sm,
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.accent,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  playerCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    padding: SPACING.xxl,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xxl,
    ...SHADOWS.card,
  },
  nowPlayingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: SPACING.sm,
  },
  nowPlayingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },
  nowPlayingLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.accent,
    letterSpacing: 0.8,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  trackSubject: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  progressContainer: {
    marginBottom: SPACING.lg,
  },
  progressBarTrack: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: SPACING.xs,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.accent,
    borderRadius: 2,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: SPACING.sm,
  },
  speedBtn: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADII.sm,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  speedBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
  seekBtn: {
    padding: SPACING.xs,
  },
  playPauseBtn: {
    width: 52,
    height: 52,
    borderRadius: RADII.full,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.primaryBtn,
  },
  sectionHeader: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  episodesList: {
    gap: SPACING.md,
  },
  episodeCard: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
    ...SHADOWS.subtle,
  },
  episodeCardActive: {
    borderColor: COLORS.accentBorder,
    backgroundColor: COLORS.accentLight,
  },
  epIconContainer: {
    width: 44,
    height: 44,
    borderRadius: RADII.lg,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: "center",
    justifyContent: "center",
  },
  epContent: {
    flex: 1,
  },
  epHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  epSubject: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
    textTransform: "uppercase",
  },
  epDuration: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  epTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  epDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 17,
  },
});
