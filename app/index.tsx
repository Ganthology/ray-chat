import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AttachmentType } from "../components/AttachButton";
import ChatInput from "../components/ChatInput";
import { EmptyResponseBodyError } from "ai";
import MessageBubble from "../components/MessageBubble";
import { ModelOption } from "../components/ModelSelector";
import ModelSelectionBottomSheet from "../components/ModelSelectionBottomSheet";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Toolbar from "../components/Toolbar";
import { fetch as expoFetch } from "expo/fetch";
// Import custom components
import { useChat } from "@ai-sdk/react";

const API_URL = "https://faithful-gelding-vaguely.ngrok-free.app";

// Available models configuration
const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    description: "Most capable model for complex tasks",
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "Faster version of GPT-4 with updated knowledge",
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    description: "Fast and efficient for most conversations",
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    description: "Balanced performance and capability",
  },
  {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    description: "Fastest model for simple tasks",
  },
];

// Main chat component
export default function ChatScreen() {
  // State management for toolbar features
  const [selectedModel, setSelectedModel] = React.useState<ModelOption>(
    AVAILABLE_MODELS[0]
  );
  const [isWebSearchEnabled, setIsWebSearchEnabled] = React.useState(false);
  const [isModelSheetVisible, setIsModelSheetVisible] = React.useState(false);

  const { messages, input, setInput, handleSubmit, isLoading, error } = useChat(
    {
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: `${API_URL}/api/chat`,
      body: {
        model: selectedModel.id,
        webSearch: isWebSearchEnabled,
      },
      onError: (error: Error) => {
        if (EmptyResponseBodyError.isInstance(error)) {
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

  const handleModelSelectorPress = () => {
    setIsModelSheetVisible(true);
  };

  const handleModelSelect = (model: ModelOption) => {
    setSelectedModel(model);
    setIsModelSheetVisible(false);
    Alert.alert("Model Changed", `Switched to ${model.name}`, [{ text: "OK" }]);
  };

  const handleModelSheetClose = () => {
    setIsModelSheetVisible(false);
  };

  const handleWebSearchToggle = (enabled: boolean) => {
    setIsWebSearchEnabled(enabled);
    const status = enabled ? "enabled" : "disabled";
    Alert.alert("Web Search", `Web search ${status}`, [{ text: "OK" }]);
  };

  const handleAttach = (attachmentType: AttachmentType) => {
    // Handle different attachment types
    switch (attachmentType) {
      case AttachmentType.PHOTO:
        Alert.alert("Photo", "Photo library attachment coming soon!", [
          { text: "OK" },
        ]);
        break;
      case AttachmentType.CAMERA:
        Alert.alert("Camera", "Camera capture coming soon!", [{ text: "OK" }]);
        break;
      case AttachmentType.DOCUMENT:
        Alert.alert("Document", "Document attachment coming soon!", [
          { text: "OK" },
        ]);
        break;
      case AttachmentType.AUDIO:
        Alert.alert("Audio", "Audio recording coming soon!", [{ text: "OK" }]);
        break;
      default:
        Alert.alert("Attachment", "Attachment feature coming soon!", [
          { text: "OK" },
        ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ray Chat</Text>
        <Text style={styles.headerSubtitle}>
          {selectedModel.name} •{" "}
          {isWebSearchEnabled ? "Web Search ON" : "Web Search OFF"}
        </Text>
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

      {/* Input area with toolbar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Toolbar */}
        <Toolbar
          selectedModel={selectedModel}
          onModelSelectorPress={handleModelSelectorPress}
          isWebSearchEnabled={isWebSearchEnabled}
          onWebSearchToggle={handleWebSearchToggle}
          onAttach={handleAttach}
        />

        {/* Chat Input */}
        <ChatInput
          input={input}
          handleInputChange={(text) => setInput(text)}
          handleSubmit={onSubmit}
          isLoading={isLoading}
        />
      </KeyboardAvoidingView>

      {/* Model Selection Bottom Sheet - Screen Level */}
      <ModelSelectionBottomSheet
        isVisible={isModelSheetVisible}
        selectedModel={selectedModel}
        models={AVAILABLE_MODELS}
        onModelSelect={handleModelSelect}
        onClose={handleModelSheetClose}
      />
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
});
