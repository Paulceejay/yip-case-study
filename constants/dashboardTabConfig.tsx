import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { DEVICE_WIDTH } from './deviceWidth';

export const DASHBOARD_TAB_CONFIG = (pathName?: string): BottomTabNavigationOptions => {
  const tabBarHeight = 75;

  return {
    tabBarStyle: {
      borderTopWidth: 0,
      backgroundColor: '#ffffff',
      height: tabBarHeight,
      width: DEVICE_WIDTH,
      shadowColor: 'transparent',
      position: 'absolute',
      bottom: -15,
      left: 0,
      display: ScreenShouldHideTabBar(pathName) ? 'none' : 'flex',
    },
    tabBarHideOnKeyboard: true,
    headerShown: false,
  };
};

const ScreenShouldHideTabBar = (path?: string) => {
  const hiddenRoutes = [
    'all-products'
  ];
  return hiddenRoutes.some((route) => path?.includes(route));
};
