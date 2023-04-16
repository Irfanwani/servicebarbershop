import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { authDetails, UserType } from "../../store/slice";
import Profiledetails from "../../components/createupdate/profiledetails";
import { useIsReady } from "../../utils/customhooks";
import Loader from "../../components/generalcomponents/loader";

const Profile: FC = () => {
  const { details } = useSelector<any, UserType>(authDetails);

  let { coords } = details;

  let newcoords = getCoords(coords);

  const notReady = useIsReady();

  if (notReady) return <Loader />;

  return (
    <Profiledetails
      updating={true}
      details={{ ...details, coords: newcoords }}
      heading="Update Profile Here!"
    />
  );
};

export default memo(Profile);

const getCoords = (coords: string) => {
  let lng = coords.slice(coords.indexOf("(") + 1, coords.lastIndexOf(" "));

  let lat = coords.slice(coords.lastIndexOf(" ") + 1, coords.length - 1);

  return {
    latitude: Number(lat),
    longitude: Number(lng),
  };
};
