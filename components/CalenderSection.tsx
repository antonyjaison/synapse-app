import React from "react";
import { Text, View } from "./Themed";

import { Calendar } from "react-native-calendars";

const CalenderSection = () => {
  const [selectedDate, setSelectedDate] = React.useState("");

  const dateList = ["2024-04-04", "2024-04-02", "2024-04-03", "2024-04-09"];
  const markedDates = Object.assign(
    {},
    ...dateList.map((date) => ({
      [date]: {
        selected: true,
        selectedColor: "#28CDDC3B",
        selectedTextColor: "#006D77",
      },
    }))
  );

  return (
    <View className="bg-red-300 rounded-[15px] py-4 px-5">
      <Text className="text-fontclr text-lg font-medium mb-1.5">Calender</Text>
      <View className="bg-cardborder h-[1px]" />
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={markedDates}
        theme={{
          dayTextColor: "#006D77",
          textDayFontWeight: "600",
          textDayFontSize: 16,
        }}
      />
    </View>
  );
};

export default CalenderSection;
