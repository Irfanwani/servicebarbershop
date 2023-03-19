import { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Servicedetails from "../../components/createupdate/servicedetails";
import { ServiceSkeleton } from "../../components/flatlistcomponents/servicedetail";
import { useGetservicesQuery } from "../../store/apislices/mainapislices";
import { authDetails, UserType } from "../../store/slice";
import { useIsReady } from "../../utils/customhooks";
import { services } from "../detailscreens/constants";

const AddServices: FC = () => {
  const { user } = useSelector<any, UserType>(authDetails);

  const { data, isFetching } = useGetservicesQuery(user.id);

  const [loading, setLoading] = useState(false);
  const [filteredservices, setServices] = useState(null);

  useEffect(() => {
    if (data) {
      setLoading(true);
      let oldservices = Object.keys(data);
      setServices(services.filter((item) => !oldservices.includes(item)));
    }
  }, [data]);

  useEffect(() => {
    if (filteredservices) setLoading(false);
  }, [filteredservices]);

  const notReady = useIsReady();

  if (isFetching || loading || notReady) return <ServiceSkeleton />;
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
