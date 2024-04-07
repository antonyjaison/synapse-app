import { View, Text } from "react-native";
import React from "react";
import Avatar from "../Avatar";
import { Link } from "expo-router";
import { useUser } from "@/stores/useUser";

const HomeHeaderTitle = () => {
  const { user } = useUser();
  return (
    <View className="flex-row">
          <Avatar />
      <View className=" ml-3">
        <Text className="font-medium text-base">Good Morning</Text>
        <Text className=" text-xs">{user?.displayName ?? "Sarah"}</Text>
      </View>
    </View>
  );
};

export default HomeHeaderTitle;
