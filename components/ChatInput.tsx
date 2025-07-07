import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";

interface ChatInputProps {
  input: string;
  handleInputChange: (text: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
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

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
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

export default ChatInput;
