import { Image } from 'react-native'
import React from 'react'
import { useUser } from "@/stores/useUser";

const Avatar = () => {
  const { user } = useUser();
  return (
    <Image
      className="w-10 h-10 rounded-full"
      source={
        user?.photoURL
          ? { uri: user.photoURL }
          : require("@/assets/images/avatar.png")
      }
    />
  );
};

export default Avatar