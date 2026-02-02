import { AppText } from "@/components/Global/AppSetup/AppText";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

export const HomeTabBar = ({ focused }: { focused: boolean }) => {
  return (
    <View className="w-24 items-center justify-center">
      <Ionicons
        name={focused ? "home" : "home-outline"}
        size={24}
        color={focused ? "#0E5EF7" : "#6C7580"}
      />
      <AppText
        className="custom-font-medium text-sm capitalize"
        style={{
          color: focused ? "#0E5EF7" : "#6C7580",
        }}
      >
        Home
      </AppText>
    </View>
  );
};
