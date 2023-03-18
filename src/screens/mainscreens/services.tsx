import { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Servicedetails from "../../components/createupdate/servicedetails";
import { SelectedServiceType } from "../../components/createupdate/types";
import { ServiceSkeleton } from "../../components/flatlistcomponents/servicedetail";
import { useGetservicesQuery } from "../../store/apislices/mainapislices";
import { authDetails, UserType } from "../../store/slice";
import { serviceType } from "./types";

const Services: FC = () => {
  const { user } = useSelector<any, UserType>(authDetails);

  const { data, isFetching } = useGetservicesQuery(user.id);

  const [loading, setLoading] = useState(false);

  const [servicesSelected, setSelServices] = useState<SelectedServiceType>({});

  useEffect(() => {
    if (data?.length) {
      setLoading(true);
      data.forEach(({ service, cost, id }: serviceType) => {
        setSelServices((prev) => ({
          ...prev,
          [service]: { service, cost, id },
        }));
      });
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(servicesSelected)?.length == data?.length) {
      setLoading(false);
    }
  }, [servicesSelected]);

  if (isFetching || loading) return <ServiceSkeleton />;
  return (
    <Servicedetails
      servicesSelected={servicesSelected}
      message="Services Updated Successfully!"
      updating={true}
      services={Object.keys(servicesSelected)}
    />
  );
};

export default memo(Services);
