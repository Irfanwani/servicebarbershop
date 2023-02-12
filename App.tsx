import { NativeBaseProvider } from "native-base";
import { FC } from "react";
import { StatusBar } from "react-native";
import Main from "./src/screens/main";

const App: FC = () => {
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="transparent" translucent />
      <Main />
    </NativeBaseProvider>
  );
};

export default App;
