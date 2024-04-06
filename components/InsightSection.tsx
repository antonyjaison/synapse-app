import { View, Text } from "react-native";
import React from "react";

const InsightSection = () => {
  return (
    <View className="bg-[#fffef] px-6 py-5 rounded-2xl">
      <View>
        <Text className="text-lg font-medium">Insight for the day</Text>
        <Text className=" text-[#8E8E8E] text-xs">02 Feb 2024</Text>
      </View>
      <View className="mt-6">
        <Text className="text-base font-medium">
          “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          efficitur leo malesuada est mollis feugiat. Nulla gravida volutpat
          odio, et vestibulum elit euismod at.”
        </Text>
        <Text className="text-xs mt-1">- Lorem ipsum</Text>
      </View>
    </View>
  );
};

export default InsightSection;
