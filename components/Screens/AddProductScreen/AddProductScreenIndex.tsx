import { useProductStore } from "@/base/store/useProductStore";
import { AppButton } from "@/components/Global/AppSetup/AppButton";
import { AppText } from "@/components/Global/AppSetup/AppText";
import { ScreenWrapper } from "@/components/Global/AppSetup/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const AddProductScreenIndex = () => {
  const router = useRouter();
  const { products, addProduct } = useProductStore();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !price || !image) {
      Alert.alert("Error", "Please fill in all fields and select a photo.");
      return;
    }

    if (products.length >= 5) {
      Alert.alert("Limit Reached", "You can only upload up to 5 products.");
      return;
    }

    setLoading(true);
    try {
      await addProduct({
        name,
        price,
        photoUri: image,
      });

      Alert.alert("Success", "Product added successfully!");
      setName("");
      setPrice("");
      setImage(null);
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper coverStatusBar>
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-50">
          <View className="w-8" />
          <AppText className="text-base custom-font-bold text-textPrimary">
            Add New Product
          </AppText>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="#6C7580" />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
        >
          {/* Image Picker */}
          <View className="items-center justify-center my-8">
            <TouchableOpacity
              onPress={pickImage}
              className="w-full aspect-square bg-[#F3F4F6] rounded-[32px] overflow-hidden border border-dashed border-gray-300 items-center justify-center"
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
            </TouchableOpacity>
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
                onChangeText={setName}
                placeholderTextColor="#D1D5DB"
              />
            </View>

            <View>
              <AppText className="text-xs custom-font-bold text-gray-500 uppercase tracking-widest mb-2">
                Price ($)
              </AppText>
              <TextInput
                className="bg-white border border-gray-100 rounded-xl p-4 text-textPrimary custom-font-medium"
                placeholder="$ 0.00"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholderTextColor="#D1D5DB"
              />
            </View>

            <View>
              <AppText className="text-xs custom-font-bold text-gray-500 uppercase tracking-widest mb-2">
                Category
              </AppText>
              <TouchableOpacity className="flex-row items-center justify-between bg-white border border-gray-100 rounded-xl p-4">
                <AppText className="text-gray-400 custom-font-medium">
                  Select a category
                </AppText>
                <Ionicons name="chevron-down" size={20} color="#D1D5DB" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Buttons */}
          <View className="space-y-3 mb-10">
            <AppButton
              onPress={handleAddProduct}
              isLoading={loading}
              disabled={products.length >= 5}
              className="bg-primaryColor rounded-xl h-[56px]"
            >
              <AppText className="text-white custom-font-bold">
                Save Product
              </AppText>
            </AppButton>

            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-gray-50 rounded-xl h-[56px] items-center justify-center"
            >
              <AppText className="text-textPrimary custom-font-bold">
                Cancel
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};
