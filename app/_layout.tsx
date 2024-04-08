import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "react-query";
import { onAuthStateChanged } from "firebase/auth";
import { useUser } from "@/stores/useUser";
import { AUTH } from "@/lib/firebase";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const queryClient = new QueryClient();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { setUser, user, setIsLoaded, isLoaded } = useUser();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  useEffect(() => {
    const unsub = onAuthStateChanged(AUTH, (user) => {
      setUser(user);
      setIsLoaded(true);
    });
    return () => unsub();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { user, isLoaded } = useUser();
  const colorScheme = useColorScheme();

  // useEffect(() => {
  //   if (user && isLoaded) {
  //     router.replace("/(tabs)");
  //   } else if (isLoaded) {
  //     router.replace("/(auth)/Login");
  //   }
  // }, [user, isLoaded]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(notification)/index"
            options={{
              title: "Notifications",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="user"
            options={{
              title: "",
              headerShadowVisible: false,
              headerRight: () => (
                <TouchableOpacity>
                  <Text className="text-[#006D77] font-medium text-lg">
                    Edit
                  </Text>
                </TouchableOpacity>
              ),
            }}
          />

          <Stack.Screen
            name="documents"
            options={{
              title: "Documents",
              headerTitleAlign: "center",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="connected"
            options={{
              title: "Linked Accounts",
              headerTitleAlign: "center",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="userdetails"
            options={{
              title: "",
              headerShadowVisible: false,
            }}
          />

          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          <Stack.Screen name="oauthredirect" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
