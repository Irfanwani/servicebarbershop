import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import BankDetails from "./bankdetails";
import GeneralDetails from "./generaldetails";
import { RootDetailsParmasList } from "./types";

const Stack = createNativeStackNavigator<RootDetailsParmasList>();

const DetailsMain: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
        initialRouteName="bankdetails"
      >
        <Stack.Screen name="generaldetails" component={GeneralDetails} />
        <Stack.Screen name="bankdetails" component={BankDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default DetailsMain;
