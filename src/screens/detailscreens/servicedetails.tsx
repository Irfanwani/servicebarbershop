import { FC } from "react";
import Servicedetails from "../../components/createupdate/servicedetails";

const ServiceDetails: FC = () => {
  return (
    <Servicedetails
      servicesSelected={{}}
      message="Registration Completed!"
      updating={false}
    />
  );
};

export default ServiceDetails;
