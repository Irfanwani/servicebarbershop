import { FC, memo } from "react";
import Profiledetails from "../../components/createupdate/profiledetails";
import { useAddgeneraldetailsMutation } from "../../store/apislices/detailsapislice";

const GeneralDetails: FC = () => {
  const [detailsMutation, { isLoading }] = useAddgeneraldetailsMutation();

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
  };
  return (
    <Profiledetails
      updating={false}
      detailsMutation={detailsMutation}
      isLoading={isLoading}
      heading="Please fill these details"
      details={details}
    />
  );
};

export default memo(GeneralDetails);
