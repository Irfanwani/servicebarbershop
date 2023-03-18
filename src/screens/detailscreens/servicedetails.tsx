import { FC } from "react";
import Servicedetails from "../../components/createupdate/servicedetails";
import { services } from "./constants";

const ServiceDetails: FC = () => {
  return (
    <Servicedetails
      servicesSelected={{}}
      message="Registration Completed!"
      updating={false}
      services={services}
    />
  );
};

export default ServiceDetails;
