import { FC, memo } from "react";
import AuthMain from "./authscreens/main";
import DetailsMain from "./detailscreens/main";
import { useSelector } from "react-redux";
import MainApp from "./mainscreens/main";
import { NavigationContainer } from "@react-navigation/native";

const Main: FC = () => {
  const { verified, services_added } = useSelector((state: any) => ({
    verified: state.authApiSlice?.mutations?.logindata?.data?.verified,
    services_added:
      state.authApiSlice?.mutations?.logindata?.data?.services_added,
  }));

  return (
    <NavigationContainer>
      {verified ? services_added ? <MainApp /> : <DetailsMain /> : <AuthMain />}
    </NavigationContainer>
  );
};

export default memo(Main);
