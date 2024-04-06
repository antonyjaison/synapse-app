import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Timer = () => {
  // State for the timer, starting from 45 minutes (converted to seconds).
  const [timeRemaining, setTimeRemaining] = useState(45 * 60);

  useEffect(() => {
    // Set up the interval to decrement the timeRemaining every second.
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval); // Clear interval if the timer reaches 0 to stop the countdown.
          return 0; // Ensure the timer doesn't go into negative values.
        }
        return prevTime - 1; // Decrement the timer by one second.
      });
    }, 1000);

    // Clean up the interval on component unmount.
    return () => clearInterval(interval);
  }, []);

  // Calculate minutes and seconds from timeRemaining.
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <View className="bg-[#FFFEFE] px-6 py-5 rounded-2xl flex-row items-center">
      <LinearGradient
        className="w-24 h-24 rounded-full items-center justify-center"
        colors={["#006D77", "#85E8F1"]}
      >
        <View className="w-[75px] h-[75px] bg-[#FFFEFE] rounded-full items-center justify-center">
          {/* Display the minutes and seconds, ensuring two digits for each. */}
          <Text className="text-xl font-semibold">{`${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</Text>
          <Text className="text-xs">Minutes</Text>
        </View>
        <View className="w-[10px] h-[10px] rounded-full bg-[#00646d] absolute top-0" />
      </LinearGradient>
      <Text className="font-medium text-2xl w-48 ml-8">
        Time for Next Medication
      </Text>
    </View>
  );
};

export default Timer;
