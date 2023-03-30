import { NativeBaseProvider } from "native-base";
import { FC, memo, useEffect } from "react";
import { StatusBar } from "react-native";
import Main from "./src/screens/main";

import { Provider } from "react-redux";

import { enableFreeze, enableScreens } from "react-native-screens";
import { persistor, store } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./src/components/generalcomponents/loader";

import { LogBox } from "react-native";
import { colorModeManager, config, theme } from "./src/theme";
import { setNotificationHandler } from "expo-notifications";
import { registerForPushNotificationsAsync } from "./src/utils/customhooks";

LogBox.ignoreLogs([
  'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
]);

enableFreeze(true);
enableScreens(true);

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App: FC = () => {
  useEffect(() => {
    (async () => {
      let token = await registerForPushNotificationsAsync();
      console.log(token, 'token');
    })();
  }, []);
  return (
    <NativeBaseProvider
      theme={theme}
      colorModeManager={colorModeManager}
      config={config}
    >
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
