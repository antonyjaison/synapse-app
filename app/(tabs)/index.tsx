import DocumentsSection from "@/components/DocumentsSection";
import InsightSection from "@/components/InsightSection";
import { View } from "@/components/Themed";
import Timer from "@/components/Timer";
import CalenderSection from "@/components/CalenderSection";
import BackgroundGradient from "@/components/Layouts/BackgroundGradient";
import HazardButton from "@/components/HazardButton";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { TouchableNativeFeedback } from "react-native";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Linking } from "react-native";
import { io } from "socket.io-client";
import { getMessaging, getToken } from "firebase/messaging";
import { FIREBASE_APP } from "@/lib/firebase";
// import BackgroundTask from 'react-native-background-task';
// import PushNotification from 'react-native-push-notification';

// const messaging = getMessaging(FIREBASE_APP);

export default function HomeTab() {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // useEffect(() => {
  //   // Set up the background task
  //   const taskId = BackgroundTask.define(() => {
  //     // Run your timer logic here
  //     runTimer();
  //   });

  //   // Start the background task
  //   BackgroundTask.start(taskId);

  //   // Clean up the background task when the component unmounts
  //   return () => {
  //     BackgroundTask.cancel(taskId);
  //   };
  // }, []);

  // const runTimer = () => {
  //   // Set the initial timer value (e.g., 60 seconds)
  //   let timer = 60;

  //   // Create an interval to decrement the timer every second
  //   const interval = setInterval(() => {
  //     timer--;

  //     if (timer === 0) {
  //       // Timer has reached the target value, trigger a local notification
  //       triggerLocalNotification();
  //       clearInterval(interval);
  //     }
  //   }, 1000);
  // };

  // const triggerLocalNotification = () => {
  //   PushNotification.localNotification({
  //     channelId: "your-channel-id", // Replace with your own channel ID
  //     title: "Timer Notification",
  //     message: "The timer has reached the target value!",
  //   });
  // };

  const ripple = TouchableNativeFeedback.Ripple("#FFFFFF70", true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const makeAlert = async () => {
    const sourcenumbers = "8129937097";
    const targetNumber = ["7736676823", "8606669122", "7736676823"];

    const apiUrl =
      "https://c961-2409-40f3-101f-3967-c7e7-ea31-e7c1-5b02.ngrok-free.app/sos";
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: sourcenumbers,
        target: targetNumber,
        location: location,
        uid: "",
      }),
    });

    if (res.ok) {
      console.log("success");
      Linking.openURL(`tel:${targetNumber[1]}`);
    }
  };

  return (
    <View className=" relative">
      <BackgroundGradient>
        <View className=" flex-col gap-6 bg-transparent mt-3 pb-40">
          <View className="bg-transparent">
            <Timer />
          </View>
          <View className="bg-transparent">
            <CalenderSection />
          </View>
          <View className="bg-transparent">
            <DocumentsSection />
          </View>
          <View className="bg-transparent">
            <InsightSection />
          </View>
        </View>
      </BackgroundGradient>
      <View className=" absolute w-14 h-14 bg-[#BA1A1A] bottom-[150px] rounded-lg right-9">
        <TouchableNativeFeedback
          onPress={makeAlert}
          useForeground
          background={ripple}
        >
          <View className=" w-14 h-14 items-center justify-center bg-transparent">
            <Ionicons name="alert-circle" size={35} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}
