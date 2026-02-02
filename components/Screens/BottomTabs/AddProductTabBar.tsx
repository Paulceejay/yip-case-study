import { AppText } from "@/components/Global/AppSetup/AppText";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

export const AddProductTabBar = ({ focused }: { focused: boolean }) => {
  // We'll use a standard icon from IonIcons as per request to use expo vector icons
  return (
    <View className={`w-24 items-center justify-center`}>
      <Ionicons
        name={focused ? "add-circle" : "add-circle-outline"}
        size={24}
        color={focused ? "#0E5EF7" : "#6C7580"}
      />
      <AppText
        className="custom-font-medium text-sm capitalize"
        style={{
          color: focused ? "#0E5EF7" : "#6C7580",
        }}
      >
        Add
      </AppText>
    </View>
  );
};
