import { FC } from "react";
import Servicedetails from "../../components/createupdate/servicedetails";
import { useAddserviceDetailsMutation } from "../../store/apislices/detailsapislice";

const ServiceDetails: FC = () => {
  const [servicesMutation, { isLoading }] = useAddserviceDetailsMutation();
  return (
    <Servicedetails
      servicesMutation={servicesMutation}
      isLoading={isLoading}
      servicesSelected={{}}
      message="Registration Completed!"
      updating={false}
    />
  );
};

export default ServiceDetails;
