import { deleteItemAsync } from "expo-secure-store";
import { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import { useDispatch } from "react-redux";
import { showToast } from "../components/generalcomponents/alerts";
import authApiSlice, {
  useLogoutallMutation,
  useLogoutMutation,
} from "../store/apislices/authapislices";
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

  const dispatch = useDispatch();
  const logout = async (logoutall = false) => {
    try {
      if (logoutall) {
        await lgall(null).unwrap();
      } else {
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
