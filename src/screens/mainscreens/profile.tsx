import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { authDetails, UserType } from "../../store/slice";
import Profiledetails from "../../components/createupdate/profiledetails";

const Profile: FC = () => {
  const { details } = useSelector<any, UserType>(authDetails);

  return <Profiledetails updating={true} />;
};

export default memo(Profile);
