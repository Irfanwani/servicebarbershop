import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import LandingPage from "./landingpage";

const Stack = createNativeStackNavigator();

const AuthMain: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="landingpage" component={LandingPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthMain;
