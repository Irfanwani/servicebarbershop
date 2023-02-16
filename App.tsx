import { NativeBaseProvider } from "native-base";
import { FC } from "react";
import { StatusBar } from "react-native";
import Main from "./src/screens/main";

import { Provider } from "react-redux";

import { enableFreeze } from "react-native-screens";
import { persistor, store } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./src/utils/loader";

enableFreeze(true);

const App: FC = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loader />}>
          <StatusBar backgroundColor="transparent" translucent />
          <Main />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
