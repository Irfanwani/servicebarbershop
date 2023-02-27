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
