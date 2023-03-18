import { FC, memo } from "react";
import { useSelector } from "react-redux";
import Servicedetails from "../../components/createupdate/servicedetails";
import { ServiceSkeleton } from "../../components/flatlistcomponents/servicedetail";
import { useGetservicesQuery } from "../../store/apislices/mainapislices";
import { authDetails, UserType } from "../../store/slice";

const Services: FC = () => {
  const { user } = useSelector<any, UserType>(authDetails);

  const { data, isFetching } = useGetservicesQuery(user.id);

  if (isFetching) return <ServiceSkeleton />;
  return (
    <Servicedetails
      servicesSelected={data}
      message="Services Updated Successfully!"
      updating={true}
      services={data ? Object.keys(data) : null}
    />
  );
};

export default memo(Services);
