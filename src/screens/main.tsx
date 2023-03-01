import { FC, memo } from "react";
import AuthMain from "./authscreens/main";
import DetailsMain from "./detailscreens/main";
import { useSelector } from "react-redux";
import { Button } from "native-base";
import { useLogout } from "../utils/customhooks";

const Main: FC = () => {
  const { verified } = useSelector((state: any) => ({
    verified: state.authApiSlice?.mutations?.logindata?.data?.verified,
  }));

  const [logout, isLoading] = useLogout();

  return (
    <>
      {verified ? <DetailsMain /> : <AuthMain />}
      <Button isLoading={isLoading} onPress={logout}>
        logout
      </Button>
    </>
  );
};

export default memo(Main);
