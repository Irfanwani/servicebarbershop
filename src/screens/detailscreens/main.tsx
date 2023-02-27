import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import { useSelector } from "react-redux";
import BankDetails from "./bankdetails";
import GeneralDetails from "./generaldetails";
import ServiceDetails from "./servicedetails";
import { RootDetailsParmasList } from "./types";

const Stack = createNativeStackNavigator<RootDetailsParmasList>();

let detailsadded = true;
let bankadded = false;


const DetailsMain: FC = () => {
  const state = useSelector(state => state)
  console.log(JSON.stringify(state))
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        {!detailsadded ? (
          <Stack.Screen name="generaldetails" component={GeneralDetails} />
        ) : !bankadded ? (
          <Stack.Screen name="bankdetails" component={BankDetails} />
        ) : (
          <Stack.Screen name="servicedetails" component={ServiceDetails} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(DetailsMain);
