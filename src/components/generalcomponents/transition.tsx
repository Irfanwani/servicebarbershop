import {
  Center,
  Heading,
  Icon,
  Modal,
  PresenceTransition,
  useColorMode,
  useTheme,
} from "native-base";
import { FC, useEffect } from "react";
import { Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { TransitionProps } from "./types";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
export const CustomTransition: FC<TransitionProps> = ({ loading }) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const rotate = useSharedValue("0deg");

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: rotate.value }],
    marginBottom: 10,
  }));

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming("360deg", { duration: 750 }),
      -1,
      true
    );
    if (!loading) rotate.value = "0deg";
  }, [loading]);

  const bgcolor = (cm: string) =>
    colorMode == cm ? theme.colors.light[600] : theme.colors.dark[600];
  return (
    <Modal isOpen={loading}>
      <PresenceTransition
        style={{
          borderRadius: height,
          width,
          height,
        }}
        visible={loading}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 3,
          transition: {
            duration: 300,
          },
        }}
        exit={{
          opacity: 0,
          scale: 0,
          transition: {
            duration: 300,
          },
        }}
      >
        <Center w="full" h="full" bg={bgcolor("light")} borderRadius="full">
          <Animated.View style={animatedStyle}>
            <Icon
              color={bgcolor("dark")}
              as={Ionicons}
              name="settings-outline"
              size="sm"
            />
          </Animated.View>
          <Heading color={bgcolor("dark")} size="sm" fontSize="5">
            {`Switching to ${colorMode == "dark" ? "light" : "dark"} mode`}
          </Heading>
        </Center>
      </PresenceTransition>
    </Modal>
  );
};
