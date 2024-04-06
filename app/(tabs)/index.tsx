import InsightSection from "@/components/InsightSection";
import { Text, View } from "@/components/Themed";
import Timer from "@/components/Timer";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";

export default function HomeTab() {
  return (
    <ScrollView>
      <LinearGradient
        className="w-full h-screen px-5"
        colors={["#fff", "#FCDBD5"]}
      >
        <View className=" flex-col gap-6 bg-transparent mt-3">
          <View className="bg-transparent">
            <Timer />
          </View>
          <View className="bg-transparent">
            <InsightSection />
          </View>
          <View className="bg-transparent">
            <InsightSection />
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
