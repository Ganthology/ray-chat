import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";

interface WebSearchToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  disabled?: boolean;
}

const WebSearchToggle: React.FC<WebSearchToggleProps> = ({
  isEnabled,
  onToggle,
  disabled = false,
}) => {
  const animatedValue = React.useRef(
    new Animated.Value(isEnabled ? 1 : 0)
  ).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isEnabled ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isEnabled]);

  const handleToggle = () => {
    if (!disabled) {
      onToggle(!isEnabled);
    }
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ccc", "#007AFF"],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.toggleContainer, disabled && styles.disabled]}
        onPress={handleToggle}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <View style={styles.toggleContent}>
          <Text style={styles.webIcon}>🌐</Text>
          <View style={styles.toggleWrapper}>
            <Animated.View
              style={[
                styles.toggleTrack,
                { backgroundColor },
                disabled && styles.disabledTrack,
              ]}
            >
              <Animated.View
                style={[
                  styles.toggleThumb,
                  { transform: [{ translateX }] },
                  disabled && styles.disabledThumb,
                ]}
              />
            </Animated.View>
          </View>
        </View>
      </TouchableOpacity>

      <Text style={[styles.label, disabled && styles.disabledLabel]}>
        Web Search
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  toggleContainer: {
    padding: 4,
  },
  disabled: {
    opacity: 0.5,
  },
  toggleContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  webIcon: {
    fontSize: 16,
  },
  toggleWrapper: {
    justifyContent: "center",
  },
  toggleTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    position: "relative",
  },
  disabledTrack: {
    backgroundColor: "#e0e0e0",
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    position: "absolute",
  },
  disabledThumb: {
    backgroundColor: "#f5f5f5",
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

export default WebSearchToggle;
