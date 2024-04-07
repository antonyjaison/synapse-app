import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Login = () => {
  return (
    <ImageBackground
      style={{ height: "100%" }}
      className="w-full justify-between items-center"
      source={require("@/assets/images/login.png")}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className=" pt-10">
        <Image
          className=" w-32 h-32 object-contain"
          source={require("@/assets/images/logo.png")}
        />
      </View>
      <View className="pb-10">
        <Text className="text-6xl text-white px-3">willow</Text>
        <View className=" px-4">
          <Text className=" text-white text-2xl">
            Welcome to your secure health hub.
          </Text>
        </View>
        <View className="bg-white rounded-lg px-3 mt-3 overflow-hidden">
          <TouchableNativeFeedback>
            <View className=" h-fit items-center flex-row gap-3 justify-center py-3">
              <Image source={require("@/assets/images/google.png")} />
              <Text className="text-lg">Continue with google</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;
