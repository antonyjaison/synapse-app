import React, { ReactElement } from "react";
import { View, TouchableNativeFeedback, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type HazardButtonProps = {
  icon: ReactElement;
  onPress: () => void;
  color: string;
};

const HazardButton = ({ icon, onPress, color }: HazardButtonProps) => {
  const ripple = TouchableNativeFeedback.Ripple("#FFFFFF70", true);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <TouchableNativeFeedback
        onPress={onPress}
        useForeground
        background={ripple}
      >
        <View style={styles.iconContainer}>{icon}</View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    right: 16,
    borderRadius: 12,
    width: 60, // Match the icon size
    height: 60, // Match the icon size
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  iconContainer: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HazardButton;
