import React, { useEffect, useRef, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import HomeHeaderTitle from "@/components/Headers/HomeHeaderTitle";
import HomeHeaderRight from "@/components/Headers/HomeHeaderRight";
import HealthHeaderTitle from "@/components/Headers/Health/HealthHeaderTitle";
import HealthHeaderRight from "@/components/Headers/Health/HealthHeaderRight";
import HealthHeaderLeft from "@/components/Headers/Health/HealthHeaderLeft";
import { View } from "@/components/Themed";
import { Text, Animated } from "react-native";
import Avatar from "@/components/Avatar";
import { Ionicons } from "@expo/vector-icons";
import { useChatStore } from "@/stores/useChat";
import { Keyboard } from "react-native";
import ChatHeaderRight from "@/components/Headers/Chat/ChatHeaderRight";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { isChatInputFocus, setIsChatInputFocus, setIsChatInputBlur, model } =
    useChatStore();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsChatInputFocus(); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsChatInputBlur(); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0,
          elevation: 5,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
            width: 0,
          },
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: () => <HomeHeaderTitle />,
          headerRight: () => <HomeHeaderRight />,
          headerStyle: {
            height: 120,
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: "Health",
          headerTitle: () => <HealthHeaderTitle />,
          headerRight: () => <HealthHeaderRight />,
          headerLeft: () => <HealthHeaderLeft />,
          headerTitleAlign: "center",
          headerStyle: {
            height: 120,
          },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="heartbeat" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="peoples"
        options={{
          title: "Monitor",
          headerTitleAlign: "center",
          headerStyle: {
            height: 120,
          },
          headerLeft: () => <HealthHeaderLeft />,
          headerTitle: () => <Text className=" text-lg">Data Monitor</Text>,
          tabBarIcon: ({ color }) => (
            <Ionicons size={22} name="people-circle-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarStyle: {
            display: isChatInputFocus ? "none" : "flex",
          },
          title: "Chat",
          headerTitle: () => (
            <View>
              <Text className="text-2xl">
                {model.charAt(0).toUpperCase() + model.slice(1)}
              </Text>
            </View>
          ),
          headerRight: () => <ChatHeaderRight />,
          headerLeft: () => (
            <View className="ml-4">
              <Avatar />
            </View>
          ),
          headerTitleAlign: "center",
          headerStyle: {
            height: 120,
            borderBottomColor: "#D6D6D6",
            borderBottomWidth: 1,
          },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="comment-o" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
