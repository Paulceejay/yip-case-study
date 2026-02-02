import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message";
import { create } from "zustand";

export interface Product {
  id: string;
  name: string;
  price: string;
  photoUri: string;
}

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  resetProducts: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  addProduct: async (newProduct) => {
    const { products } = get();
    if (products.length >= 5) {
      Toast.show({
        type: "errorToast",
        text1: "Limit Reached",
        text2: "You have uploaded the maximum of 5 products.",
      });
      return;
    }

    const updatedProducts = [
      ...products,
      { ...newProduct, id: Date.now().toString() },
    ];
    set({ products: updatedProducts });

    Toast.show({
      type: "successToast",
      text1: "Product Added",
      text2: `${newProduct.name} saved successfully.`,
    });

    if (updatedProducts.length === 5) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Product Limit Reached",
          body: "You have uploaded the maximum of 5 products.",
        },
        trigger: null, // immediate
      });
    }
  },
  resetProducts: () => set({ products: [] }),
}));
