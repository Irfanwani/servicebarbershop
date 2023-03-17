import { FC, memo } from "react";
import Servicedetails from "../../components/createupdate/servicedetails";

const Services: FC = () => {
  return (
    <Servicedetails message="Services Updated Successfully!" updating={true} />
  );
};

export default memo(Services);
