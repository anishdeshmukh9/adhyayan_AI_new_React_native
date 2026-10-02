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
import { useRouter } from "expo-router";
import { Eye, EyeOff, Sparkles, Mail, Lock, CheckCircle2 } from "lucide-react-native";
import { COLORS, SHADOWS } from "../constants/theme";

const EXAM_OPTIONS = ["JEE", "NEET", "SAT", "UPSC", "University", "High School"];

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedExam, setSelectedExam] = useState("JEE");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Input Required", "Please enter both your email and password.");
      return;
    }
    setIsSubmitting(true);
    // Simulate login & transition
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert("Success", "Welcome to Adhyayan AI!");
    }, 1200);
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
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.logoBadge}>
            <Image
              source={require("../assets/icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue your personalized AI learning journey.
          </Text>
        </View>

        {/* Auth Glass Card */}
        <View style={styles.card}>
          {/* Target Exam Selector */}
          <Text style={styles.label}>SELECT YOUR GOAL / EXAM</Text>
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
                    <CheckCircle2 size={12} color={COLORS.primary} style={{ marginLeft: 4 }} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Email Input */}
          <Text style={[styles.label, { marginTop: 18 }]}>EMAIL ADDRESS</Text>
          <View style={styles.inputWrapper}>
            <Mail size={18} color={COLORS.textDim} style={styles.inputIcon} />
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
          <Text style={[styles.label, { marginTop: 16 }]}>PASSWORD</Text>
          <View style={styles.inputWrapper}>
            <Lock size={18} color={COLORS.textDim} style={styles.inputIcon} />
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
                <EyeOff size={18} color={COLORS.textDim} />
              ) : (
                <Eye size={18} color={COLORS.textDim} />
              )}
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassBtn}>
            <Text style={styles.forgotPassText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleLogin}
            disabled={isSubmitting}
            style={[styles.signInBtn, isSubmitting && { opacity: 0.7 }]}
          >
            <Sparkles size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.signInBtnText}>
              {isSubmitting ? "Signing In..." : "Sign In to Workspace"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* 1-Tap Google Button */}
          <TouchableOpacity activeOpacity={0.8} style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>Google Account</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signUpText}>Create Account</Text>
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
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.glowPrimary,
    marginBottom: 16
  },
  logo: {
    width: 44,
    height: 44
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: 0.5,
    marginBottom: 6
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: "center",
    maxWidth: 280,
    lineHeight: 20
  },
  card: {
    backgroundColor: COLORS.cardGlass,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 20,
    ...SHADOWS.card
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textDim,
    letterSpacing: 1,
    marginBottom: 8
  },
  examRow: {
    gap: 8,
    paddingVertical: 2
  },
  examPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)"
  },
  examPillActive: {
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    borderColor: COLORS.primary
  },
  examPillText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: "600"
  },
  examPillTextActive: {
    color: COLORS.text,
    fontWeight: "700"
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(3, 7, 18, 0.6)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: 14,
    height: 50
  },
  inputIcon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15
  },
  eyeIcon: {
    padding: 6
  },
  forgotPassBtn: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 18
  },
  forgotPassText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600"
  },
  signInBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 16,
    ...SHADOWS.glowPrimary
  },
  signInBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700"
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.cardBorder
  },
  dividerText: {
    color: COLORS.textDim,
    fontSize: 12,
    paddingHorizontal: 12,
    fontWeight: "500"
  },
  socialBtn: {
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: "center",
    justifyContent: "center"
  },
  socialBtnText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28
  },
  footerText: {
    color: COLORS.textMuted,
    fontSize: 14
  },
  signUpText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700"
  }
});
