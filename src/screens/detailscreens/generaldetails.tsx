import { FC, memo } from "react";
import Profiledetails from "../../components/createupdate/profiledetails";

const GeneralDetails: FC = () => {
  const details = {
    about: "",
    contact: "",
    coords: {
      longitude: 0,
      latitude: 0,
    },
    employee_count: "",
    end_time: "",
    id: null,
    image: "",
    location: "",
    start_time: "",
    service_type: "",
  };
  return (
    <Profiledetails
      updating={false}
      heading="Please fill these details"
      details={details}
    />
  );
};

export default memo(GeneralDetails);
