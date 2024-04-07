import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableNativeFeedback,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import DocumentCard from "@/components/DocumentCard";
import HazardButton from "@/components/HazardButton";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Model from "@/components/Model";
import * as DocumentPicker from "expo-document-picker";
import * as ExpoFileSystem from "expo-file-system";

const Documents = () => {
  const [showModel, setShowModel] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const selectDocument = async () => {
    let res = null;

    try {
      res = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (res.canceled) {
        return;
      }

      let fileContent = null;
      if (Platform.OS === "android") {
        fileContent = await ExpoFileSystem.readAsStringAsync(
          res.assets[0].uri,
          { encoding: ExpoFileSystem.EncodingType.UTF8 }
        );
      }
      setSelectedDocument(fileContent);
    } catch (err) {
      console.log("error -----", err);
    }
  };

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
        {selectedDocument ? (
          <View className="p-3 flex-col gap-5 w-full py-6">
            <AntDesign name="pdffile1" size={50} color="#C10000" />
            <View
              style={{ borderWidth: 0.5 }}
              className="border-[#707070] rounded-lg w-full px-2 py-2 relative"
            >
              <TextInput placeholder="Health report" className=" ml-2" />
              <Text className="absolute top-[-7px] left-2 bg-white px-2 text-xs text-[#707070]">
                Document Name
              </Text>
            </View>
            <View className=" w-full overflow-hidden rounded-lg">
              <TouchableNativeFeedback>
                <View className=" w-full bg-[#006D77] py-2">
                  <Text className=" text-white text-lg text-center">Confirm</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        ) : (
          <View>
            <TouchableNativeFeedback onPress={selectDocument}>
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
        )}
      </Model>
    </View>
  );
};

export default Documents;
