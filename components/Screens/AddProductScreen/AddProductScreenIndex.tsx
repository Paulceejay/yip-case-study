import { useProductStore } from "@/base/store/useProductStore";
import { AppButton } from "@/components/Global/AppSetup/AppButton";
import { AppText } from "@/components/Global/AppSetup/AppText";
import { ScreenWrapper } from "@/components/Global/AppSetup/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, TextInput, View } from "react-native";

export const AddProductScreenIndex = () => {
  const router = useRouter();
  const { products, addProduct } = useProductStore();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setErrorMessage(null);
    }
  };

  const handleAddProduct = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!name || !price || !image) {
      setErrorMessage("Please fill in all fields and select a photo.");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    if (products.length >= 5) {
      setErrorMessage("Limit Reached: You can only upload up to 5 products.");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    setLoading(true);
    try {
      await addProduct({
        name,
        price,
        photoUri: image,
      });

      setSuccessMessage("Product added successfully!");
      setName("");
      setPrice("");
      setImage(null);

      // Navigate back after a short delay to show success message
      setTimeout(() => {
        router.push("/home");
        setSuccessMessage(null);
      }, 1500);
    } catch (error) {
      setErrorMessage("Failed to add product. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper coverStatusBar={false}>
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-50">
          <View className="w-8" />
          <AppText className="text-base custom-font-bold text-textPrimary">
            Add New Product
          </AppText>
          <AppButton onPress={() => router.back()} className="p-1" smSize>
            <Ionicons name="close" size={24} color="#6C7580" />
          </AppButton>
        </View>

        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
        >
          {/* Error/Success Messages */}
          {errorMessage && (
            <View className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100">
              <AppText className="text-red-500 text-sm custom-font-bold text-center">
                {errorMessage}
              </AppText>
            </View>
          )}

          {successMessage && (
            <View className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100">
              <AppText className="text-green-600 text-sm custom-font-bold text-center">
                {successMessage}
              </AppText>
            </View>
          )}

          {/* Image Picker */}
          <View className="items-center justify-center my-8">
            <AppButton
              onPress={pickImage}
              className="w-full aspect-square bg-[#F3F4F6] rounded-[32px] overflow-hidden border border-dashed border-gray-300 items-center justify-center p-0"
            >
              {image ? (
                <Image source={{ uri: image }} className="w-full h-full" />
              ) : (
                <View className="items-center">
                  <View className="w-16 h-16 rounded-full bg-primaryColor items-center justify-center mb-4">
                    <Ionicons name="camera" size={28} color="white" />
                  </View>
                  <AppText className="text-gray-400 custom-font-medium text-sm">
                    Add Product Photo
                  </AppText>
                </View>
              )}
            </AppButton>
          </View>

          {/* Form Fields */}
          <View className="space-y-6 mb-10">
            <View>
              <AppText className="text-xs custom-font-bold text-gray-500 uppercase tracking-widest mb-2">
                Product Name
              </AppText>
              <TextInput
                className="bg-white border border-gray-100 rounded-xl p-4 text-textPrimary custom-font-medium"
                placeholder="e.g., Handmade Ceramic Mug"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setErrorMessage(null);
                }}
                placeholderTextColor="#D1D5DB"
              />
            </View>

            <View className="mt-4">
              <AppText className="text-xs custom-font-bold text-gray-500 uppercase tracking-widest mb-2">
                Price (#)
              </AppText>
              <TextInput
                className="bg-white border border-gray-100 rounded-xl p-4 text-textPrimary custom-font-medium"
                placeholder="# 0.00"
                value={price}
                onChangeText={(text) => {
                  setPrice(text);
                  setErrorMessage(null);
                }}
                keyboardType="numeric"
                placeholderTextColor="#D1D5DB"
              />
            </View>
          </View>

          {/* Buttons */}
          <View className="space-y-3 mb-10">
            <AppButton
              onPress={handleAddProduct}
              isLoading={loading}
              disabled={products.length >= 5 && !successMessage}
              className="bg-primaryColor rounded-xl h-[56px]"
            >
              <AppText className="text-white custom-font-bold">
                Save Product
              </AppText>
            </AppButton>

            <AppButton
              onPress={() => router.back()}
              className="bg-gray-50 rounded-xl h-[56px] items-center justify-center mt-3"
            >
              <AppText className="text-textPrimary custom-font-bold">
                Cancel
              </AppText>
            </AppButton>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};
