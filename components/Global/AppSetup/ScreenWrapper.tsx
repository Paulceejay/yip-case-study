import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import React, { memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScreenWrapper = ({
  children,
  style,
  coverStatusBar = false,
}: {
  children: any;
  style?: StyleProp<ViewStyle>;
  statusBarTeam?: StatusBarStyle;
  coverStatusBar?: boolean;
}) => {
  //
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        className="flex-1 bg-whiteColor"
        style={[
          style,
          {
            paddingTop: !coverStatusBar ? insets.top : 0,
          },
        ]}
      >
        {children}
        <View style={{ height: insets.bottom }} className="bg-transparent" />
      </View>
      <StatusBar />
    </>
  );
};

const memoizedScreenWrapper = memo(ScreenWrapper);
export { memoizedScreenWrapper as ScreenWrapper };
