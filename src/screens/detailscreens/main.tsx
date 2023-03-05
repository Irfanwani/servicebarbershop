import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { LogoutButton } from "../../components/generalcomponents/roundbutton";
import { ThemeToggler } from "../../components/generalcomponents/themeToggler";
import { authDetails, UserType } from "../../store/slice";
import { useLogout } from "../../utils/customhooks";
import BankDetails from "./bankdetails";
import GeneralDetails from "./generaldetails";
import ServiceDetails from "./servicedetails";
import { RootDetailsParmasList } from "./types";

const Stack = createNativeStackNavigator<RootDetailsParmasList>();

const DetailsMain: FC = () => {
  const { details, account_added } = useSelector<any, UserType[]>(
    authDetails
  )?.[0];

  const [logout, isLoading] = useLogout();

  return (
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
      {!details ? (
        <Stack.Screen name="generaldetails" component={GeneralDetails} />
      ) : !account_added ? (
        <Stack.Screen name="bankdetails" component={BankDetails} />
      ) : (
        <Stack.Screen name="servicedetails" component={ServiceDetails} />
      )}
    </Stack.Navigator>
  );
};

export default memo(DetailsMain);
