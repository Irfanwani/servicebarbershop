import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import ForgotPassword from "./forgotpassword";
import LandingPage from "./landingpage";
import Login from "./login";
import Register from "./register";
import { RootAuthStackProps } from "./types";
import VerifyEmail from "./verifyemail";

const Stack = createNativeStackNavigator<RootAuthStackProps>();

const AuthMain: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
        initialRouteName="verifyemail"
      >
        <Stack.Screen name="landingpage" component={LandingPage} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="forgotpassword" component={ForgotPassword} />
        <Stack.Screen name="verifyemail" component={VerifyEmail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(AuthMain);
