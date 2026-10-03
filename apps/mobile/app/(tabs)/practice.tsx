import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADII, SHADOWS, TYPOGRAPHY } from "@/constants/theme";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SAMPLE_QUIZ: Question[] = [
  {
    id: 1,
    question: "What is the SI unit of electric flux?",
    options: [
      "Volt · meter (V·m)",
      "Newton / Coulomb (N/C)",
      "Tesla · meter (T·m)",
      "Joule · second (J·s)",
    ],
    correctIndex: 0,
    explanation: "Electric flux Phi = E · A = (V/m) · m² = V·m.",
  },
  {
    id: 2,
    question: "If net work done on a particle is positive, its kinetic energy:",
    options: ["Decreases", "Increases", "Remains constant", "Becomes zero"],
    correctIndex: 1,
    explanation: "By the Work-Energy Theorem, W_net = Delta K. If W_net > 0, kinetic energy increases.",
  },
];

export default function PracticeScreen() {
  const [selectedSubject, setSelectedSubject] = useState("Physics");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Medium");
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subjects = ["Physics", "Chemistry", "Mathematics", "Biology"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const handleStartTest = () => {
    setIsTestActive(true);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsSubmitted(false);
  };

  const handleNextQuestion = () => {
    const currentQ = SAMPLE_QUIZ[currentQIndex];
    if (currentQ && selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }

    if (currentQIndex + 1 < SAMPLE_QUIZ.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Ionicons name="layers" size={20} color={COLORS.primary} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Practice Tests</Text>
            <Text style={styles.headerSubtitle}>Adaptive quizzes & topic mastery</Text>
          </View>
        </View>

        <View style={styles.badge}>
          <Ionicons name="trophy" size={13} color={COLORS.accent} />
          <Text style={styles.badgeText}>Rank #12</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!isTestActive ? (
          <>
            {/* Test Config Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Generate Custom Practice Test</Text>
              <Text style={styles.cardSubtitle}>
                Select subject and difficulty to start an adaptive session.
              </Text>

              {/* Subject Selector */}
              <Text style={styles.label}>Select Subject</Text>
              <View style={styles.chipRow}>
                {subjects.map((sub) => {
                  const isSel = selectedSubject === sub;
                  return (
                    <TouchableOpacity
                      key={sub}
                      style={[styles.chip, isSel && styles.chipActive]}
                      onPress={() => setSelectedSubject(sub)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.chipText, isSel && styles.chipTextActive]}>
                        {sub}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Difficulty Selector */}
              <Text style={styles.label}>Difficulty Level</Text>
              <View style={styles.chipRow}>
                {difficulties.map((diff) => {
                  const isSel = selectedDifficulty === diff;
                  return (
                    <TouchableOpacity
                      key={diff}
                      style={[styles.chip, isSel && styles.chipActive]}
                      onPress={() => setSelectedDifficulty(diff)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.chipText, isSel && styles.chipTextActive]}>
                        {diff}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity
                style={styles.startBtn}
                onPress={handleStartTest}
                activeOpacity={0.85}
              >
                <Ionicons name="play" size={18} color={COLORS.textInverse} />
                <Text style={styles.startBtnText}>Start 5-Question Quiz</Text>
              </TouchableOpacity>
            </View>

            {/* Performance Stats */}
            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>Recent Practice Summary</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>86%</Text>
                  <Text style={styles.statLabel}>Avg Accuracy</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>24</Text>
                  <Text style={styles.statLabel}>Tests Solved</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>18m</Text>
                  <Text style={styles.statLabel}>Avg Speed</Text>
                </View>
              </View>
            </View>
          </>
        ) : !isSubmitted ? (
          /* Active Test Session */
          <View style={styles.card}>
            <View style={styles.testHeader}>
              <Text style={styles.testProgress}>
                Question {currentQIndex + 1} of {SAMPLE_QUIZ.length}
              </Text>
              <TouchableOpacity
                onPress={() => setIsTestActive(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.quitText}>Quit Test</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.questionText}>
              {SAMPLE_QUIZ[currentQIndex]?.question}
            </Text>

            {/* Options */}
            <View style={styles.optionsList}>
              {SAMPLE_QUIZ[currentQIndex]?.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.optionItem,
                      isSelected && styles.optionItemActive,
                    ]}
                    onPress={() => setSelectedOption(idx)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.optionCircle,
                        isSelected && styles.optionCircleActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionCircleText,
                          isSelected && styles.optionCircleTextActive,
                        ]}
                      >
                        {String.fromCharCode(65 + idx)}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextActive,
                      ]}
                    >
                      {opt}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={[
                styles.startBtn,
                selectedOption === null && styles.startBtnDisabled,
              ]}
              onPress={handleNextQuestion}
              disabled={selectedOption === null}
              activeOpacity={0.85}
            >
              <Text style={styles.startBtnText}>
                {currentQIndex + 1 < SAMPLE_QUIZ.length ? "Next Question" : "Submit Test"}
              </Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.textInverse} />
            </TouchableOpacity>
          </View>
        ) : (
          /* Result Summary */
          <View style={styles.card}>
            <View style={styles.resultHeader}>
              <Ionicons name="checkmark-circle" size={56} color={COLORS.success} />
              <Text style={styles.resultTitle}>Test Completed!</Text>
              <Text style={styles.resultScore}>
                Your Score: {score} / {SAMPLE_QUIZ.length}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.startBtn}
              onPress={() => setIsTestActive(false)}
              activeOpacity={0.85}
            >
              <Text style={styles.startBtnText}>Practice Another Topic</Text>
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: RADII.md,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
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
    gap: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    padding: SPACING.xxl,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  label: {
    ...TYPOGRAPHY.label,
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADII.md,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryBorder,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.textSecondary,
  },
  chipTextActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: RADII.lg,
    height: 48,
    gap: SPACING.xs,
    marginTop: SPACING.md,
    ...SHADOWS.primaryBtn,
  },
  startBtnDisabled: {
    opacity: 0.5,
  },
  startBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textInverse,
  },
  statsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.subtle,
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  testHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  testProgress: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primary,
  },
  quitText: {
    fontSize: 13,
    color: COLORS.error,
    fontWeight: "600",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    lineHeight: 23,
    marginBottom: SPACING.xl,
  },
  optionsList: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.lg,
    padding: SPACING.md,
    gap: SPACING.md,
  },
  optionItemActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryBorder,
  },
  optionCircle: {
    width: 28,
    height: 28,
    borderRadius: RADII.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  optionCircleActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionCircleText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
  optionCircleTextActive: {
    color: COLORS.textInverse,
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  optionTextActive: {
    fontWeight: "600",
    color: COLORS.primary,
  },
  resultHeader: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
    gap: SPACING.xs,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: SPACING.sm,
  },
  resultScore: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
});
