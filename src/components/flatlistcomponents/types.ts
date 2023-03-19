export type serviceItemProps = {
  item: string;
  selectItem: (item: string, cost: number, selected: boolean) => void;
  updating: boolean;
  oldcost: string;
  id: number;
};

export type FooterProps = {
  onPress: () => Promise<void>;
  isLoading: boolean;
  error: string;
  title: string;
};

export type AppointmentItemType = {
  barber: string;
  bookingID: number;
  datetime: string;
  id: number;
  paid: boolean;
  services: string;
  totalcost: number;
  user: string;
  dp: string;
};

export type AppointmentType = {
  item: AppointmentItemType;
};

export type AppFooterProps = {
  endReached: boolean;
  isFetching: boolean;
};

export type AppHeaderProps = {
  setSearch: (val: string, filters: string) => void;
  loading: boolean;
};
