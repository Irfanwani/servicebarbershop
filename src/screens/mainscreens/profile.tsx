import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { authDetails, UserType } from "../../store/slice";
import Profiledetails from "../../components/createupdate/profiledetails";

const Profile: FC = () => {
  const { details } = useSelector<any, UserType>(authDetails);

  let { coords } = details;

  let newcoords = getCoords(coords);

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
