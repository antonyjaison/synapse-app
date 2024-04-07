import React, { useEffect, useRef, useState } from "react";
import { View, TouchableNativeFeedback } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useChatStore } from "@/stores/useChat";

export type ModelType = "hygeia" | "sage";

const ChatHeaderRight = () => {
  const { changeModel, model } = useChatStore();

  return (
    <View className="">
      <View style={{ marginRight: 12, borderRadius: 9999, overflow: "hidden" }}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#ECDEDE", true)}
          onPress={() => console.log("Notification icon pressed")}
          useForeground
        >
          <View
            style={{
              backgroundColor: "#FFE8E8",
              width: 48,
              height: 48,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 9999,
            }}
          ></View>
        </TouchableNativeFeedback>
      </View>
      <Picker
        style={{ width: 48, height: 48, position: "absolute", top: -5 }}
        selectedValue={model}
        onValueChange={(itemValue) => changeModel(itemValue)}
      >
        <Picker.Item label="Hygeia" value="hygeia" />
        <Picker.Item label="Sage" value="sage" />
      </Picker>
    </View>
  );
};

export default ChatHeaderRight;
