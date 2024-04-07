import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableNativeFeedback,
} from "react-native";
import React, { useState } from "react";
import DocumentCard from "@/components/DocumentCard";
import HazardButton from "@/components/HazardButton";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Model from "@/components/Model";

const Documents = () => {
  const [showModel, setShowModel] = useState(false);
  return (
    <View>
      <ScrollView>
        <View className=" py-4 px-4 pb-28 bg-white border-t border-[#999797] flex-col gap-8">
          <View>
            <Text className="text-lg">Documents</Text>
            <View>
              <DocumentCard />
              <DocumentCard />
              <DocumentCard />
              <DocumentCard />
            </View>
          </View>

          <View>
            <Text className="text-lg">Prescriptions</Text>
            <View>
              <DocumentCard />
              <DocumentCard />
              <DocumentCard />
              <DocumentCard />
            </View>
          </View>
        </View>
      </ScrollView>
      <HazardButton
        onPress={() => setShowModel(true)}
        color="#006D77"
        icon={<AntDesign name="plus" size={30} color="#fff" />}
      />

      <Model
        title="Add files"
        isVisible={showModel}
        onClose={() => setShowModel(false)}
      >
        <View>
          <TouchableNativeFeedback>
            <View className=" p-3 flex-row h-fit items-center justify-between">
              <Text className="font-medium text-lg">Document</Text>
              <Ionicons name="chevron-forward" size={20} />
            </View>
          </TouchableNativeFeedback>
          <View className=" w-full h-[1px] bg-[#d8d8d8]" />
          <TouchableNativeFeedback>
            <View className=" p-3 flex-row h-fit items-center justify-between">
              <Text className="font-medium text-lg">Prescription</Text>
              <Ionicons name="chevron-forward" size={20} />
            </View>
          </TouchableNativeFeedback>
        </View>
      </Model>
    </View>
  );
};

export default Documents;
