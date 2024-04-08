import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import BackgroundGradient from "@/components/Layouts/BackgroundGradient";
import { Ionicons, FontAwesome, Fontisto } from "@expo/vector-icons";
import { HealthDataTypes, healthData } from "@/assets/data/health-data";

const ShopTab = () => {

  const [data, setData] = useState<HealthDataTypes[]>(healthData);

  useEffect(() => {
    const interval = setInterval(() => {
      // Function to simulate data update
      const updatedData = data.map((person) => ({
        ...person,
        lastSync: "A few seconds ago",
        healthMetrics: {
          ...person.healthMetrics,
          steps: person.healthMetrics.steps + Math.floor(Math.random() * 100),
          ecg: person.healthMetrics.ecg + Math.floor(Math.random() * 5) - 2,
          heartRate: person.healthMetrics.heartRate + Math.floor(Math.random() * 5) - 2,
          oxygen: Math.min(100, person.healthMetrics.oxygen + Math.floor(Math.random() * 2)),
        }
      }));

      setData(updatedData);
    }, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [data]);

  return (
    <View>
      <BackgroundGradient>
        <View className=" p-1">
          {data.map((data, index) => (
            <View
              key={index}
              style={{ elevation: 1 }}
              className=" w-full px-3 py-7 bg-[#FFFEFE] rounded-xl mt-5"
            >
              <View className=" h-fit flex-row items-center justify-between mb-7 px-2">
                <Text className="text-xl">{data.name}</Text>
                <Text className="text-[#565656] text-xs">
                  Last Sync: {data.lastSync}
                </Text>
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
                      {data.healthMetrics.steps}
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
                      {data.healthMetrics.ecg}
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
                      {data.healthMetrics.heartRate}
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
                      {data.healthMetrics.oxygen}
                    </Text>
                  </View>
                  <Fontisto name="blood-drop" color="#C10000" size={30} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </BackgroundGradient>
    </View>
  );
};

export default ShopTab;
