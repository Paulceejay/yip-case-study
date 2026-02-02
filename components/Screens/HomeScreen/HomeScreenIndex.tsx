import { useProductStore } from "@/base/store/useProductStore";
import { AppText } from "@/components/Global/AppSetup/AppText";
import { ScreenWrapper } from "@/components/Global/AppSetup/ScreenWrapper";
import { DEVICE_WIDTH } from "@/constants/deviceWidth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { RenderProductItem } from "./RenderProductItem";

const COLUMN_WIDTH = (DEVICE_WIDTH - 48) / 2;

export const HomeScreenIndex = () => {
  const router = useRouter();
  const { products } = useProductStore();
  const productCount = products.length;
  const limit = 5;
  const progress = productCount / limit;

  return (
    <ScreenWrapper coverStatusBar>
      <View className="flex-1 bg-backgroundBase">
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListHeaderComponent={
            <View className="mb-6">
              {/* Quota Card */}
              <View className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-50 mb-8">
                <View className="flex-row justify-between items-start mb-4">
                  <View>
                    <AppText className="text-[10px] custom-font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Inventory Limit
                    </AppText>
                    <AppText className="text-xl custom-font-bold text-textPrimary">
                      Free Plan
                    </AppText>
                  </View>
                  <View className="bg-backgroundLight px-3 py-1.5 rounded-full">
                    <AppText className="text-primaryColor custom-font-bold text-xs">
                      {productCount} / {limit} Products
                    </AppText>
                  </View>
                </View>

                {/* Progress Bar */}
                <View className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
                  <View
                    className="h-full bg-primaryColor"
                    style={{ width: `${progress * 100}%` }}
                  />
                </View>

                <AppText className="text-xs text-gray-400 leading-5">
                  Upgrade to Pro for unlimited product listings and advanced
                  analytics.
                </AppText>
              </View>

              {/* Section Title */}
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <AppText className="text-lg custom-font-bold text-textPrimary">
                    Active Inventory
                  </AppText>
                  <AppText className="text-xs text-gray-400">
                    Managing {productCount} Items
                  </AppText>
                </View>
                <TouchableOpacity>
                  <AppText className="text-primaryColor custom-font-bold text-[10px] uppercase tracking-wider">
                    Sort By
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          }
          renderItem={({ item }) => <RenderProductItem item={item} />}
          ListEmptyComponent={
            <View
              style={{ width: COLUMN_WIDTH }}
              className="bg-white rounded-[20px] h-48 border border-dashed border-gray-200 items-center justify-center"
            >
              <Ionicons name="add-outline" size={24} color="#D1D5DB" />
              <AppText className="text-[10px] custom-font-bold text-gray-400 uppercase mt-2">
                Add Product
              </AppText>
            </View>
          }
        />

        {/* FAB */}
        <TouchableOpacity
          onPress={() => router.push("/add-product")}
          className="absolute bottom-8 right-6 w-14 h-14 bg-primaryColor rounded-full items-center justify-center shadow-lg shadow-primaryColor/40"
          style={{ elevation: 5 }}
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};
