import AttachButton, { AttachmentType } from "./AttachButton";
import ModelSelector, { ModelOption } from "./ModelSelector";
import { StyleSheet, View } from "react-native";

import React from "react";
import WebSearchToggle from "./WebSearchToggle";

interface ToolbarProps {
  selectedModel: ModelOption;
  onModelSelectorPress: () => void;
  isWebSearchEnabled: boolean;
  onWebSearchToggle: (enabled: boolean) => void;
  onAttach: (attachmentType: AttachmentType) => void;
  disabled?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  selectedModel,
  onModelSelectorPress,
  isWebSearchEnabled,
  onWebSearchToggle,
  onAttach,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <ModelSelector
          selectedModel={selectedModel}
          onPress={onModelSelectorPress}
          disabled={disabled}
        />
      </View>

      <View style={styles.rightSection}>
        <WebSearchToggle
          isEnabled={isWebSearchEnabled}
          onToggle={onWebSearchToggle}
          disabled={disabled}
        />

        <AttachButton onAttach={onAttach} disabled={disabled} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  leftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});

export default Toolbar;
