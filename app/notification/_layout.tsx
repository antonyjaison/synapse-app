import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import BackgroundGradient from "@/components/Layouts/BackgroundGradient";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

const { Navigator } = createMaterialTopTabNavigator();
import { usePathname } from "expo-router";

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Notification = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <BackgroundGradient>
      <MaterialTopTabs
        style={{
          // backgroundColor: "#fff",
          // elevation: 3,
          // borderRadius:30,
          // padding:0,
          // margin:0,
          // height:"auto",
        }}
        screenOptions={{
          tabBarIndicatorStyle:{
            backgroundColor:"transparent",
          },
          animationEnabled:true,
          tabBarItemStyle:{
            padding:0,
            borderRadius:30,            
          },
          tabBarStyle:{
            backgroundColor:"#fff",
            borderRadius:30,
            padding:0,
            // elevation:3,
          },
          tabBarAndroidRipple:{
            color:"#f2f2f2"
          }


        }}
      >
        <MaterialTopTabs.Screen
          name="unread"
          options={{
            tabBarLabel(props) {
              return (
                <View
                  style={[
                    pathname === "/notification/unread" && {
                      paddingHorizontal: 20,
                      elevation: 2,
                    },
                    {
                      backgroundColor: "#fff",
                      borderRadius: 30,
                      paddingVertical: 14,
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                  ]}
                >
                  <Text className="text-xs">Unread Notification</Text>
                </View>
              );
            },
          }}
        />
        <MaterialTopTabs.Screen
          name="read"
          options={{
            tabBarLabel(props) {
              return (
                <View
                  style={[
                    pathname === "/notification/read" && {
                      paddingHorizontal: 20,
                      elevation: 2,
                    },
                    {
                      backgroundColor: "#fff",
                      borderRadius: 30,
                      paddingVertical: 14,
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                  ]}
                >
                  <Text className="text-xs">All Notification</Text>
                </View>
              );
            },
          }}
        />
      </MaterialTopTabs>
    </BackgroundGradient>
  );
};

export default Notification;
