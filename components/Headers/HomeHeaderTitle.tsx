import { View, Text } from "react-native";
import React from "react";
import Avatar from "../Avatar";

const HomeHeaderTitle = () => {
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

export default HomeHeaderTitle;
