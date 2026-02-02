import { cn } from "@/base/libs/cn";
import React from "react";
import { Text } from "react-native";
import { StyleProp, TextStyle } from "react-native";

interface IAppText {
  children: any;
  className?: string;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
  style?: StyleProp<TextStyle>;
  fontFamily?:
    | "SourceSans3-Light"
    | "SourceSans3-Regular"
    | "SourceSans3-Medium"
    | "SourceSans3-SemiBold"
    | "SourceSans3-Bold";
}


export const AppText = ({
  children,
  className,
  numberOfLines,
  ellipsizeMode,
  style,
  fontFamily = "SourceSans3-Regular",
}: IAppText) => {
  return (
    <Text
      style={[{ fontFamily: fontFamily }, style]}
      className={cn(`text-textPrimary ${className}`)}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </Text>
  );
};
