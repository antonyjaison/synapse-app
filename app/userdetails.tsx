import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@/stores/useUser";
import { Ionicons } from "@expo/vector-icons";
import BackgroundGradient from "@/components/Layouts/BackgroundGradient";
import Markdown from "react-native-markdown-display";

const UserDetails = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState("");

  console.log(userData);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch(
          "https://c961-2409-40f3-101f-3967-c7e7-ea31-e7c1-5b02.ngrok-free.app/profile-summary",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uid: "rcT4Yob91eNQMeSl1INaE7BsRBq1",
            }),
          }
        );
        console.log(res);
        const data = await res.json();
        setUserData(data.message);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <View>
      <BackgroundGradient>
        <View className=" flex-col items-center">
          <View className=" relative w-fi">
            <Image
              className=" w-36 h-36 rounded-full"
              source={
                user?.photoURL
                  ? { uri: user.photoURL }
                  : require("@/assets/images/avatar.png")
              }
            />
            <TouchableOpacity>
              <View className=" bg-white rounded-full p-1 absolute bottom-[15px] left-[110px]">
                <Ionicons color="#006D77" name="camera-outline" size={18} />
              </View>
            </TouchableOpacity>
          </View>

          <View className=" mt-5">
            <Text className="text-2xl">
              {user?.displayName ?? "Antony Jaison"}
            </Text>
          </View>
        </View>

        {userData ? (
          <View className=" mt-10 mb-20">
            <Text className="text-lg mb-8">Medical History</Text>

            <View
              style={{ borderWidth: 0.5 }}
              className="w-full rounded-lg px-2 py-6"
            >
              <Text className=" w-full">
                <Markdown>{userData}</Markdown>
              </Text>
            </View>
          </View>
        ) : (
          <View className=" mt-10">
            <Text className="italic text-center text-2xl">Loading...</Text>
          </View>
        )}
      </BackgroundGradient>
    </View>
  );
};

export default UserDetails;
