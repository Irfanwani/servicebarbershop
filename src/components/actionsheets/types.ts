export type SheetProps = {
  isOpen: boolean;
  onClose: () => void;
  firstIconCallback: () => Promise<void>;
  secondIconCallback: () => Promise<void>;
  thirdIconCallback: () => void;
  icon1: string;
  icon2: string;
  icon3: string;
};
