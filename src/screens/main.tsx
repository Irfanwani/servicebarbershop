import { FC, memo } from "react";
import AuthMain from "./authscreens/main";
import DetailsMain from "./detailscreens/main";
import { useSelector } from "react-redux";

const Main: FC = () => {
  const { verified, services_added } = useSelector((state: any) => ({
    verified: state.authApiSlice?.mutations?.logindata?.data?.verified,
    services_added:
      state.authApiSlice?.mutations?.logindata?.data?.services_added,
  }));

  return verified ? services_added ? <></> : <DetailsMain /> : <AuthMain />;
};

export default memo(Main);
