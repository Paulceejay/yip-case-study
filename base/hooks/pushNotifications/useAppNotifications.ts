import notifee from "@notifee/react-native";
import { useEffect } from "react";

export const useAppNotifications = () => {
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        await notifee.requestPermission();
      } catch (error) {
        console.error("Failed to request notification permission:", error);
      }
    };

    requestPermissions();
  }, []);
};
