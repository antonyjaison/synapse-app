import { View, Text } from "react-native";
import Dropdown from "./Dropdown";
import { LineChart } from "react-native-gifted-charts";
import React from "react";

const items = ["steps", "calories", "heart rate"];

const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];

const GraphCard = () => {
  const [selectedItem, setSelectedItem] = React.useState(items[0]);
  const [graphWidth, setGraphWidth] = React.useState(100);

  return (
    <View className="bg-cardbg rounded-[15px] py-[22px] px-5 h-60">
      <View className="flex-row items-center" style={{ gap: 10 }}>
        <Text className="text-black">March</Text>
        <Dropdown
          data={items}
          value={selectedItem}
          setValue={setSelectedItem}
        />
      </View>
      <View
        className="w-full"
        onLayout={(e) => setGraphWidth(e.nativeEvent.layout.width)}
      >
        <LineChart
          zIndex1={10}
          data={data}
          width={graphWidth * 0.81}
          // width={graphWidth}
          // height={220}
          isAnimated={true}
        />
      </View>
    </View>
  );
};

export default GraphCard;
