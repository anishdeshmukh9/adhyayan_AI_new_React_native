import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, RADII, SHADOWS, TYPOGRAPHY } from "@/constants/theme";

interface DocumentMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  pageRef?: number;
  quote?: string;
  timestamp: string;
}

const SAMPLE_DOC_MESSAGES: DocumentMessage[] = [
  {
    id: "1",
    sender: "assistant",
    text: "I have processed 'Halliday_Resnick_Physics_Ch4.pdf' (42 pages). You can ask any question about the concepts, derivations, or practice problems in this document.",
    timestamp: "11:00 AM",
  },
  {
    id: "2",
    sender: "user",
    text: "What does the text say about work done by a variable force?",
    timestamp: "11:02 AM",
  },
  {
    id: "3",
    sender: "assistant",
    text: "According to Chapter 4, work done by a variable force is defined as the definite integral of force with respect to displacement.",
    pageRef: 14,
    quote: "W = \\int_{x_i}^{x_f} F(x) \\, dx",
    timestamp: "11:02 AM",
  },
];

export default function PdfChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<DocumentMessage[]>(SAMPLE_DOC_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [docName, setDocName] = useState("Physics_Mechanics_Ch4.pdf");

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: DocumentMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: inputText.trim(),
      timestamp: "Just now",
    };

    const aiMsg: DocumentMessage = {
      id: `ai-${Date.now() + 1}`,
      sender: "assistant",
      text: `Based on page 22 of ${docName}, the author explains that momentum conservation holds whenever net external force is zero.`,
      pageRef: 22,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInputText("");
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
        <View style={styles.docHeaderCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {docName}
          </Text>
          <Text style={styles.headerSubtitle}>42 Pages • Uploaded</Text>
        </View>
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
          <Ionicons name="document-attach-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => {
          const isAI = msg.sender === "assistant";
          return (
            <View
              key={msg.id}
              style={[
                styles.messageWrapper,
                isAI ? styles.messageWrapperAI : styles.messageWrapperUser,
              ]}
            >
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

                {/* Page Citation Reference */}
                {msg.pageRef && (
                  <View style={styles.citationBox}>
                    <View style={styles.citationTag}>
                      <Ionicons name="bookmark" size={12} color={COLORS.primary} />
                      <Text style={styles.citationTagText}>Page {msg.pageRef}</Text>
                    </View>
                    {msg.quote && (
                      <Text style={styles.citationQuote}>{msg.quote}</Text>
                    )}
                  </View>
                )}
              </View>
              <Text style={styles.messageTime}>{msg.timestamp}</Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Input Dock */}
      <View style={styles.inputDock}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask a question about this document..."
          placeholderTextColor={COLORS.textMuted}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity
          style={[
            styles.sendBtn,
            inputText.trim() ? styles.sendBtnActive : styles.sendBtnInactive,
          ]}
          onPress={handleSend}
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
  docHeaderCenter: {
    flex: 1,
    marginHorizontal: SPACING.md,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  actionBtn: {
    padding: SPACING.xs,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    gap: SPACING.lg,
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
  },
  messageText: {
    fontSize: 14,
    lineHeight: 21,
  },
  messageTextAI: {
    color: COLORS.text,
  },
  messageTextUser: {
    color: COLORS.textInverse,
    fontWeight: "500",
  },
  citationBox: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.sm,
  },
  citationTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  citationTagText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
  },
  citationQuote: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 13,
    color: COLORS.text,
  },
  messageTime: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
    marginHorizontal: 4,
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
  textInput: {
    flex: 1,
    height: 44,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.xl,
    paddingHorizontal: SPACING.lg,
    fontSize: 14,
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
