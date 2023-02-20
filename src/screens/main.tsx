import { FC, memo } from "react";
import AuthMain from "./authscreens/main";
import DetailsMain from "./detailscreens/main";

const Main: FC = () => {
  return <DetailsMain />;
};

export default memo(Main);
