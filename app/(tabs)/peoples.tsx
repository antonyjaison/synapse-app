import { View, Text } from "react-native";
import React from "react";
import BackgroundGradient from "@/components/Layouts/BackgroundGradient";
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, Fontisto } from "@expo/vector-icons";

const ShopTab = () => {
  return (
    <View>
      <BackgroundGradient>
        <View className=" p-1">
          <View
            style={{ elevation: 1 }}
            className=" w-full px-3 py-7 bg-[#FFFEFE] rounded-xl"
          >
            <View className=" h-fit flex-row items-center justify-between mb-7 px-2">
              <Text className="text-xl">John Doe</Text>
              <Text className="text-[#565656] text-xs">Last Sync: 32s ago</Text>
            </View>

            <View className=" flex-row flex-wrap justify-around gap-4">
              <View
                style={{ elevation: 5 }}
                className=" bg-white w-2/5 rounded-xl p-4 h-fit flex-row items-center justify-between"
              >
                <View className="">
                  <Text className=" font-semibold text-xs text-[#006D77]">
                    Steps
                  </Text>
                  <Text className=" font-semibold text-black text-base">
                    3,456
                  </Text>
                </View>
                <Ionicons name="walk" color="blue" size={30} />
              </View>

              <View
                style={{ elevation: 5 }}
                className=" bg-white w-2/5 rounded-xl p-4 h-fit flex-row items-center justify-between"
              >
                <View className="">
                  <Text className=" font-semibold text-xs text-[#006D77]">
                    ECG
                  </Text>
                  <Text className=" font-semibold text-black text-base">
                    3,456
                  </Text>
                </View>
                <Ionicons name="pulse" color="green" size={30} />
              </View>

              <View
                style={{ elevation: 5 }}
                className=" bg-white w-2/5 rounded-xl p-4 h-fit flex-row items-center justify-between"
              >
                <View className="">
                  <Text className=" font-semibold text-xs text-[#006D77]">
                  Heart Rate
                  </Text>
                  <Text className=" font-semibold text-black text-base">
                    3,456
                  </Text>
                </View>
                <FontAwesome name="heartbeat" color="#C10000" size={25} />
              </View>

              <View
                style={{ elevation: 5 }}
                className=" bg-white w-2/5 rounded-xl p-4 h-fit flex-row items-center justify-between"
              >
                <View className="">
                  <Text className=" font-semibold text-xs text-[#006D77]">
                  Oxygen
                  </Text>
                  <Text className=" font-semibold text-black text-base">
                    3,456
                  </Text>
                </View>
                <Fontisto name="blood-drop" color="#C10000" size={30} />
              </View>
            </View>
          </View>
        </View>
      </BackgroundGradient>
    </View>
  );
};

export default ShopTab;
