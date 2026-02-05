import React from "react";
import { ActivityIndicator, Pressable, ViewStyle } from "react-native";

export const AppButton = ({
  className = "",
  onPress,
  isLoading = false,
  children,
  disabled = false,
  smSize,
  style,
}: {
  className?: string;
  onPress?: () => void;
  isLoading?: boolean;
  children: any;
  disabled?: boolean;
  smSize?: boolean;
  style?: ViewStyle | ViewStyle[];
}) => {
  const defaultPadding = smSize ? "px-4 py-2" : "px-5 py-4";
  const hasPadding =
    className.includes("p-") ||
    className.includes("px-") ||
    className.includes("py-");

  return (
    <Pressable
      onPress={(e) => {
        e.stopPropagation();
        if (onPress && !disabled && !isLoading) {
          onPress();
        }
      }}
      className={`rounded-[30px] flex flex-row items-center justify-center ${!hasPadding ? defaultPadding : ""} ${className} ${disabled || isLoading ? "opacity-50" : ""}`}
      disabled={disabled || isLoading}
      style={style}
    >
      {children}

      {isLoading ? (
        <ActivityIndicator
          size={15}
          color={"#FFFFFF"}
          animating={true}
          style={{ marginLeft: 5, marginTop: 1 }}
        />
      ) : null}
    </Pressable>
  );
};
