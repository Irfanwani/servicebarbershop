import { Avatar, HStack, Icon, IconButton, Modal, VStack } from "native-base";
import { FC, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import { ActionAvatarProps } from "./types";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useWindowDimensions } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  moveImageGesture,
  openImageGesture,
  zoomImageGesture,
} from "../../utils/gestures";

export const ActionAvatar: FC<ActionAvatarProps> = ({ image, onOpen }) => {
  const { width, height } = useWindowDimensions();

  const [opened, setOpened] = useState(false);

  const scale = useSharedValue(0.7);

  const transformX = useSharedValue(0);
  const transformY = useSharedValue(0);

  const start = useSharedValue({ x: 0, y: 0 });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
      { translateX: transformX.value },
      { translateY: transformY.value },
    ],
  }));

  const viewanimatedStyles = useAnimatedStyle(() => {
    let bg = interpolateColor(
      scale.value,
      [0.7, 1],
      ["#00000000", "#000000ff"]
    );

    let bgy = interpolateColor(
      transformY.value,
      [-height / 2, 0, height / 2],
      ["#00000000", "#000000ff", "#00000000"]
    );

    let ht = interpolate(scale.value, [0.7, 1], [width, height]);

    return {
      backgroundColor: opened && scale.value == 1 ? bgy : bg,
      height: ht,
    };
  });

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    setOpened(false);
    scale.value = withSpring(0.7);
    transformX.value = 0;
    transformY.value = 0;
    start.value = { x: 0, y: 0 };
  };
  const showImage = () => {
    transformY.value = withTiming(0);
    scale.value = withTiming(0.7);

    setIsOpen(true);
  };

  const openImage = useMemo(
    () => openImageGesture(opened, scale, transformX, transformY, setOpened),
    [opened]
  );

  const moveImage = useMemo(
    () =>
      moveImageGesture(opened, transformX, transformY, scale, onClose, start),
    [opened, scale.value]
  );

  const zoomImage = useMemo(
    () => zoomImageGesture(opened, scale, transformX, transformY),
    [opened]
  );

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

      <Modal closeOnOverlayClick={!opened} isOpen={isOpen} onClose={onClose}>
        <GestureHandlerRootView>
          <GestureDetector
            gesture={Gesture.Simultaneous(openImage, moveImage, zoomImage)}
          >
            <Animated.View style={[styles.imageview, viewanimatedStyles]}>
              <Animated.Image
                style={[
                  {
                    width,
                    height: width,
                  },
                  animatedStyles,
                ]}
                source={{ uri: image }}
              />
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </Modal>
    </VStack>
  );
};
