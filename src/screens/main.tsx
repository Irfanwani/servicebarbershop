import { FC, memo } from "react";
import AuthMain from "./authscreens/main";
import DetailsMain from "./detailscreens/main";
import { deleteItemAsync } from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "native-base";
import authApiSlice, {
  useLogoutMutation,
} from "../store/apislices/authapislices";
import { errorHandler } from "../utils/errorhandler";
import { showToast } from "../components/generalcomponents/alerts";

const Main: FC = () => {
  const { verified } = useSelector((state: any) => ({
    verified: state.authApiSlice?.mutations?.logindata?.data?.verified,
  }));

  const [lg, { isLoading }] = useLogoutMutation();

  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await lg(null).unwrap();
      await deleteItemAsync("token");
      dispatch(authApiSlice.util.resetApiState());
      showToast("info", "Logged out successfully");
    } catch (err) {
      errorHandler(err);
    }
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
