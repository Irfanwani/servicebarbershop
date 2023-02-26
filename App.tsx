import { ColorMode, NativeBaseProvider, StorageManager } from "native-base";
import { FC, memo } from "react";
import { StatusBar } from "react-native";
import Main from "./src/screens/main";

import { Provider } from "react-redux";

import { enableFreeze } from "react-native-screens";
import { persistor, store } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./src/components/generalcomponents/loader";

import { LogBox } from "react-native";
import { theme } from "./src/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

LogBox.ignoreLogs([
  'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
]);

enableFreeze(true);

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem("@color-mode");
      return val === "dark" ? "dark" : "light";
    } catch (e) {
      return "light";
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem("@color-mode", value);
    } catch (e) {}
  },
};

const App: FC = () => {
  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loader />}>
          <StatusBar backgroundColor="transparent" translucent />
          <Main />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
};

export default memo(App);
