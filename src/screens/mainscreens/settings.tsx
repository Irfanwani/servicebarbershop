import {
  Avatar,
  Heading,
  HStack,
  Text,
  useColorMode,
  VStack,
} from "native-base";
import { FC } from "react";
import { useSelector } from "react-redux";
import { darkgradient, lightgradient } from "../../theme";
import styles from "./styles";
import { SettingsProps } from "./types";

const Settings: FC<SettingsProps> = ({ navigation }) => {
  const { uri, username, location } = useSelector((state: any) => ({
    uri: state.authApiSlice?.mutations?.logindata?.data?.details?.image,
    username: state.authApiSlice?.mutations?.logindata?.data?.user?.username,
    location: state.authApiSlice?.mutations?.logindata?.data?.details?.location,
  }));

  const gotoprofile = () => {
    navigation.navigate("profile");
  };

  const { colorMode } = useColorMode();

  return (
    <VStack>
      <HStack
        background={{
          linearGradient: {
            colors: colorMode == "light" ? lightgradient : darkgradient,
            start: [0, 0],
            end: [1, 1],
          },
        }}
        style={styles.gradient}
        space='10'
      >
        <Avatar onTouchEnd={gotoprofile} size="xl" source={{ uri }} />
        <VStack flexShrink={1}>
          <Text fontSize={12} flexShrink={1}>
            {location}
          </Text>
          <Heading size="2xl">{username}</Heading>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Settings;
