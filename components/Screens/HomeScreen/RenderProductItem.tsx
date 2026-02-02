import { Product } from "@/base/store/useProductStore";
import { AppText } from "@/components/Global/AppSetup/AppText";
import { DEVICE_WIDTH } from "@/constants/deviceWidth";
import React from "react";
import { Image, View } from "react-native";

const COLUMN_WIDTH = (DEVICE_WIDTH - 48) / 2;

export const RenderProductItem = ({ item }: { item: Product }) => (
  <View
    style={{ width: COLUMN_WIDTH }}
    className="mb-4 bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm"
  >
    <View className="relative">
      <Image
        source={{ uri: item.photoUri }}
        className="w-full h-40"
        resizeMode="cover"
      />
    </View>
    <View className="p-3">
      <AppText
        className="text-sm custom-font-semibold text-textPrimary mb-1"
        numberOfLines={1}
      >
        {item.name}
      </AppText>
      <AppText className="text-xs custom-font-medium text-gray-500 mb-2">
        ${item.price}
      </AppText>
      <View className="flex-row items-center">
        <View className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />
        <AppText className="text-[10px] custom-font-bold text-gray-400 uppercase">
          Available
        </AppText>
      </View>
    </View>
  </View>
);
