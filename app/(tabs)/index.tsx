
import InsightSection from "@/components/InsightSection";
import { Text, View } from "@/components/Themed";
import Timer from "@/components/Timer";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";
import CalenderSection from "@/components/CalenderSection";


export default function HomeTab() {
  return (
    <LinearGradient className="w-full h-screen" colors={["#fff", "#FCDBD5"]}>
      <ScrollView className="px-5">
        <View className=" flex-col gap-6 bg-transparent mt-3 pb-44">
          <View className="bg-transparent">
            <Timer />
          </View>
          <View className="bg-transparent">
            <InsightSection />
          </View>
          <View className="bg-transparent">
            <CalenderSection />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
