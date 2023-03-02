import { deleteItemAsync } from "expo-secure-store";
import { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import { useDispatch } from "react-redux";
import { showToast } from "../components/generalcomponents/alerts";
import authApiSlice, {
  useLogoutMutation,
} from "../store/apislices/authapislices";
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
  (): [() => Promise<void>, boolean];
}

export const useLogout: LogoutProps = () => {
  const [lg, { isLoading }] = useLogoutMutation();

  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await lg(null).unwrap();
      await deleteItemAsync("token");
      dispatch(authApiSlice.util.resetApiState());
      showToast("info", "Logged out successfully");
    } catch (err) {
      errorHandler(err);
    }
  };

  return [logout, isLoading];
};