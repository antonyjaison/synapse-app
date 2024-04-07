import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TouchableHighlight,
  TextInput,
  TouchableNativeFeedback,
} from "react-native";
import React, { useState } from "react";
import BackgroundGradient from "@/components/Layouts/BackgroundGradient";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Model from "@/components/Model";

const ConnectedMails = () => {
  const [modelShow, setModelShow] = useState(false);
  return (
    <View>
      <BackgroundGradient>
        <View className="w-full">
          <View
            style={{ elevation: 3 }}
            className="px-5 py-4 flex-row h-fit items-center justify-between bg-white rounded-2xl overflow-hidden mt-6"
          >
            <View>
              <Text className="text-base">Antony Jaison</Text>
              <Text className="text-xs text-[#999797]">
                antonyjaison639@gmail.com
              </Text>
            </View>
            <TouchableHighlight>
              <Ionicons name="trash-outline" size={25} />
            </TouchableHighlight>
          </View>

          <TouchableOpacity onPress={() => setModelShow(true)}>
            <View className=" mt-10" style={styles.button}>
              <AntDesign name="plus" size={24} color="black" />
              <Text>Add Mail</Text>
            </View>
          </TouchableOpacity>
        </View>
      </BackgroundGradient>
      <Model
        isVisible={modelShow}
        onClose={() => setModelShow(false)}
        title="Add Mail"
      >
        <View className=" p-3 flex-col gap-6 w-full py-6">
          <View
            style={{ borderWidth: 0.5 }}
            className="border-[#707070] rounded-lg w-full px-2 py-2 relative"
          >
            <TextInput placeholder="John" className=" ml-2" />
            <Text className="absolute top-[-7px] left-2 bg-white px-2 text-xs text-[#707070]">
              Name
            </Text>
          </View>
          <View
            style={{ borderWidth: 0.5 }}
            className="border-[#707070] rounded-lg w-full px-2 py-2 relative"
          >
            <TextInput placeholder="john@gmail.com" className=" ml-2" />
            <Text className="absolute top-[-7px] left-2 bg-white px-2 text-xs text-[#707070]">
              Email
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
      </Model>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});

export default ConnectedMails;
