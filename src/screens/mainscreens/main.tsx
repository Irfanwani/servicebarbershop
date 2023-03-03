import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon, useColorMode } from "native-base";
import { FC } from "react";
import { useWindowDimensions } from "react-native";
import CustomDrawer from "../../components/customdrawer/customdrawer";
import Appointments from "./appointments";
import Profile from "./profile";
import Settings from "./settings";
import { DrawerProps } from "./types";
import { MaterialIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator<DrawerProps>();

const MainApp: FC = () => {
  const { width } = useWindowDimensions();

  const { colorMode } = useColorMode();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerType: "slide",
        swipeEdgeWidth: width / 5,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerTintColor: colorMode == "light" ? "black" : "white",
      }}
      initialRouteName="appointments"
    >
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Icon as={MaterialIcons} name="work" color={color} />
          ),
          headerTitle: "Appointments",
        }}
        name="appointments"
        component={Appointments}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Icon as={MaterialIcons} name="person" color={color} />
          ),
          headerTitle: "Profile",
        }}
        name="profile"
        component={Profile}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Icon as={MaterialIcons} name="settings" color={color} />
          ),
          headerTitle: "Settings",
        }}
        name="settings"
        component={Settings}
      />
    </Drawer.Navigator>
  );
};

export default MainApp;
