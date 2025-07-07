import { StyleSheet, Text, View } from "react-native";

import React from "react";

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser }) => (
  <View
    style={[
      styles.messageBubble,
      isUser ? styles.userMessage : styles.aiMessage,
    ]}
  >
    <Text
      style={[
        styles.messageText,
        isUser ? styles.userMessageText : styles.aiMessageText,
      ]}
    >
      {message}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: "80%",
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userMessage: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
    borderBottomRightRadius: 8,
  },
  aiMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: "#fff",
  },
  aiMessageText: {
    color: "#333",
  },
});

export default MessageBubble;
