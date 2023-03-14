import {
  Center,
  Heading,
  Modal,
  PresenceTransition,
  useColorMode,
  useTheme,
} from "native-base";
import { FC } from "react";
import { Dimensions } from "react-native";
import { TransitionProps } from "./types";

const { width, height } = Dimensions.get("window");
export const CustomTransition: FC<TransitionProps> = ({ loading }) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const bgcolor = (cm: string) =>
    colorMode == cm ? theme.colors.light[600] : theme.colors.dark[600];
  return (
    <Modal isOpen={loading}>
      <PresenceTransition
        style={{
          position: "absolute",
          zIndex: 99999,
          borderRadius: height,
          width: height,
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
            duration: 250,
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
          <Heading color={bgcolor("dark")} size="sm" fontSize="5">
            {`Switching to ${colorMode == "dark" ? "light" : "dark"} mode`}
          </Heading>
        </Center>
      </PresenceTransition>
    </Modal>
  );
};
