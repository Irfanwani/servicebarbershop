import { Dispatch, SetStateAction } from "react";
import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  withTiming,
  withSpring,
  runOnJS,
  SharedValue,
  withDecay,
  interpolate,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export const openImageGesture = (
  opened: boolean,
  scale: SharedValue<number>,
  transformX: SharedValue<number>,
  transformY: SharedValue<number>,
  setOpened: Dispatch<SetStateAction<boolean>>
) =>
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
    });

export const moveImageGesture = (
  opened: boolean,
  transformX: SharedValue<number>,
  transformY: SharedValue<number>,
  scale: SharedValue<number>,
  onClose: () => void,
  start: SharedValue<{
    x: number;
    y: number;
  }>
) =>
  Gesture.Pan()
    .maxPointers(1)
    .manualActivation(!opened)
    .onChange((event) => {
      if (scale.value == 1 || width * scale.value > height) {
        transformY.value = event.translationY + start.value.y;
      }
      if (scale.value != 1) {
        transformX.value = event.translationX + start.value.x;
      }
    })
    .onEnd(() => {
      if (scale.value == 1) {
        if (transformY.value >= height / 4 || transformY.value <= -height / 4) {
          scale.value = withSpring(0);
          runOnJS(onClose)();
          return;
        }
        transformY.value = withTiming(0);
        transformX.value = withTiming(0);
        return;
      }
      start.value = { x: transformX.value, y: transformY.value };
    });

export const zoomImageGesture = (
  opened: boolean,
  scale: SharedValue<number>,
  transformX: SharedValue<number>,
  transformY: SharedValue<number>
) =>
  Gesture.Pinch()
    .manualActivation(!opened)
    .onChange((event) => {
      let newval = scale.value + event.velocity * 50;
      scale.value = newval < 1 ? 1 : newval > 6 ? 6 : newval;
      transformX.value = width / 2 - event.focalX;
      //   transformY.value = width / 2 - event.focalY;
    })
    .onEnd(() => {
      if (scale.value == 1) {
        transformX.value = withTiming(0);
      }
    });
