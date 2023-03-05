import { FC, memo, useState } from "react";
import AuthMain from "./authscreens/main";
import DetailsMain from "./detailscreens/main";
import { useSelector } from "react-redux";
import MainApp from "./mainscreens/main";
import { NavigationContainer } from "@react-navigation/native";
import { MyDarkTheme, MyLightTheme } from "../theme";
import { useColorMode } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/generalcomponents/loader";
import { authDetails, UserType } from "../store/slice";

const Main: FC = () => {
  const data = useSelector<any, UserType[]>(authDetails)?.[0];

  const { colorMode } = useColorMode();

  const [colormode, setColorMode] = useState(null);
  (async () => {
    let cm = await AsyncStorage.getItem("@color-mode");
    setColorMode(cm ?? "light");
  })();

  if (!colormode) return <Loader />;
  return (
    <NavigationContainer
      theme={colorMode == "dark" ? MyDarkTheme : MyLightTheme}
    >
      {data?.verified ? (
        data?.services_added ? (
          <MainApp />
        ) : (
          <DetailsMain />
        )
      ) : (
        <AuthMain />
      )}
    </NavigationContainer>
  );
};

export default memo(Main);
