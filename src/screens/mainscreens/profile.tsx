import { useColorMode } from "native-base";
import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { authDetails, UserType } from "../../store/slice";
import Generaldetails from "../detailscreens/generaldetails";

const Profile: FC = () => {
  const { details } = useSelector<any, UserType>(authDetails);

  const { colorMode } = useColorMode();
  return <Generaldetails updating={true} />;
};

export default memo(Profile);
