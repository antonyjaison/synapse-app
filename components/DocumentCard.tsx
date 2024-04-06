import { View, Text } from "react-native";
import React from "react";
import { TouchableNativeFeedback } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const DocumentCard = () => {
  return (
    <View className=" w-32 h-32 bg-[#eee] rounded-2xl overflow-hidden mt-6">
      <TouchableNativeFeedback
        useForeground
        onPress={() => console.log("pressed card")}
      >
        <View className="w-32 h-32 items-center justify-center">
          <FontAwesome name="file-o" size={30} />
          <Text className="text-sm w-20 text-center mt-2">
            Health Insurance
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default DocumentCard;
