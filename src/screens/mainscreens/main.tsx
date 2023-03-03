import { createDrawerNavigator } from "@react-navigation/drawer";
import { useColorMode } from "native-base";
import { FC } from "react";
import { useWindowDimensions } from "react-native";
import { LogoutButton } from "../../components/generalcomponents/roundbutton";
import { ThemeToggler } from "../../components/generalcomponents/themeToggler";
import { useLogout } from "../../utils/customhooks";
import Appointments from "./appointments";
import { DrawerProps } from "./types";

const Drawer = createDrawerNavigator<DrawerProps>();

const MainApp: FC = () => {
  const { width } = useWindowDimensions();
  const [logout, isLoading] = useLogout();

  const { colorMode } = useColorMode();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "slide",
        swipeEdgeWidth: width / 5,
        headerRight: () => (
          <>
            <LogoutButton isLoading={isLoading} onPress={logout} />
            <ThemeToggler />
          </>
        ),
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
