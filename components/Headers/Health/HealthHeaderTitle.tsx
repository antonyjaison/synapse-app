import { View, Text, Image } from "react-native";
import React from "react";
import Avatar from "@/components/Avatar";

const HealthHeaderTitle = () => {
  return (
    <View className="flex-row">
      <Avatar />
      <View className=" ml-3">
        <Text className="font-medium text-base">Good Morning</Text>
        <Text className=" text-xs">Sarah</Text>
      </View>
    </View>
  );
};

export default HealthHeaderTitle;
