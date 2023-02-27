import { FC, memo } from "react";
import AuthMain from "./authscreens/main";
import DetailsMain from "./detailscreens/main";
import { deleteItemAsync } from "expo-secure-store";
import { useSelector } from "react-redux";
import { Button } from "native-base";
import { useLogoutMutation } from "../store/apislices/authapislices";

const Main: FC = () => {
  const { verified } = useSelector((state: any) => ({
    verified: state.authApiSlice?.mutations?.logindata?.data?.verified,
  }));

  const [lg, { isLoading }] = useLogoutMutation();

  const logout = async () => {
    await lg(null).unwrap();

    await deleteItemAsync("token");
  };

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
