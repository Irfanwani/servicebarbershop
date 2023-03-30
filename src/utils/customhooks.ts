import { isDevice } from "expo-device";
import {
  getExpoPushTokenAsync,
  setNotificationChannelAsync,
  AndroidImportance,
  getPermissionsAsync,
  requestPermissionsAsync,
} from "expo-notifications";
import { deleteItemAsync } from "expo-secure-store";
import { useState, useEffect } from "react";
import { Keyboard, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { showToast } from "../components/generalcomponents/alerts";
import authApiSlice, {
  useLogoutallMutation,
  useLogoutMutation,
} from "../store/apislices/authapislices";
import {
  useRemovetokenMutation,
  useSavetokenMutation,
} from "../store/apislices/mainapislices";
import { logoutaction } from "../store/slice";
import { errorHandler } from "./errorhandler";

export const useKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};

interface LogoutProps {
  (): [(logoutall?: boolean) => Promise<void>, boolean];
}

export const useLogout: LogoutProps = () => {
  const [lg, { isLoading }] = useLogoutMutation();

  const [lgall, { isLoading: lgAllLoading }] = useLogoutallMutation();
  const [removeToken] = useRemovetokenMutation();

  const dispatch = useDispatch();
  const logout = async (logoutall = false) => {
    try {
      if (logoutall) {
        await removeToken({ body: null, method: "PUT" }).unwrap();
        await lgall(null).unwrap();
      } else {
        let token = await registerForPushNotificationsAsync();
        await removeToken({ body: { token }, method: "PUT" }).unwrap();
        await lg(null).unwrap();
      }
      dispatch(logoutaction());
      await deleteItemAsync("token");
      dispatch(authApiSlice.util.resetApiState());

      showToast("info", "Logged out successfully");
    } catch (err) {
      errorHandler(err);
    }
  };

  return [logout, isLoading ? isLoading : lgAllLoading];
};

export const useIsReady = () => {
  const [loading, setLoading] = useState(true);

  requestAnimationFrame(() => {
    setLoading(false);
  });

  return loading;
};

export const registerForPushNotificationsAsync = async () => {
  let token: string;
  if (isDevice) {
    const { status: existingStatus } = await getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (
      await getExpoPushTokenAsync({
        experienceId: "@irfanwani/servicebarbershop",
      })
    ).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    setNotificationChannelAsync("default", {
      name: "default",
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

export const useCustomNotifications = () => {
  const [saveToken] = useSavetokenMutation();

  const getToken = async (id: number) => {
    let token = await registerForPushNotificationsAsync();
    try {
      await saveToken({ id, token }).unwrap();
    } catch (err) {
      errorHandler(err);
    }
  };

  return getToken;
};
