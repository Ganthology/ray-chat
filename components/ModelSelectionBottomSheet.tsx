import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ModelOption } from "./ModelSelector";

interface ModelSelectionBottomSheetProps {
  isVisible: boolean;
  selectedModel: ModelOption;
  models: ModelOption[];
  onModelSelect: (model: ModelOption) => void;
  onClose: () => void;
}

const ModelSelectionBottomSheet: React.FC<ModelSelectionBottomSheetProps> = ({
  isVisible,
  selectedModel,
  models,
  onModelSelect,
  onClose,
}) => {
  // Bottom sheet ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Snap points for bottom sheet
  const snapPoints = useMemo(() => ["40%", "70%"], []);

  // Handle model selection
  const handleModelSelect = useCallback(
    (model: ModelOption) => {
      onModelSelect(model);
      bottomSheetRef.current?.close();
    },
    [onModelSelect]
  );

  // Handle closing bottom sheet
  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  // Backdrop component for bottom sheet
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <View style={[props.style, styles.backdrop]} />
    ),
    []
  );

  // Effect to handle visibility changes
  React.useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={(props) => {
        if (isVisible) {
          return renderBackdrop(props);
        }
        return null;
      }}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.bottomSheetBackground}
      onClose={onClose}
    >
      <BottomSheetView style={styles.bottomSheetContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Model</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <BottomSheetScrollView
          style={styles.modelList}
          showsVerticalScrollIndicator={false}
        >
          {models.map((model) => (
            <TouchableOpacity
              key={model.id}
              style={[
                styles.modelOption,
                selectedModel.id === model.id && styles.selectedOption,
              ]}
              onPress={() => handleModelSelect(model)}
            >
              <Text
                style={[
                  styles.modelName,
                  selectedModel.id === model.id && styles.selectedModelName,
                ]}
              >
                {model.name}
              </Text>
              <Text
                style={[
                  styles.modelDescription,
                  selectedModel.id === model.id &&
                    styles.selectedModelDescription,
                ]}
              >
                {model.description}
              </Text>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheetBackground: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  handleIndicator: {
    backgroundColor: "#e0e0e0",
    width: 40,
    height: 4,
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#666",
  },
  modelList: {
    flex: 1,
  },
  modelOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 4,
  },
  selectedOption: {
    backgroundColor: "#e3f2fd",
  },
  modelName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  selectedModelName: {
    color: "#007AFF",
  },
  modelDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  selectedModelDescription: {
    color: "#0056b3",
  },
});

export default ModelSelectionBottomSheet;
