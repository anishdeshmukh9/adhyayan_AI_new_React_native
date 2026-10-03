import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADII, SHADOWS } from "@/constants/theme";
import { Card, Badge, Empty, Button } from "@/components/ui";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  formula?: string;
  thinking?: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "Explain Newton's laws of motion",
  "How does photosynthesis work?",
  "Derive quadratic formula",
  "Explain binary search algorithm",
];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsThinking(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate Socratic AI streaming response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `ai-${Date.now() + 1}`,
        sender: "assistant",
        thinking: "Analyzing problem from first principles...",
        text: `To solve "${text.trim()}", let's start with the fundamental equation governing this system. Notice how each variable behaves as boundary conditions change:`,
        formula: "F = m \\cdot a, \\quad W = F \\cdot d",
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsThinking(false);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1200);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top || SPACING.lg }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerAvatar}>
              <Ionicons name="sparkles" size={18} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.headerTitle}>AI Tutor</Text>
              <Text style={styles.headerSubtitle}>Online • Ready to help</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
            <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Message Scroll View */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
        >
          {messages.length > 0 ? (
            messages.map((msg) => {
              const isAI = msg.sender === "assistant";
              return (
                <View
                  key={msg.id}
                  style={[
                    styles.messageWrapper,
                    isAI ? styles.messageWrapperAI : styles.messageWrapperUser,
                  ]}
                >
                  {/* AI Thinking Bubble */}
                  {isAI && msg.thinking && (
                    <View style={styles.thinkingContainer}>
                      <Ionicons name="bulb-outline" size={14} color={COLORS.accent} />
                      <Text style={styles.thinkingText}>{msg.thinking}</Text>
                    </View>
                  )}

                  <View
                    style={[
                      styles.messageBubble,
                      isAI ? styles.messageBubbleAI : styles.messageBubbleUser,
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        isAI ? styles.messageTextAI : styles.messageTextUser,
                      ]}
                    >
                      {msg.text}
                    </Text>

                    {/* Formula View Block */}
                    {msg.formula && (
                      <View style={styles.formulaBlock}>
                        <View style={styles.formulaHeader}>
                          <Ionicons name="calculator-outline" size={14} color={COLORS.primary} />
                          <Text style={styles.formulaLabel}>Key Formula</Text>
                        </View>
                        <Text style={styles.formulaText}>{msg.formula}</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.messageTime}>{msg.timestamp}</Text>
                </View>
              );
            })
          ) : (
            <Empty
              icon="sparkles-outline"
              title="What would you like to study?"
              description="Type any question, equation, or topic below to begin."
              style={styles.emptyContainer}
            />
          )}

          {isThinking && (
            <View style={[styles.messageWrapper, styles.messageWrapperAI]}>
              <View style={styles.thinkingContainer}>
                <Ionicons name="sync-outline" size={14} color={COLORS.primary} />
                <Text style={styles.thinkingText}>AI Tutor is thinking...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Quick Suggestion Chips */}
        <View style={styles.quickPromptsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickPromptsList}>
            {QUICK_PROMPTS.map((prompt) => (
              <TouchableOpacity
                key={prompt}
                style={styles.promptChip}
                onPress={() => handleSend(prompt)}
                activeOpacity={0.7}
              >
                <Text style={styles.promptChipText}>{prompt}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Input Dock */}
        <View style={styles.inputDock}>
          <TouchableOpacity style={styles.attachBtn} activeOpacity={0.7}>
            <Ionicons name="camera-outline" size={22} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder="Type your question or equation..."
            placeholderTextColor={COLORS.textMuted}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />

          <TouchableOpacity
            style={[
              styles.sendBtn,
              inputText.trim() ? styles.sendBtnActive : styles.sendBtnInactive,
            ]}
            onPress={() => handleSend()}
            disabled={!inputText.trim()}
            activeOpacity={0.8}
          >
            <Ionicons
              name="arrow-up"
              size={20}
              color={inputText.trim() ? COLORS.textInverse : COLORS.textMuted}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  headerAvatar: {
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
  headerBtn: {
    padding: SPACING.xs,
  },
  messageList: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    gap: SPACING.lg,
    flexGrow: 1,
  },
  emptyContainer: {
    marginVertical: "auto",
  },
  messageWrapper: {
    maxWidth: "85%",
  },
  messageWrapperAI: {
    alignSelf: "flex-start",
  },
  messageWrapperUser: {
    alignSelf: "flex-end",
  },
  thinkingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.accentLight,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADII.md,
    marginBottom: SPACING.xs,
    gap: SPACING.xs,
  },
  thinkingText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.accent,
  },
  messageBubble: {
    borderRadius: RADII.lg,
    padding: SPACING.lg,
  },
  messageBubbleAI: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.subtle,
  },
  messageBubbleUser: {
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  messageTextAI: {
    color: COLORS.text,
  },
  messageTextUser: {
    color: COLORS.textInverse,
    fontWeight: "500",
  },
  formulaBlock: {
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  formulaHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  formulaLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
    textTransform: "uppercase",
  },
  formulaText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    borderRadius: RADII.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  messageTime: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
    marginHorizontal: 4,
  },
  quickPromptsContainer: {
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.background,
  },
  quickPromptsList: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  promptChip: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADII.full,
  },
  promptChipText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textSecondary,
  },
  inputDock: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  attachBtn: {
    width: 40,
    height: 40,
    borderRadius: RADII.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xl,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    fontSize: 15,
    color: COLORS.text,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: RADII.full,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnActive: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.primaryBtn,
  },
  sendBtnInactive: {
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
