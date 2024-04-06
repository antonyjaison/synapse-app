import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons if you haven't

const SimpleInputBox = () => {
  const [inputText, setInputText] = useState("");

  const handleLeftIconPress = () => {
    console.log("Left Icon Pressed!");
    // Handle the left icon action here (e.g., clear input, open modal, etc.)
  };

  const handleRightIconPress = () => {
    console.log("Right Icon Pressed!");
    // Handle the right icon action here (e.g., submit input)
    console.log(inputText); // Example action: log the current input
  };

  return (
    <View className="h-fit flex-row items-center border-[0.5px] border-[#2A2A2A] px-3 py-[6px] rounded-lg">
      <TouchableOpacity onPress={handleLeftIconPress}>
        <Ionicons name="mic-outline" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        value={inputText}
        onChangeText={setInputText}
        placeholder="Type or say to begin chat..."
        className="flex-1 ml-4 placeholder:font-light placeholder:text-[#2A2A2A]"
      />
      <TouchableOpacity
        onPress={handleRightIconPress}
        className="bg-[#006D77] p-[10px] rounded-lg"
      >
        <Ionicons name="send-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SimpleInputBox;
