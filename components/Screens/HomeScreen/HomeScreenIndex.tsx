import { useProductStore } from "@/base/store/useProductStore";
import { AppButton } from "@/components/Global/AppSetup/AppButton";
import { AppText } from "@/components/Global/AppSetup/AppText";
import { ScreenWrapper } from "@/components/Global/AppSetup/ScreenWrapper";
import { RenderProductItem } from "@/components/Screens/Shared/RenderProductItem";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

export const HomeScreenIndex = () => {
  const router = useRouter();
  const { products, resetProducts } = useProductStore();
  const productCount = products.length;
  const limit = 5;
  const progress = productCount / limit;

  const handleClearAll = () => {
    resetProducts();
  };

  return (
    <ScreenWrapper style={{ paddingTop: 40 }} coverStatusBar={false}>
      <View className="flex-1 bg-backgroundBase">
        {/* Header */}
        
          {productCount > 0 && (
            <AppButton
              className="bg-red-50 px-4 py-3 gap-2 mt-5"
              onPress={handleClearAll}
              smSize
            >
              <AppText className="text-[#EF4444] custom-font-bold text-xs">
                Reset All
              </AppText>
              <Ionicons name="trash-outline" size={16} color="#EF4444" />
            </AppButton>
          )}
        

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

              <AppText className="text-lg custom-font-bold text-textPrimary mb-4">
                Active Listings
              </AppText>
            </View>
          }
          renderItem={({ item }) => <RenderProductItem item={item} />}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-10">
              <View className="w-20 h-20 bg-gray-50 rounded-full items-center justify-center mb-4">
                <Ionicons name="cube-outline" size={40} color="#D1D5DB" />
              </View>
              <AppText className="text-base custom-font-bold text-gray-400 uppercase mt-2 text-center">
                You don't have any products yet.
              </AppText>
              <AppText className="text-sm custom-font-medium text-gray-400 mt-2 text-center px-10">
                Add a product to get started, by clicking the plus button below.
              </AppText>
            </View>
          }
        />

        {/* FAB */}
        <AppButton
          onPress={() => router.push("/add-product")}
          className="absolute bottom-16 right-6 w-14 h-14 bg-primaryColor rounded-full items-center justify-center shadow-lg shadow-primaryColor/40 p-0"
          style={{ elevation: 5 }}
        >
          <Ionicons name="add" size={30} color="white" />
        </AppButton>
      </View>
    </ScreenWrapper>
  );
};
