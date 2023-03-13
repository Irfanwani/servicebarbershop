import { Dispatch, SetStateAction } from "react";
import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  withTiming,
  withSpring,
  runOnJS,
  SharedValue,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export const openImageGesture = (
  opened: boolean,
  scale: SharedValue<number>,
  transformX: SharedValue<number>,
  transformY: SharedValue<number>,
  setOpened: Dispatch<SetStateAction<boolean>>,
  start: SharedValue<{
    x: number;
    y: number;
  }>
) =>
  Gesture.Tap()
    .numberOfTaps(opened ? 2 : 1)
    .onEnd((event) => {
      if (opened) {
        if (scale.value > 1) {
          scale.value = withTiming(1);
          transformX.value = withSpring(0);
          transformY.value = withSpring(0);

          start.value = { x: 0, y: 0 };
        } else {
          scale.value = withTiming(2);
          const { absoluteX } = event;
          const x =
            absoluteX < width / 3
              ? width / 4
              : absoluteX > (2 * width) / 3
              ? -width / 4
              : 0;
          transformX.value = withTiming(x);
          start.value = { x, y: 0 };
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
        let ty = event.translationY + start.value.y;
        let offset = (width * scale.value - height) / 10 * scale.value; // needs to be fixed
        
        let lim = ty > offset ? offset : ty < -offset ? -offset : ty;
        transformY.value = width * scale.value > height ? lim : ty;
      }
      if (scale.value != 1) {
        let tx = event.translationX + start.value.x;

        let lim = gettranslation(tx, scale.value);
        transformX.value = lim;
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
        return;
      }
      start.value = { x: transformX.value, y: transformY.value };
    });

export const zoomImageGesture = (
  opened: boolean,
  scale: SharedValue<number>,
  transformX: SharedValue<number>,
  transformY: SharedValue<number>,
  start: SharedValue<{
    x: number;
    y: number;
  }>
) =>
  Gesture.Pinch()
    .manualActivation(!opened)
    .onChange((event) => {
      let newval = scale.value + event.velocity * 50;
      scale.value = newval < 1 ? 1 : newval > 6 ? 6 : newval;

      let tx = gettranslation(width / 2 - event.focalX, scale.value);
      transformX.value = tx;
      start.value = { x: tx, y: 0 };
    })
    .onEnd(() => {
      if (scale.value == 1) {
        transformX.value = withSpring(0);
        transformY.value = withSpring(0);

        start.value = { x: 0, y: 0 };
      }
    });

const gettranslation = (tr: number, scale: number) => {
  "worklet";
  let lim = (width / (2 * scale)) * (scale - 1);
  return tr > lim ? lim : tr < -lim ? -lim : tr;
};
