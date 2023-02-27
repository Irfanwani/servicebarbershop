import { FC, memo, useEffect, useState } from "react";
import AuthMain from "./authscreens/main";
import DetailsMain from "./detailscreens/main";
import { getItemAsync } from "expo-secure-store";
import Loader from "../components/generalcomponents/loader";

const Main: FC = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItemAsync("token").then((token) => {
      setToken(token);
      alert(token);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return token ? <DetailsMain /> : <AuthMain />;
};

export default memo(Main);
