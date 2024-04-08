import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "@/lib/firebase";
import { useUser } from "@/stores/useUser";
import dayjs from "dayjs";
import { usePathname } from "expo-router";
import * as Notifications from "expo-notifications";
import Model from "./Model";

const Timer = () => {
  const { user } = useUser();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [medicine, setMedicine] = useState("");
  const pathname = usePathname();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  async function getPrescriptions() {
    try {
      const prescriptionCollection = collection(
        FIRESTORE_DB,
        "data",
        user?.uid ?? "antony",
        "prescriptions"
      );
      const docs = await getDocs(prescriptionCollection);
      let minTime = Infinity;
      docs.forEach((doc) => {
        const data = doc.data();
        setMedicine(data.name);
        const dateObj = data.expires.toDate();
        const expires = dayjs(dateObj);
        const today = dayjs();
        if (today.isBefore(expires)) {
          const timeDifference = getTimeDifference(data.frequency);
          if (timeDifference < minTime) {
            minTime = timeDifference;
          }
        }
      });
      setTimeRemaining(minTime === Infinity ? 0 : minTime);
    } catch (error) {
      console.error("Failed to fetch prescriptions:", error);
      setTimeRemaining(0);
    }
  }

  useEffect(() => {
    getPrescriptions();
  }, [user?.uid, pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = prevTime > 0 ? prevTime - 1 : 0;
        if (newTime === 0) {
          scheduleNotification(); // Call to schedule the notification
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  async function scheduleNotification() {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time for Next Medication",
        body: `It's time to take ${medicine}.`,
      },
      trigger: { seconds: 2 }, // Trigger immediately for demonstration purposes
    });
  }

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
    <View>
      <View className="bg-[#FFFEFE] px-6 py-5 rounded-2xl flex-row items-center">
        <LinearGradient
          className="w-24 h-24 rounded-full items-center justify-center"
          colors={["#006D77", "#85E8F1"]}
        >
          <View className="w-[75px] h-[75px] bg-[#FFFEFE] rounded-full items-center justify-center">
            {/* Display the minutes and seconds, ensuring two digits for each. */}
            <Text className="text-sm font-semibold">{`${hours
              .toString()
              .padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</Text>
            {/* <Text className="text-xs">Minutes</Text> */}
          </View>
          <View className="w-[10px] h-[10px] rounded-full bg-[#00646d] absolute top-0" />
        </LinearGradient>
        <Text className="font-medium text-xl w-48 ml-8">
          Time for Next Medication
        </Text>
      </View>
    </View>
  );
};

export default Timer;
