import { AddProductTabBar } from "@/components/Screens/BottomTabs/AddProductTabBar";
import { HomeTabBar } from "@/components/Screens/BottomTabs/HomeTabBar";
import { DASHBOARD_TAB_CONFIG } from "@/constants/dashboardTabConfig";
import { usePathname } from "expo-router";
import { Tabs } from "expo-router";
import React, { useCallback } from "react";

interface TabIcon {
  focused: boolean;
  color: string;
  size: number;
}

export default function TabLayout() {
  const pathname = usePathname();

  const HomeTab = useCallback(
    ({ focused }: TabIcon) => <HomeTabBar focused={focused} />,
    [],
  );
  const AddTab = useCallback(
    ({ focused }: TabIcon) => <AddProductTabBar focused={focused} />,
    [],
  );

  return (
    <Tabs
      screenOptions={{
        ...DASHBOARD_TAB_CONFIG(pathname),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: HomeTab,
          tabBarIconStyle: { paddingVertical: 0, marginVertical: 10 },
        }}
      />
      <Tabs.Screen
        name="add-product/index"
        options={{
          title: "",
          tabBarIcon: AddTab,
          tabBarIconStyle: { paddingVertical: 0, marginVertical: 10 },
        }}
      />
    </Tabs>
  );
}
