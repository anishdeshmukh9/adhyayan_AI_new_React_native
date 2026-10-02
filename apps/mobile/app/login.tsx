import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADII, SHADOWS, TYPOGRAPHY } from "@/constants/theme";

const EXAMS = [
  "JEE Advanced",
  "NEET-UG",
  "SAT / GRE",
  "UPSC",
  "University STEM",
];

export default function LoginScreen() {
  const router = useRouter();
  const [selectedExam, setSelectedExam] = useState("JEE Advanced");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo & Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/icon.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.badge}>
              <Ionicons name="sparkles" size={13} color={COLORS.accent} />
              <Text style={styles.badgeText}>Socratic AI Learning</Text>
            </View>
            <Text style={styles.title}>Sign in to Adhyayan AI</Text>
            <Text style={styles.subtitle}>
              Your intelligent AI tutor & doubt resolution workspace.
            </Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            {/* Target Goal Selector */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Target Academic Goal</Text>
              <View style={styles.chipRow}>
                {EXAMS.map((exam) => {
                  const isSelected = selectedExam === exam;
                  return (
                    <TouchableOpacity
                      key={exam}
                      style={[
                        styles.chip,
                        isSelected ? styles.chipActive : styles.chipInactive,
                      ]}
                      onPress={() => setSelectedExam(exam)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isSelected
                            ? styles.chipTextActive
                            : styles.chipTextInactive,
                        ]}
                      >
                        {exam}
                      </Text>
                      {isSelected && (
                        <Ionicons
                          name="checkmark-circle"
                          size={14}
                          color={COLORS.primary}
                          style={styles.chipIcon}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Email Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={COLORS.textMuted}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="student@adhyayan.ai"
                  placeholderTextColor={COLORS.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.inputLabel}>Password</Text>
                <TouchableOpacity activeOpacity={0.6}>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={COLORS.textMuted}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••••••"
                  placeholderTextColor={COLORS.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Primary Action Button */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleLogin}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>Continue to Workspace</Text>
              <Ionicons
                name="arrow-forward"
                size={18}
                color={COLORS.textInverse}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Button */}
            <TouchableOpacity
              style={styles.secondaryButton}
              activeOpacity={0.7}
            >
              <Ionicons
                name="logo-google"
                size={18}
                color={COLORS.text}
                style={styles.socialIcon}
              />
              <Text style={styles.secondaryButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Note */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our Terms of Service & Privacy Policy.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.hero,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.xxl,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: RADII.lg,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.subtle,
  },
  logoImage: {
    width: 44,
    height: 44,
    borderRadius: RADII.sm,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.accentLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 1,
    borderRadius: RADII.full,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    marginBottom: SPACING.md,
    gap: SPACING.xs,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.accent,
  },
  title: {
    ...TYPOGRAPHY.title,
    textAlign: "center",
    marginBottom: SPACING.xs + 2,
  },
  subtitle: {
    ...TYPOGRAPHY.subtitle,
    textAlign: "center",
    maxWidth: 300,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    padding: SPACING.xxl,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionLabel: {
    ...TYPOGRAPHY.label,
    marginBottom: SPACING.sm,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm - 1,
    borderRadius: RADII.md,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryBorder,
  },
  chipInactive: {
    backgroundColor: COLORS.surfaceSubtle,
    borderColor: COLORS.border,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "500",
  },
  chipTextActive: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  chipTextInactive: {
    color: COLORS.textSecondary,
  },
  chipIcon: {
    marginLeft: SPACING.xs,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.xs + 2,
  },
  inputLabel: {
    ...TYPOGRAPHY.label,
    marginBottom: SPACING.xs + 2,
  },
  forgotText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    height: 46,
    color: COLORS.text,
    fontSize: 15,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: RADII.md,
    height: 48,
    marginTop: SPACING.sm,
    ...SHADOWS.primaryBtn,
  },
  primaryButtonText: {
    ...TYPOGRAPHY.button,
  },
  buttonIcon: {
    marginLeft: SPACING.xs,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: SPACING.md,
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.md,
    height: 46,
  },
  socialIcon: {
    marginRight: SPACING.sm,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  footer: {
    marginTop: SPACING.xxl,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: "center",
    maxWidth: 320,
    lineHeight: 18,
  },
});
