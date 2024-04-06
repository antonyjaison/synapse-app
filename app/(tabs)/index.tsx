import InsightSection from "@/components/InsightSection";
import { Text, View } from "@/components/Themed";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeTab() {
  return (
    <View>
      <LinearGradient className="w-full h-screen px-5" colors={["#fff", "#FCDBD5"]}>
        <InsightSection/>
      </LinearGradient>
    </View>
  );
}
