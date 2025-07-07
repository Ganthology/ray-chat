import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React from "react";

export interface ModelOption {
  id: string;
  name: string;
  description: string;
}

interface ModelSelectorProps {
  selectedModel: ModelOption;
  onPress: () => void;
  disabled?: boolean;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onPress,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.selector, disabled && styles.disabled]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.selectedText, disabled && styles.disabledText]}>
          {selectedModel.name}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f8f8",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    minWidth: 120,
  },
  disabled: {
    opacity: 0.5,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    flex: 1,
  },
  disabledText: {
    color: "#999",
  },
  arrow: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
});

export default ModelSelector;
