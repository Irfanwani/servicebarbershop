import {
  Avatar,
  HStack,
  Icon,
  IconButton,
  Modal,
  Pressable,
  VStack,
} from "native-base";
import { FC, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import { ActionAvatarProps } from "./types";
import Animated from "react-native-reanimated";
import { Image, useWindowDimensions } from "react-native";
import Loader from "../generalcomponents/loader";

export const ActionAvatar: FC<ActionAvatarProps> = ({ image, onOpen }) => {
  const { width, height } = useWindowDimensions();

  const [w, setW] = useState(0);
  const [h, setH] = useState(0);

  const success = (wd: number, ht: number) => {
    setW(wd);
    setH(ht);
  };

  const fail = (err: any) => {
    console.log(err);
  };

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setW(0);
    setH(0);
    Image.getSize(image, success, fail);
  }, [image]);

  const onClose = () => {
    setIsOpen(false);
  };
  const showImage = () => {
    setIsOpen(true);
  };

  const openImage = () => {
    console.log("opened");
  };

  return (
    <VStack borderRadius="full" alignSelf="center" pb="3">
      <Avatar size="2xl" source={{ uri: image ? image : undefined }}>
        <Icon as={Ionicons} name="person" size="2xl" color="blueGray.700" />
      </Avatar>
      <IconButton
        variant="solid"
        icon={<Icon as={Ionicons} name="camera" size="2xl" />}
        style={styles.iconbutton}
        onPress={onOpen}
      />
      {image ? (
        <HStack onTouchEnd={showImage} style={styles.viewimage}>
          <Icon color="blueGray.300" as={Ionicons} name="eye" size="xl" />
        </HStack>
      ) : null}

      <Modal isOpen={isOpen} onClose={onClose}>
        <Pressable onPress={openImage}>
          {w && h ? (
            <Animated.Image
              style={{
                width: w > h ? width / 1.1 : w,
                aspectRatio: w / h,
                maxHeight: height / 1.5,
              }}
              source={{ uri: image }}
            />
          ) : (
            <Loader />
          )}
        </Pressable>
      </Modal>
    </VStack>
  );
};
