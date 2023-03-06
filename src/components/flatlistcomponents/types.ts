export type serviceItemProps = {
  item: string;
  selectItem: (item: string, cost: number, selected: boolean) => void;
};

export type serviceHeaderProps = {
  value: string;
  onValueChange: (item: string) => void;
};

export type FooterProps = {
  onPress: () => Promise<void>;
  isLoading: boolean;
  error: string;
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
};

export type AppointmentType = {
  item: AppointmentItemType;
};

export type AppFooterProps = {
  isLoading: boolean;
};
