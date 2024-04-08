import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import BackgroundGradient from "@/components/Layouts/BackgroundGradient";
import { Link } from "expo-router";
import { signOut } from "firebase/auth";
import { AUTH } from "@/lib/firebase";
import { useUser } from "@/stores/useUser";

const UserScreen = () => {
  const { user } = useUser();
  return (
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

      <View className="border border-[#C6C6C6] rounded-2xl px-10 py-4 mt-10 flex-row justify-between items-center">
        <View className=" flex-col justify-center">
          <Text className=" text-sm">165 cm</Text>
          <Text className=" text-sm text-[#8D8C8C]">Height</Text>
        </View>

        <View className=" h-10 w-[1px] bg-[#C6C6C6]" />

        <View className=" flex-col justify-center">
          <Text className=" text-sm">65 kg</Text>
          <Text className=" text-sm text-[#8D8C8C]">Weight</Text>
        </View>
        <View className=" h-10 w-[1px] bg-[#C6C6C6]" />

        <View className=" flex-col justify-center">
          <Text className=" text-sm">100%</Text>
          <Text className=" text-sm text-[#8D8C8C]">BMI</Text>
        </View>
      </View>

      <View className=" mt-9">
        <Text className=" font-medium text-lg">Quick Actions</Text>

        <View className="border border-[#C6C6C6] rounded-2xl px-7 mt-10 flex-col justify-between items-center">
          <View className=" h-fit flex-row w-full justify-between my-6">
            <View className=" h-fit flex-row items-center gap-10">
              <Ionicons color="#006D77" name="person-add-outline" size={25} />
              <Text className="text-sm">Personal Info</Text>
            </View>
            <Ionicons name="chevron-forward" size={25} />
          </View>
          <View className=" w-full h-[1px] bg-[#C6C6C6]" />

          <View className=" h-fit flex-row w-full justify-between my-6">
            <View className=" h-fit flex-row items-center gap-10">
              <Ionicons color="#006D77" name="backspace-outline" size={25} />
              <Link href="/userdetails">
                <Text className="text-sm">Medical History</Text>
              </Link>
            </View>
            <Link href="/userdetails">
              <Ionicons name="chevron-forward" size={25} />
            </Link>
          </View>
          <View className=" w-full h-[1px] bg-[#C6C6C6]" />

          <View className=" h-fit flex-row w-full justify-between my-6">
            <View className=" h-fit flex-row items-center gap-10">
              <Ionicons color="#006D77" name="mail-outline" size={25} />
              <Link href="/connected">
                <Text className="text-sm">Connected Mails</Text>
              </Link>
            </View>
            <Link href="/connected">
              <Ionicons name="chevron-forward" size={25} />
            </Link>
          </View>
          <View className=" w-full h-[1px] bg-[#C6C6C6]" />

          <View className=" h-fit flex-row w-full justify-between my-6">
            <View className=" h-fit flex-row items-center gap-10">
              <Ionicons name="document-outline" size={25} />
              <Link href="/documents">
                <Text className="text-sm">Documents</Text>
              </Link>
            </View>
            <Link href="/documents">
              <Ionicons name="chevron-forward" size={25} />
            </Link>
          </View>

          <View className=" w-full h-[1px] bg-[#C6C6C6]" />

          <View className=" h-fit flex-row w-full justify-between my-6">
            <View className=" h-fit flex-row items-center gap-10">
              <Ionicons name="help-circle-outline" size={30} />
              <Text className="text-sm">Help</Text>
            </View>
            <Ionicons name="chevron-forward" size={25} />
          </View>
          <View className=" w-full h-[1px] bg-[#C6C6C6]" />

          <TouchableOpacity onPress={() => signOut(AUTH)}>
            <View className=" h-fit flex-row w-full justify-between my-6">
              <View className=" h-fit flex-row items-center gap-10">
                <Ionicons color="red" name="log-out-outline" size={25} />
                <Text className="text-sm text-red-500">Log out</Text>
              </View>
              <Ionicons color="red" name="chevron-forward" size={25} />
            </View>
          </TouchableOpacity>
          <View className=" w-full h-[1px] bg-[#C6C6C6]" />
        </View>
      </View>

      <View className="my-10 mb-20">
        <Text className="text-center font-medium text-base">
          Made with 💖 by StudioOne
        </Text>
        <Text className=" text-[#A7A7A7] font-medium text-base text-center mt-3">
          Willow© | All rights reserved
        </Text>
      </View>
    </BackgroundGradient>
  );
};

export default UserScreen;
