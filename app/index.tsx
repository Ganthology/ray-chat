import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { EmptyResponseBodyError } from "ai";
import { StatusBar } from "expo-status-bar";
import { fetch as expoFetch } from "expo/fetch";
import { useChat } from "@ai-sdk/react";

// Message component for clean separation of concerns
const MessageBubble = ({
  message,
  isUser,
}: {
  message: string;
  isUser: boolean;
}) => (
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

// Chat input component
const ChatInput = ({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: {
  input: string;
  handleInputChange: (text: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.textInput}
      value={input}
      onChangeText={handleInputChange}
      placeholder="Type your message..."
      placeholderTextColor="#999"
      multiline
      maxLength={1000}
      editable={!isLoading}
    />
    <TouchableOpacity
      style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
      onPress={handleSubmit}
      disabled={!input.trim() || isLoading}
    >
      <Text style={styles.sendButtonText}>{isLoading ? "..." : "Send"}</Text>
    </TouchableOpacity>
  </View>
);

const API_URL = "https://faithful-gelding-vaguely.ngrok-free.app";

// Main chat component
export default function ChatScreen() {
  const { messages, input, setInput, handleSubmit, isLoading, error } = useChat(
    {
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: `${API_URL}/api/chat`,
      onError: (error: Error) => {
        if (EmptyResponseBodyError.isInstance(error)) {
          // Handle the error
          Alert.alert("Error", "Empty response body");
          console.log("EmptyResponseBodyError");
          return;
        }
        Alert.alert("Error", "Failed to send message. Please try again.");
        console.error("Chat error:", error);
      },
    }
  );

  const renderMessage = ({ item, index }: { item: any; index: number }) => (
    <MessageBubble
      key={index}
      message={item.content}
      isUser={item.role === "user"}
    />
  );

  const onSubmit = () => {
    if (input.trim()) {
      handleSubmit();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ray Chat</Text>
        <Text style={styles.headerSubtitle}>AI Assistant</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        inverted={false}
      />

      {/* Loading indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>AI is thinking...</Text>
        </View>
      )}

      {/* Input area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ChatInput
          input={input}
          handleInputChange={(text) => setInput(text)}
          handleSubmit={onSubmit}
          isLoading={isLoading}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContainer: {
    paddingVertical: 16,
  },
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
  loadingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: "#f8f8f8",
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#ccc",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
