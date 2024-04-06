import DocumentsSection from "@/components/DocumentsSection";
import InsightSection from "@/components/InsightSection";
import { View } from "@/components/Themed";
import Timer from "@/components/Timer";
import CalenderSection from "@/components/CalenderSection";
import BackgroundGradient from "@/components/Layouts/BackgroundGradient";

export default function HomeTab() {
  return (
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
  );
}
