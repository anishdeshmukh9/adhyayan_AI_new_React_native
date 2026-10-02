import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  Easing
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SHADOWS } from "../constants/theme";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  // Animation values
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const haloGlow = useRef(new Animated.Value(0.4)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Entrance animation
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        delay: 400,
        useNativeDriver: true
      }),
      Animated.timing(progressWidth, {
        toValue: 1,
        duration: 2200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false
      })
    ]).start();

    // 2. Halo breathing loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(haloGlow, {
          toValue: 0.9,
          duration: 1200,
          useNativeDriver: true
        }),
        Animated.timing(haloGlow, {
          toValue: 0.4,
          duration: 1200,
          useNativeDriver: true
        })
      ])
    ).start();

    // 3. Navigate to Login after 2.6 seconds
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2600);

    return () => clearTimeout(timer);
  }, [router, logoScale, logoOpacity, textOpacity, haloGlow, progressWidth]);

  const progressBarInterpolate = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"]
  });

  return (
    <View style={styles.container}>
      {/* Background radial halo glow */}
      <Animated.View
        style={[
          styles.glowHalo,
          {
            opacity: haloGlow,
            transform: [{ scale: logoScale }]
          }
        ]}
      />

      {/* Center Logo with Breathing Animation */}
      <Animated.View
        style={[
          styles.logoWrapper,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }]
          }
        ]}
      >
        <Image
          source={require("../assets/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Brand Title & Tagline */}
      <Animated.View style={[styles.textWrapper, { opacity: textOpacity }]}>
        <Text style={styles.brandName}>ADHYAYAN AI</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>INTELLIGENT LEARNING</Text>
        </View>
        <Text style={styles.tagline}>
          Think deeper. Understand faster. Master anything.
        </Text>
      </Animated.View>

      {/* Sleek Bottom Loading Bar */}
      <View style={styles.loadingContainer}>
        <View style={styles.progressBarTrack}>
          <Animated.View
            style={[
              styles.progressBarFill,
              { width: progressBarInterpolate }
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
    paddingHorizontal: 24
  },
  glowHalo: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: COLORS.primaryGlow
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 28,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.glowPrimary,
    marginBottom: 28
  },
  logo: {
    width: 80,
    height: 80
  },
  textWrapper: {
    alignItems: "center"
  },
  brandName: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.text,
    letterSpacing: 4,
    marginBottom: 10
  },
  badge: {
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    borderColor: "rgba(139, 92, 246, 0.4)",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5
  },
  tagline: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: "center",
    maxWidth: 260,
    lineHeight: 20
  },
  loadingContainer: {
    position: "absolute",
    bottom: 50,
    width: width * 0.5
  },
  progressBarTrack: {
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 2,
    overflow: "hidden"
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 2
  }
});
