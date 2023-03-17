import { Details } from "../../store/slice";

export type DetailsScreenProps = {
  updating: boolean;
  heading: string;
  details: Details;
};

export type ServiceProps = {
  servicesSelected: {
    [item: string]: { service: string; cost: number };
  };
  message: string;
  updating: boolean;
};
