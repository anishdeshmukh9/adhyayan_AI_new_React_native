import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADII, SHADOWS, TYPOGRAPHY } from "@/constants/theme";

export default function LoginScreen() {
  const router = useRouter();

  const handleOAuthSignIn = (provider: "google" | "github") => {
    // Navigate to home after sign in
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo & Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/icon.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Adhyayan AI</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        {/* Auth Actions Card */}
        <View style={styles.card}>
          {/* Google Sign In */}
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => handleOAuthSignIn("google")}
            activeOpacity={0.8}
          >
            <Ionicons
              name="logo-google"
              size={20}
              color={COLORS.text}
              style={styles.buttonIcon}
            />
            <Text style={styles.authButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* GitHub Sign In */}
          <TouchableOpacity
            style={[styles.authButton, styles.githubButton]}
            onPress={() => handleOAuthSignIn("github")}
            activeOpacity={0.8}
          >
            <Ionicons
              name="logo-github"
              size={20}
              color={COLORS.text}
              style={styles.buttonIcon}
            />
            <Text style={styles.authButtonText}>Continue with GitHub</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xxl,
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.hero,
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: RADII.xl,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.subtle,
  },
  logoImage: {
    width: 48,
    height: 48,
  },
  title: {
    ...TYPOGRAPHY.title,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.subtitle,
    textAlign: "center",
  },
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    padding: SPACING.xxl,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
    ...SHADOWS.card,
  },
  authButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.md,
    height: 48,
    paddingHorizontal: SPACING.lg,
  },
  githubButton: {
    marginTop: SPACING.xs,
  },
  buttonIcon: {
    marginRight: SPACING.md,
  },
  authButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },
  footer: {
    marginTop: SPACING.hero,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: "center",
    maxWidth: 280,
    lineHeight: 18,
  },
});
