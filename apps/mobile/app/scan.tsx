import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADII, SHADOWS, TYPOGRAPHY } from "@/constants/theme";

export default function ScanQuestionScreen() {
  const router = useRouter();
  const [hasScannedImage, setHasScannedImage] = useState(true);
  const [extractedOcrText, setExtractedOcrText] = useState(
    "A block of mass m = 2 kg rests on a frictionless plane inclined at θ = 30°. Find the acceleration of the block and the normal force exerted by the plane."
  );

  const handleStartSolving = () => {
    router.push("/(tabs)/chat");
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
        <Text style={styles.headerTitle}>Scan Question</Text>
        <View style={styles.ocrBadge}>
          <Ionicons name="scan" size={13} color={COLORS.primary} />
          <Text style={styles.ocrBadgeText}>OCR Vision</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Scanner Viewport / Image Preview */}
        <View style={styles.scannerCard}>
          <View style={styles.viewportHeader}>
            <Text style={styles.viewportTitle}>Question Image</Text>
            <TouchableOpacity
              style={styles.retakeBtn}
              onPress={() => setHasScannedImage(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="camera-reverse-outline" size={16} color={COLORS.primary} />
              <Text style={styles.retakeBtnText}>Retake</Text>
            </TouchableOpacity>
          </View>

          {/* Scanner Box with Crosshair Corner Accents */}
          <View style={styles.scanBox}>
            <View style={[styles.corner, styles.cornerTopLeft]} />
            <View style={[styles.corner, styles.cornerTopRight]} />
            <View style={[styles.corner, styles.cornerBottomLeft]} />
            <View style={[styles.corner, styles.cornerBottomRight]} />

            <View style={styles.scanContentPlaceholder}>
              <Ionicons name="image-outline" size={48} color={COLORS.primary} />
              <Text style={styles.scanPlaceholderText}>
                Physics Problem Sheet (Mechanics Q4)
              </Text>
              <Text style={styles.scanPlaceholderSub}>
                1080 × 720 • OCR Confidence 98.4%
              </Text>
            </View>
          </View>

          {/* Capture Actions */}
          <View style={styles.scanActionsRow}>
            <TouchableOpacity style={styles.scanActionBtn} activeOpacity={0.7}>
              <Ionicons name="camera" size={18} color={COLORS.textSecondary} />
              <Text style={styles.scanActionBtnText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scanActionBtn} activeOpacity={0.7}>
              <Ionicons name="images" size={18} color={COLORS.textSecondary} />
              <Text style={styles.scanActionBtnText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scanActionBtn} activeOpacity={0.7}>
              <Ionicons name="crop" size={18} color={COLORS.textSecondary} />
              <Text style={styles.scanActionBtnText}>Crop Area</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Extracted OCR Text Card */}
        <View style={styles.ocrCard}>
          <View style={styles.ocrCardHeader}>
            <View style={styles.ocrCardTitleRow}>
              <Ionicons name="text-outline" size={18} color={COLORS.primary} />
              <Text style={styles.ocrCardTitle}>Extracted Text</Text>
            </View>
            <Text style={styles.ocrEditHint}>Editable</Text>
          </View>

          <TextInput
            style={styles.ocrInput}
            value={extractedOcrText}
            onChangeText={setExtractedOcrText}
            multiline
            numberOfLines={4}
          />

          <View style={styles.formulaPreview}>
            <Text style={styles.formulaTag}>Detected Formula</Text>
            <Text style={styles.formulaEquation}>a = g \sin(\theta), \quad N = mg \cos(\theta)</Text>
          </View>
        </View>

        {/* Solve Socratic CTA */}
        <TouchableOpacity
          style={styles.solveBtn}
          onPress={handleStartSolving}
          activeOpacity={0.85}
        >
          <Ionicons name="sparkles" size={18} color={COLORS.textInverse} />
          <Text style={styles.solveBtnText}>Get Explanation & Solution</Text>
        </TouchableOpacity>
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
  ocrBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADII.sm,
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
  },
  ocrBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  scannerCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
    ...SHADOWS.card,
  },
  viewportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  viewportTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  retakeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  retakeBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
  },
  scanBox: {
    height: 200,
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: COLORS.primary,
  },
  cornerTopLeft: {
    top: 10,
    left: 10,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  cornerTopRight: {
    top: 10,
    right: 10,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  cornerBottomLeft: {
    bottom: 10,
    left: 10,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  cornerBottomRight: {
    bottom: 10,
    right: 10,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  scanContentPlaceholder: {
    alignItems: "center",
    gap: SPACING.xs,
  },
  scanPlaceholderText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  scanPlaceholderSub: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  scanActionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  scanActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADII.md,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  scanActionBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  ocrCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xl,
    ...SHADOWS.card,
  },
  ocrCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  ocrCardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  ocrCardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  ocrEditHint: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontStyle: "italic",
  },
  ocrInput: {
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.md,
    padding: SPACING.md,
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  formulaPreview: {
    backgroundColor: COLORS.surfaceSubtle,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    padding: SPACING.sm,
    borderRadius: RADII.sm,
  },
  formulaTag: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.primary,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  formulaEquation: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 13,
    color: COLORS.text,
  },
  solveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: RADII.lg,
    height: 50,
    gap: SPACING.sm,
    ...SHADOWS.primaryBtn,
  },
  solveBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textInverse,
  },
});
