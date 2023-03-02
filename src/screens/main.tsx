import { FC, memo } from "react";
import AuthMain from "./authscreens/main";
import DetailsMain from "./detailscreens/main";
import { useSelector } from "react-redux";
import { Button } from "native-base";
import { useLogout } from "../utils/customhooks";

const Main: FC = () => {
  const { verified, services_added } = useSelector((state: any) => ({
    verified: state.authApiSlice?.mutations?.logindata?.data?.verified,
    services_added:
      state.authApiSlice?.mutations?.logindata?.data?.services_added,
  }));

  const [logout, isLoading] = useLogout();

  return (
    <>
      {verified ? services_added ? <></> : <DetailsMain /> : <AuthMain />}
      <Button isLoading={isLoading} onPress={logout}>
        logout
      </Button>
    </>
  );
};

export default memo(Main);
