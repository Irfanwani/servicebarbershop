import {
  Avatar,
  Heading,
  HStack,
  Text,
  useColorMode,
  useTheme,
  VStack,
} from "native-base";
import { FC } from "react";
import { useSelector } from "react-redux";
import { LogoutButton } from "../../components/generalcomponents/roundbutton";
import SettingItem from "../../components/generalcomponents/settingsitem";
import { darkgradient, lightgradient } from "../../theme";
import { useLogout } from "../../utils/customhooks";
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

  const { colorMode, toggleColorMode } = useColorMode();
  const [logout, isLoading] = useLogout();

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
        space="10"
      >
        <Avatar onTouchEnd={gotoprofile} size="xl" source={{ uri }} />
        <VStack flexShrink={1}>
          <Text fontSize={12} flexShrink={1}>
            {location}
          </Text>
          <Heading size="2xl">{username}</Heading>
        </VStack>
        <VStack style={styles.logout}>
          <LogoutButton onPress={logout} isLoading={isLoading} />
        </VStack>
      </HStack>

      <VStack
        style={styles.options}
        backgroundColor={colorMode == "light" ? "blueGray.100" : "blueGray.600"}
      >
        <SettingItem
          icon="bell-outline"
          title="Notifications"
          value={false}
          onPress={(val) => {
            console.log(val);
          }}
          bg="green.600"
        />
        <SettingItem
          icon="theme-light-dark"
          title="Dark Mode"
          value={colorMode == "dark"}
          onPress={toggleColorMode}
          bg="black"
        />
      </VStack>
    </VStack>
  );
};

export default Settings;
