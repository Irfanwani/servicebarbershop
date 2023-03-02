import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { LogoutButton } from "../../components/generalcomponents/roundbutton";
import { ThemeToggler } from "../../components/generalcomponents/themeToggler";
import { useLogout } from "../../utils/customhooks";
import BankDetails from "./bankdetails";
import GeneralDetails from "./generaldetails";
import ServiceDetails from "./servicedetails";
import { RootDetailsParmasList } from "./types";

const Stack = createNativeStackNavigator<RootDetailsParmasList>();

const DetailsMain: FC = () => {
  const { details_added, account_added } = useSelector((state: any) => ({
    details_added: state.authApiSlice?.mutations?.logindata?.data?.details,
    account_added:
      state.authApiSlice?.mutations?.logindata?.data?.account_added,
  }));

  const [logout, isLoading] = useLogout();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: null,
          headerShown: true,
          headerTransparent: true,
          headerLeft: () => <ThemeToggler />,
          headerRight: () => (
            <LogoutButton isLoading={isLoading} onPress={logout} />
          ),
          animation: "slide_from_right",
        }}
      >
        {!details_added ? (
          <Stack.Screen name="generaldetails" component={GeneralDetails} />
        ) : !account_added ? (
          <Stack.Screen name="bankdetails" component={BankDetails} />
        ) : (
          <Stack.Screen name="servicedetails" component={ServiceDetails} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(DetailsMain);
