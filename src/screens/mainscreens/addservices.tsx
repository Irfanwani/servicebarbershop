import { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Servicedetails from "../../components/createupdate/servicedetails";
import { ServiceSkeleton } from "../../components/flatlistcomponents/servicedetail";
import { useGetservicesQuery } from "../../store/apislices/mainapislices";
import { authDetails, UserType } from "../../store/slice";
import { services } from "../detailscreens/constants";
import { serviceType } from "./types";

const AddServices: FC = () => {
  const { user } = useSelector<any, UserType>(authDetails);

  const { data, isFetching } = useGetservicesQuery(user.id);

  const [loading, setLoading] = useState(false);
  const [filteredservices, setServices] = useState(null);

  useEffect(() => {
    if (data) {
      setLoading(true);
      let oldservices = data.map((item: serviceType) => item.service);
      setServices(services.filter((item) => !oldservices.includes(item)));
    }
  }, [data]);

  useEffect(() => {
    if (filteredservices) setLoading(false);
  }, [filteredservices]);

  if (isFetching || loading) return <ServiceSkeleton />;
  return (
    <Servicedetails
      servicesSelected={{}}
      message="Services Added Successfully!"
      updating={false}
      services={filteredservices}
    />
  );
};

export default memo(AddServices);
