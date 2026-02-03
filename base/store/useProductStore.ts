import notifee, { AndroidImportance } from "@notifee/react-native";
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
      try {
        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
          id: "default",
          name: "Default Channel",
          importance: AndroidImportance.HIGH,
        });

        // Display a notification
        await notifee.displayNotification({
          title: "Product Limit Reached",
          body: "You have uploaded the maximum of 5 products.",
          android: {
            channelId,
            importance: AndroidImportance.HIGH,
            pressAction: {
              id: "default",
            },
          },
        });
      } catch (error) {
        console.error("Failed to show notification:", error);
      }
    }
  },
  resetProducts: () => set({ products: [] }),
}));
