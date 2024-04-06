import { View, Text } from "react-native";
import React from "react";

const HealthHeaderTitle = () => {
  return (
      <View>
        <Text className=" text-lg text-center">Activity</Text>
        <Text className=" text-xs text-[#7b7b7b] text-center">Last Sync: 2 sec ago</Text>
      </View>
  );
};

export default HealthHeaderTitle;
