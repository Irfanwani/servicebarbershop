import LandingPage from "./src/screens/authscreens/landingpage";
import { NativeBaseProvider } from "native-base";
import { FC } from "react";
import { StatusBar } from "react-native";

const App: FC = () => {
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="transparent" translucent />
      <LandingPage />
    </NativeBaseProvider>
  );
};

export default App;
