import { Details } from "../../store/slice";

export type DetailsScreenProps = {
  updating: boolean;
  heading: string;
  details: Details;
};

export type SelectedServiceType = {
  [item: string]: { service: string; cost: number; id?: number };
};

export type ServiceProps = {
  servicesSelected: SelectedServiceType;
  message: string;
  updating: boolean;
  services: Array<string>;
};
