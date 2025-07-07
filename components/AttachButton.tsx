import {
  ActionSheetIOS,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";

interface AttachButtonProps {
  onAttach: (attachmentType: AttachmentType) => void;
  disabled?: boolean;
}

export enum AttachmentType {
  PHOTO = "photo",
  CAMERA = "camera",
  DOCUMENT = "document",
  AUDIO = "audio",
}

const AttachButton: React.FC<AttachButtonProps> = ({
  onAttach,
  disabled = false,
}) => {
  const handleAttachPress = () => {
    if (disabled) return;

    const options = [
      { text: "Photo Library", type: AttachmentType.PHOTO },
      { text: "Camera", type: AttachmentType.CAMERA },
      { text: "Document", type: AttachmentType.DOCUMENT },
      { text: "Audio", type: AttachmentType.AUDIO },
    ];

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...options.map((opt) => opt.text), "Cancel"],
          cancelButtonIndex: options.length,
          title: "Attach File",
        },
        (buttonIndex) => {
          if (buttonIndex < options.length) {
            onAttach(options[buttonIndex].type);
          }
        }
      );
    } else {
      // Android - show simple alert for now
      Alert.alert("Attach File", "Choose attachment type:", [
        ...options.map((opt) => ({
          text: opt.text,
          onPress: () => onAttach(opt.type),
        })),
        { text: "Cancel", style: "cancel" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.attachButton, disabled && styles.disabled]}
        onPress={handleAttachPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={[styles.attachIcon, disabled && styles.disabledIcon]}>
          📎
        </Text>
      </TouchableOpacity>

      <Text style={[styles.label, disabled && styles.disabledLabel]}>
        Attach
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  disabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  attachIcon: {
    fontSize: 18,
    transform: [{ rotate: "45deg" }],
  },
  disabledIcon: {
    opacity: 0.5,
  },
  label: {
    fontSize: 11,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  disabledLabel: {
    color: "#999",
  },
});

export default AttachButton;
