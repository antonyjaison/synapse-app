import React from "react";
import { View, TouchableNativeFeedback } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

const HomeHeaderRight = () => {
  const router = useRouter();
  return (
    <View className=" relative">
      <View className="bg-[#FFE8E8] rounded-full mr-3 overflow-hidden">
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#ECDEDE", true)}
          onPress={() => router.push("/notification/unread")}
          useForeground
        >
          <View
            className="w-12 h-12 justify-center items-center"
            accessible
            accessibilityRole="button"
          >
            <FontAwesome name="bell-o" size={20} color="black" />
          </View>
        </TouchableNativeFeedback>
      </View>
      <View className="w-3 h-3 bg-[#F19483] absolute right-[10px] rounded-full" />
    </View>
  );
};

export default HomeHeaderRight;
