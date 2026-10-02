import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, RADII, SHADOWS, TYPOGRAPHY } from "@/constants/theme";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.92)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(progressWidth, {
        toValue: 1,
        duration: 1800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router, logoOpacity, logoScale, progressWidth]);

  const progressBarInterpolate = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          }
        ]}
      >
        <View style={styles.logoBadge}>
          <Image
            source={require("@/assets/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>ADHYAYAN AI</Text>
        <Text style={styles.subtitle}>
          Intelligent Socratic Learning & Doubt Resolution
        </Text>
      </Animated.View>

      <View style={styles.loadingContainer}>
        <View style={styles.progressBarTrack}>
          <Animated.View
            style={[
              styles.progressBarFill,
              { width: progressBarInterpolate },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  content: {
    alignItems: "center",
  },
  logoBadge: {
    width: 76,
    height: 76,
    borderRadius: RADII.xl,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    ...SHADOWS.card,
  },
  logo: {
    width: 52,
    height: 52,
  },
  title: {
    ...TYPOGRAPHY.title,
    letterSpacing: 2,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    ...TYPOGRAPHY.subtitle,
    textAlign: "center",
    maxWidth: 280,
  },
  loadingContainer: {
    position: "absolute",
    bottom: 50,
    width: width * 0.4,
  },
  progressBarTrack: {
    height: 3,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
});
