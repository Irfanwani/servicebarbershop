export type MediaSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  getCameraImage: () => Promise<void>;
  getImage: () => Promise<void>;
  removeImage: () => void;
};
