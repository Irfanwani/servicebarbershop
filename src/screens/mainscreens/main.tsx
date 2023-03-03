import { createDrawerNavigator } from "@react-navigation/drawer";
import { useColorMode } from "native-base";
import { FC } from "react";
import { useWindowDimensions } from "react-native";
import { ThemeToggler } from "../../components/generalcomponents/themeToggler";
import Appointments from "./appointments";
import { DrawerProps } from "./types";

const Drawer = createDrawerNavigator<DrawerProps>();

const MainApp: FC = () => {
  const { width } = useWindowDimensions();

  const { colorMode } = useColorMode();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "slide",
        swipeEdgeWidth: width / 5,
        headerRight: () => <ThemeToggler />,
      }}
      initialRouteName="appointments"
    >
      <Drawer.Screen
        options={{
          headerTitle: "Appointments",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTintColor: colorMode == "light" ? "black" : "white",
        }}
        name="appointments"
        component={Appointments}
      />
    </Drawer.Navigator>
  );
};

export default MainApp;
