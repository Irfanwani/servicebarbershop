import {
  Avatar,
  Heading,
  HStack,
  ScrollView,
  Text,
  useColorMode,
  VStack,
} from "native-base";
import { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  LogoutButton,
  RoundButton,
} from "../../components/generalcomponents/roundbutton";
import SettingItem, {
  DeleteComponent,
} from "../../components/generalcomponents/settingsitem";
import { CustomTransition } from "../../components/generalcomponents/transition";
import { authDetails, UserType } from "../../store/slice";
import { lineargradient } from "../../theme";
import { useLogout } from "../../utils/customhooks";
import { shareApp } from "../../utils/getassets";
import styles from "./styles";
import { SettingsProps } from "./types";

const Settings: FC<SettingsProps> = ({ navigation }) => {
  const { details, user } = useSelector<any, UserType>(authDetails);

  const [loading, setLoading] = useState(false);

  const gotoprofile = () => {
    navigation.navigate("profile");
  };

  const { colorMode, toggleColorMode } = useColorMode();
  const [logout, isLoading] = useLogout();

  const logoutall = () => {
    logout(true);
  };

  const [changingtheme, setChangingtheme] = useState(false);

  const changetheme = () => {
    setChangingtheme(true);
    toggleColorMode();
  };

  useEffect(() => {
    setChangingtheme(false);
  }, [colorMode]);

  return (
    <VStack flex="1">
      <HStack
        background={lineargradient(colorMode)}
        style={styles.gradient}
        space="10"
      >
        <Avatar
          onTouchEnd={gotoprofile}
          size="xl"
          source={{ uri: details?.image }}
        />
        <VStack flexShrink={1}>
          <Text fontSize={12} flexShrink={1}>
            {details?.location}
          </Text>
          <Heading size="2xl">{user?.username}</Heading>
        </VStack>
        <VStack style={styles.logout}>
          <LogoutButton onPress={logout} isLoading={isLoading} />
        </VStack>
      </HStack>

      <ScrollView bg="transparent" mt={30} showsVerticalScrollIndicator={false}>
        <VStack
          style={styles.options}
          backgroundColor={
            colorMode == "light" ? "blueGray.100" : "blueGray.600"
          }
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
            onPress={changetheme}
            bg="black"
          />

          <SettingItem
            icon="share"
            title="Share App"
            isSwitch={false}
            bg="cyan.600"
            CustomComponent={() => (
              <RoundButton
                onPress={shareApp}
                icon="share-social"
                colorScheme="cyan"
              />
            )}
          />
          <SettingItem
            icon="logout"
            title="Logout All"
            isSwitch={false}
            bg="rose.500"
            CustomComponent={() => (
              <LogoutButton
                onPress={logoutall}
                isLoading={isLoading}
                logoutall={true}
              />
            )}
          />

          <SettingItem
            icon="delete"
            title="Delete Account"
            isSwitch={false}
            bg="red.600"
            CustomComponent={() => (
              <DeleteComponent
                id={user?.id}
                loading={loading}
                setLoading={setLoading}
              />
            )}
          />
        </VStack>
      </ScrollView>

      <Text textAlign="center" mt="auto">
        Version@1.0.0
      </Text>

      <CustomTransition loading={changingtheme} />
    </VStack>
  );
};

export default memo(Settings);
