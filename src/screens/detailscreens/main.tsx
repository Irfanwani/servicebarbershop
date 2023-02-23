import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import { themeToggler } from "../../components/generalcomponents/themeToggler";
import BankDetails from "./bankdetails";
import GeneralDetails from "./generaldetails";
import ServiceDetails from "./servicedetails";
import { RootDetailsParmasList } from "./types";

const Stack = createNativeStackNavigator<RootDetailsParmasList>();

const DetailsMain: FC = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: null,
          title: null,
          animation: "slide_from_right",
          headerRight: themeToggler,
        }}
        initialRouteName="servicedetails"
      >
        <Stack.Screen name="generaldetails" component={GeneralDetails} />
        <Stack.Screen name="bankdetails" component={BankDetails} />
        <Stack.Screen name="servicedetails" component={ServiceDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(DetailsMain);
