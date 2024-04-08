import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "@/lib/firebase";
import { useUser } from "@/stores/useUser";
import dayjs from "dayjs";

const Timer = () => {
  const { user } = useUser();
  // State for the timer, starting from 45 minutes (converted to seconds).
  const [timeRemaining, setTimeRemaining] = useState(0);

  async function getPrescriptions() {
    const prescriptionCollection = collection(
      FIRESTORE_DB,
      "data",
      user?.uid ?? "antony",
      "prescriptions"
    );
    const docs = await getDocs(prescriptionCollection);
    let minTime = 0;
    docs.forEach((doc) => {
      const data = doc.data();
      const dateObj = data.expires.toDate();
      const expires = dayjs(dateObj);
      const today = dayjs();
      if (
        today.isBefore(expires) &&
        (getTimeDifference(data.frequency) < minTime || minTime === 0)
      ) {
        minTime = getTimeDifference(data.frequency);
      }
    });
    setTimeRemaining(minTime);
  }

  useEffect(() => {
    getPrescriptions();
  }, []);

  useEffect(() => {
    // Set up the interval to decrement the timeRemaining every second.
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          // clearInterval(interval); // Clear interval if the timer reaches 0 to stop the countdown.
          return 0; // Ensure the timer doesn't go into negative values.
        }
        return prevTime - 1; // Decrement the timer by one second.
      });
    }, 1000);

    // Clean up the interval on component unmount.
    return () => clearInterval(interval);
  }, []);

  function getTimeDifference(freq: number) {
    const now = dayjs();
    if (freq === 1) {
      const next10AM = dayjs().hour(10).minute(0).second(0);
      if (now.isAfter(next10AM)) {
        return next10AM.add(1, "day").diff(now, "second");
      } else {
        return next10AM.diff(now, "second");
      }
    }
    if (freq === 2) {
      const next10AM = dayjs().hour(10).minute(0).second(0);
      const next8PM = dayjs().hour(20).minute(0).second(0);
      if (now.isAfter(next10AM) && now.isBefore(next8PM)) {
        return next8PM.diff(now, "second");
      } else {
        return next10AM.add(1, "day").diff(now, "second");
      }
    }
    if (freq === 3) {
      const next10AM = dayjs().hour(10).minute(0).second(0);
      const next2PM = dayjs().hour(14).minute(0).second(0);
      const next8PM = dayjs().hour(20).minute(0).second(0);
      if (now.isAfter(next10AM) && now.isBefore(next2PM)) {
        return next2PM.diff(now, "second");
      } else if (now.isAfter(next2PM) && now.isBefore(next8PM)) {
        return next8PM.diff(now, "second");
      } else {
        return next10AM.add(1, "day").diff(now, "second");
      }
    }
    // return 45 * 60;
    return 0;
  }
  // Calculate minutes and seconds from timeRemaining.
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining / 60) % 60);
  const seconds = timeRemaining % 60;

  return (
    <View className="bg-[#FFFEFE] px-6 py-5 rounded-2xl flex-row items-center">
      <LinearGradient
        className="w-24 h-24 rounded-full items-center justify-center"
        colors={["#006D77", "#85E8F1"]}
      >
        <View className="w-[75px] h-[75px] bg-[#FFFEFE] rounded-full items-center justify-center">
          {/* Display the minutes and seconds, ensuring two digits for each. */}
          <Text className="text-xs font-semibold">{`${hours
            .toString()
            .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`}</Text>
          <Text className="text-xs">Minutes</Text>
        </View>
        <View className="w-[10px] h-[10px] rounded-full bg-[#00646d] absolute top-0" />
      </LinearGradient>
      <Text className="font-medium text-xl w-48 ml-8">
        Time for Next Medication
      </Text>
    </View>
  );
};

export default Timer;
