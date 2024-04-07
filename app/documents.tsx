import { View, Text, ScrollView } from "react-native";
import React from "react";
import DocumentCard from "@/components/DocumentCard";

const Documents = () => {
  return (
    <View>
      <ScrollView>
        <View className=" py-4 px-4 bg-white border-t border-[#999797] flex-col gap-8">
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
    </View>
  );
};

export default Documents;
