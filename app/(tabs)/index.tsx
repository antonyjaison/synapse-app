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
import { useEffect, useState } from "react";
import { Linking } from "react-native";

export default function HomeTab() {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
    const targetNumber = "8129937097";
    const sourcenumbers = ["7736676823", "7736676823", "7736676823"];

    const apiUrl = "";
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: sourcenumbers,
        target: targetNumber,
        location: location,
      }),
    });

    if (res.ok) {
      console.log("success");
    }

    Linking.openURL(`tel:${targetNumber}`);
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
