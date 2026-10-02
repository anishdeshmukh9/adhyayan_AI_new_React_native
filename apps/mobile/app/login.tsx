import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { Eye, EyeOff, Mail, Lock, CheckCircle2, ArrowRight } from "lucide-react-native";
import { COLORS, SHADOWS } from "../constants/theme";

const EXAM_OPTIONS = ["JEE Advanced", "NEET-UG", "SAT / GRE", "UPSC", "University STEM"];

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedExam, setSelectedExam] = useState("JEE Advanced");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Input Required", "Please enter both your email and password.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert("Success", "Welcome to Adhyayan AI!");
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoBadge}>
            <Image
              source={require("../assets/icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Sign in to Adhyayan AI</Text>
          <Text style={styles.subtitle}>
            Your intelligent AI tutor & doubt resolution workspace.
          </Text>
        </View>

        {/* Auth Card */}
        <View style={styles.card}>
          {/* Target Exam Selector */}
          <Text style={styles.label}>TARGET EXAM / GOAL</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.examRow}
          >
            {EXAM_OPTIONS.map((exam) => {
              const isSelected = selectedExam === exam;
              return (
                <TouchableOpacity
                  key={exam}
                  activeOpacity={0.8}
                  onPress={() => setSelectedExam(exam)}
                  style={[
                    styles.examPill,
                    isSelected && styles.examPillActive
                  ]}
                >
                  <Text
                    style={[
                      styles.examPillText,
                      isSelected && styles.examPillTextActive
                    ]}
                  >
                    {exam}
                  </Text>
                  {isSelected && (
                    <CheckCircle2 size={13} color={COLORS.primary} style={{ marginLeft: 4 }} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Email Input */}
          <Text style={[styles.label, { marginTop: 16 }]}>EMAIL ADDRESS</Text>
          <View style={styles.inputWrapper}>
            <Mail size={16} color={COLORS.textDim} style={styles.inputIcon} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="student@adhyayan.ai"
              placeholderTextColor={COLORS.textDim}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          {/* Password Input */}
          <View style={styles.passwordLabelRow}>
            <Text style={styles.label}>PASSWORD</Text>
            <TouchableOpacity>
              <Text style={styles.forgotPassText}>Forgot?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputWrapper}>
            <Lock size={16} color={COLORS.textDim} style={styles.inputIcon} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••••••"
              placeholderTextColor={COLORS.textDim}
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              {showPassword ? (
                <EyeOff size={16} color={COLORS.textDim} />
              ) : (
                <Eye size={16} color={COLORS.textDim} />
              )}
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleLogin}
            disabled={isSubmitting}
            style={[styles.signInBtn, isSubmitting && { opacity: 0.6 }]}
          >
            <Text style={styles.signInBtnText}>
              {isSubmitting ? "Signing In..." : "Continue to Workspace"}
            </Text>
            <ArrowRight size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Sign In Button */}
          <TouchableOpacity activeOpacity={0.8} style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40
  },
  header: {
    alignItems: "center",
    marginBottom: 24
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  logo: {
    width: 36,
    height: 36
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: -0.3,
    marginBottom: 6
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: "center",
    maxWidth: 260,
    lineHeight: 18
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 20,
    ...SHADOWS.card
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textMuted,
    letterSpacing: 0.8,
    marginBottom: 6
  },
  passwordLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 6
  },
  forgotPassText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "600"
  },
  examRow: {
    gap: 8,
    paddingVertical: 2
  },
  examPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder
  },
  examPillActive: {
    backgroundColor: COLORS.primaryMuted,
    borderColor: COLORS.primary
  },
  examPillText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: "500"
  },
  examPillTextActive: {
    color: COLORS.primary,
    fontWeight: "700"
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: 12,
    height: 44
  },
  inputIcon: {
    marginRight: 8
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14
  },
  eyeIcon: {
    padding: 4
  },
  signInBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    height: 44,
    borderRadius: 10,
    marginTop: 18
  },
  signInBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700"
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.cardBorder
  },
  dividerText: {
    color: COLORS.textDim,
    fontSize: 11,
    paddingHorizontal: 10,
    fontWeight: "500"
  },
  socialBtn: {
    height: 42,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: "center",
    justifyContent: "center"
  },
  socialBtnText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "600"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24
  },
  footerText: {
    color: COLORS.textMuted,
    fontSize: 13
  },
  signUpText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "700"
  }
});
