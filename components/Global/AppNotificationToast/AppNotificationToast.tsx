import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import Toast, { ToastConfig } from "react-native-toast-message";
import { AppText } from "../AppSetup/AppText";

type Props = {
  [key: string]: any;
};

const toastConfig: ToastConfig = {
  //
  errorToast: ({
    text1,
    text2,
  }: {
    text2?: string;
    text1?: string;
    props?: Props;
  }) => (
    <View
      className="mx-auto flex-row items-center rounded-xl bg-dangerLight px-4 py-3"
      style={{ minHeight: 60, width: "90%" }}
    >
      <View className="mr-3 h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-dangerColor">
        <Ionicons name="alert-circle" size={20} color="white" />
      </View>
      <View className="flex-1">
        <AppText
          className="text-base text-dangerColor/70"
          fontFamily="SourceSans3-Medium"
        >
          {text1}
        </AppText>
        {text2 ? (
          <AppText
            className="text-sm text-dangerColor/70"
            fontFamily="SourceSans3-Medium"
          >
            {text2}
          </AppText>
        ) : null}
      </View>
    </View>
  ),

  //
  successToast: ({
    text1,
    text2,
  }: {
    text1?: string;
    text2?: string;
    props?: Props;
  }) => (
    <View
      className="mx-auto flex-row items-center rounded-xl bg-successLight px-4 py-3"
      style={{ minHeight: 60, width: "90%" }}
    >
      <View className="mr-3 h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-successColor">
        <Ionicons name="checkmark-circle" size={20} color="white" />
      </View>
      <View className="flex-1">
        <AppText
          className="text-base text-successColor/90"
          fontFamily="SourceSans3-Medium"
        >
          {text1}
        </AppText>
        {text2 ? (
          <AppText
            className="text-sm text-successColor/90"
            fontFamily="SourceSans3-Medium"
          >
            {text2}
          </AppText>
        ) : null}
      </View>
    </View>
  ),

  //
  infoToast: ({ text1 }: { text1?: string; props?: Props }) => (
    <View
      className="mx-auto flex-row items-center rounded-xl bg-primaryLight px-4 py-3"
      style={{ minHeight: 60, width: "90%" }}
    >
      <View className="mr-3 h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primaryDark">
        <Ionicons name="information-circle" size={20} color="white" />
      </View>
      <View className="flex-1">
        <AppText
          className="text-base text-darkColor"
          fontFamily="SourceSans3-Medium"
        >
          {text1}
        </AppText>
      </View>
    </View>
  ),

  warningToast: ({ text1 }: { text1?: string; props?: Props }) => (
    <View
      className="mx-auto flex-row items-center rounded-xl bg-grayLight px-4 py-3"
      style={{ minHeight: 60, width: "90%" }}
    >
      <View className="mr-3 h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-warningColor/20">
        <Ionicons name="warning" size={20} color="#F59E0B" />
      </View>
      <View className="flex-1">
        <AppText
          className="text-base text-warningColor"
          fontFamily="SourceSans3-Medium"
        >
          {text1}
        </AppText>
      </View>
    </View>
  ),

  //
  notificationToast: ({
    text1,
    text2,
  }: {
    text1?: string;
    text2?: string;
    props?: Props;
  }) => (
    <View
      className="relative mx-auto rounded-xl bg-bgLight px-4 py-3 shadow-sm shadow-grayColor"
      style={{ minHeight: 100, width: "90%" }}
    >
      {/*  */}
      <View className="flex-row items-center border-b border-borderColor/30 pb-3">
        <View className="mr-3 h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primaryColor">
          <Ionicons name="notifications" size={20} color="white" />
        </View>
        <View className="flex-1">
          <AppText
            className="text-lg tracking-wide text-darkColor"
            fontFamily="SourceSans3-SemiBold"
          >
            {text1}
          </AppText>
        </View>
      </View>
      {/*  */}
      <AppText className="mt-2 text-base text-darkColor/70">{text2}</AppText>

      {/*  */}
      <Pressable
        onPress={() => Toast.hide()}
        className="absolute right-3 top-3"
      >
        <Ionicons name="close" size={20} color="#E5E7EB" />
      </Pressable>
    </View>
  ),
};

export const AppNotificationToast = () => {
  /*
   * Toast Config
   */
  return <Toast config={toastConfig} />;
};
