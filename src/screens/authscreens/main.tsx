import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { LogoutButton } from "../../components/generalcomponents/roundbutton";
import { ThemeToggler } from "../../components/generalcomponents/themeToggler";
import { useLogout } from "../../utils/customhooks";
import ForgotPassword from "./forgotpassword";
import LandingPage from "./landingpage";
import Login from "./login";
import Register from "./register";
import { RootAuthStackProps } from "./types";
import VerifyEmail from "./verifyemail";

const Stack = createNativeStackNavigator<RootAuthStackProps>();

const AuthMain: FC = () => {
  const { data } = useSelector((state: any) => ({
    data: state.authApiSlice?.mutations?.logindata?.data,
  }));

  const [logout, isLoading] = useLogout();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
        initialRouteName={!data ? "landingpage" : "verifyemail"}
      >
        {!data ? (
          <>
            <Stack.Screen name="landingpage" component={LandingPage} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="forgotpassword" component={ForgotPassword} />
          </>
        ) : (
          <Stack.Screen
            options={{
              title: null,
              headerShown: true,
              headerTransparent: true,
              headerLeft: () => <ThemeToggler />,
              headerRight: () => (
                <LogoutButton isLoading={isLoading} onPress={logout} />
              ),
            }}
            name="verifyemail"
            component={VerifyEmail}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(AuthMain);
