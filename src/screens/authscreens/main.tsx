import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import ForgotPassword from "./forgotpassword";
import LandingPage from "./landingpage";
import Login from "./login";
import Register from "./register";
import { RootAuthStackProps } from "./types";

const Stack = createNativeStackNavigator<RootAuthStackProps>();

const AuthMain: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
        initialRouteName="landingpage"
      >
        <Stack.Screen name="landingpage" component={LandingPage} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="forgotpassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthMain;
