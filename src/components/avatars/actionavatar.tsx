import { Avatar, HStack, Icon, IconButton, Modal, VStack } from "native-base";
import { FC, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import { ActionAvatarProps } from "./types";
import Animated, {
  interpolateColor,
  runOnJS,
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

export const ActionAvatar: FC<ActionAvatarProps> = ({ image, onOpen }) => {
  const { width, height } = useWindowDimensions();

  const [opened, setOpened] = useState(false);

  const scale = useSharedValue(0.7);

  const transformX = useSharedValue(0);
  const transformY = useSharedValue(0);

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

    return {
      backgroundColor: bg,
    };
  });

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    setOpened(false);
    scale.value = withSpring(0.7);
  };
  const showImage = () => {
    setIsOpen(true);
  };

  const openImage = useMemo(
    () =>
      Gesture.Tap()
        .numberOfTaps(opened ? 2 : 1)
        .onEnd((event) => {
          if (opened) {
            if (scale.value > 1) {
              scale.value = withTiming(1);
              transformX.value = withTiming(0);
              transformY.value = withTiming(0);
            } else {
              scale.value = withTiming(2);
              const { absoluteX } = event;
              const x = withTiming(
                absoluteX < width / 3
                  ? width / 4
                  : absoluteX > (2 * width) / 3
                  ? -width / 4
                  : 0
              );
              transformX.value = x;
            }
            return;
          }
          scale.value = withSpring(1);
          runOnJS(setOpened)(true);
        }),
    [opened]
  );

  // const zoomImage = useMemo(() =>
  // Gesture.Pinch().)

  const moveImage = useMemo(
    () =>
      Gesture.Pan().onTouchesMove((event) => {
        // console.log(event);
      }),
    []
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

      <Modal
        closeOnOverlayClick={!opened}
        bg="transparent"
        isOpen={isOpen}
        onClose={onClose}
      >
        <Animated.View style={[styles.imageview, viewanimatedStyles]}>
          <GestureHandlerRootView>
            <GestureDetector gesture={Gesture.Exclusive(openImage, moveImage)}>
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
            </GestureDetector>
          </GestureHandlerRootView>
        </Animated.View>
      </Modal>
    </VStack>
  );
};
