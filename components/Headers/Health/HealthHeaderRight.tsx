import { View, Text, TouchableNativeFeedback } from "react-native";
import React from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const HealthHeaderRight = () => {
  return (
    <View className="mr-3 rounded-full overflow-hidden">
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#ECDEDE", true)}
        onPress={() => console.log("Notification icon pressed")}
        useForeground // Ensure ripple is in the foreground
      >
        <View className="bg-[#FFE8E8] w-12 h-12 justify-center items-center rounded-full">
          <Ionicons name="ellipsis-vertical" size={20} color="black" />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default HealthHeaderRight;
