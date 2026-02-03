import { useProductStore } from "@/base/store/useProductStore";
import { AppText } from "@/components/Global/AppSetup/AppText";
import { ScreenWrapper } from "@/components/Global/AppSetup/ScreenWrapper";
import { DEVICE_WIDTH } from "@/constants/deviceWidth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import { RenderProductItem } from "../Shared/RenderProductItem";

const COLUMN_WIDTH = (DEVICE_WIDTH - 48) / 2;

export const AllProductsScreenIndex = () => {
  const router = useRouter();
  const { products, resetProducts } = useProductStore();
  const productCount = products.length;
  const limit = 5;
  const progress = productCount / limit;

  const handleClearAll = () => {
    Alert.alert(
      "Clear All Products",
      "Are you sure you want to remove all products? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => {
            resetProducts();
            router.back();
          },
        },
      ],
    );
  };

  return (
    <ScreenWrapper coverStatusBar>
      <View className="flex-1 bg-backgroundBase">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-gray-50">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#6C7580" />
          </TouchableOpacity>
          <AppText className="text-base custom-font-bold text-textPrimary">
            All Products
          </AppText>
          <TouchableOpacity
            onPress={handleClearAll}
            disabled={productCount === 0}
          >
            <Ionicons
              name="trash-outline"
              size={22}
              color={productCount === 0 ? "#D1D5DB" : "#EF4444"}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListHeaderComponent={
            <View className="mb-6">
              {/* Stats Card */}
              <View className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-50 mb-8">
                <View className="flex-row justify-between items-center mb-4">
                  <View>
                    <AppText className="text-[10px] custom-font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Total Inventory
                    </AppText>
                    <AppText className="text-xl custom-font-bold text-textPrimary">
                      {productCount} Products
                    </AppText>
                  </View>
                  <View className="bg-backgroundLight px-3 py-1.5 rounded-full">
                    <AppText className="text-primaryColor custom-font-bold text-xs">
                      Limit: {limit}
                    </AppText>
                  </View>
                </View>

                {/* Progress Bar */}
                <View className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                  <View
                    className="h-full bg-primaryColor"
                    style={{ width: `${progress * 100}%` }}
                  />
                </View>

                <AppText className="text-[10px] text-gray-400">
                  {Math.round(progress * 100)}% of your free limit used
                </AppText>
              </View>

              <View className="flex-row items-center justify-between mb-4">
                <AppText className="text-lg custom-font-bold text-textPrimary">
                  Product History
                </AppText>
                {productCount > 0 && (
                  <TouchableOpacity onPress={handleClearAll}>
                    <AppText className="text-red-500 custom-font-bold text-[10px] uppercase tracking-wider">
                      Clear All
                    </AppText>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          }
          renderItem={({ item }) => <RenderProductItem item={item} />}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <View className="w-20 h-20 bg-gray-50 rounded-full items-center justify-center mb-4">
                <Ionicons name="cube-outline" size={40} color="#D1D5DB" />
              </View>
              <AppText className="text-gray-400 custom-font-medium mb-1">
                No products found
              </AppText>
              <TouchableOpacity onPress={() => router.push("/add-product")}>
                <AppText className="text-primaryColor custom-font-bold">
                  Add your first product
                </AppText>
              </TouchableOpacity>
            </View>
          }
        />

        {/* FAB to add more */}
        {productCount < limit && (
          <TouchableOpacity
            onPress={() => router.push("/add-product")}
            className="absolute bottom-8 right-6 w-14 h-14 bg-primaryColor rounded-full items-center justify-center shadow-lg shadow-primaryColor/40"
            style={{ elevation: 5 }}
          >
            <Ionicons name="add" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </ScreenWrapper>
  );
};
