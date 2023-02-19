import { FC, useState } from "react";
import { ScrollView, useDisclose } from "native-base";
import styles from "./styles";
import { getCameraImageAsync, getImageAsync } from "../../utils/getassets";
import { MediaSheet } from "../../components/actionsheets/mediaselectionsheet";
import { ActionAvatar } from "../../components/avatars/actionavatar";

const GeneralDetails: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclose();

  const [image, setImage] = useState("");

  const getCameraImage = async () => {
    const capturedImg = await getCameraImageAsync();
    if (!capturedImg) return;
    setImage(capturedImg);
    onClose();
  };

  const getImage = async () => {
    const selectedImg = await getImageAsync();
    if (!selectedImg) return;
    setImage(selectedImg);
    onClose();
  };

  const removeImage = () => {
    setImage("");
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.scroll}
    >
      <ActionAvatar image={image} onOpen={onOpen} />

      <MediaSheet
        isOpen={isOpen}
        onClose={onClose}
        getCameraImage={getCameraImage}
        getImage={getImage}
        removeImage={removeImage}
      />
    </ScrollView>
  );
};
export default GeneralDetails;
