import { AppNotificationToast } from "@/components/Global/AppNotificationToast";
import { useAppNotifications } from "@/base/hooks/pushNotifications/useAppNotifications";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    "SourceSans3-Light": require("@/assets/fonts/static/SourceSans3-Light.ttf"),
    "SourceSans3-Regular": require("@/assets/fonts/static/SourceSans3-Regular.ttf"),
    "SourceSans3-Medium": require("@/assets/fonts/static/SourceSans3-Medium.ttf"),
    "SourceSans3-SemiBold": require("@/assets/fonts/static/SourceSans3-SemiBold.ttf"),
    "SourceSans3-Bold": require("@/assets/fonts/static/SourceSans3-Bold.ttf"),
  });

  useEffect(() => {
    if (!fontsLoaded && !fontsError) return;
  }, [fontsLoaded, fontsError]);

  useAppNotifications();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <AppNotificationToast />
    </GestureHandlerRootView>
  );
}
