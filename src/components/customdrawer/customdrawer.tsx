import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  Avatar,
  Divider,
  Heading,
  HStack,
  Text,
  View,
  VStack,
} from "native-base";
import { FC } from "react";
import { useSelector } from "react-redux";
import { authDetails, UserType } from "../../store/slice";
import { useLogout } from "../../utils/customhooks";
import { LogoutButton } from "../generalcomponents/roundbutton";
import { ThemeToggler } from "../generalcomponents/themeToggler";
import styles from "../styles";

const CustomDrawer: FC<DrawerContentComponentProps> = (props) => {
  const { user, details } = useSelector<any, UserType>(authDetails);

  const [logout, isLoading] = useLogout();

  const gotoprofile = () => {
    props.navigation.navigate("profile");
  };

  return (
    <DrawerContentScrollView contentContainerStyle={{ flex: 1 }} {...props}>
      <View flex="1">
        <HStack alignItems="flex-start" justifyContent="space-between" p="2">
          <VStack onTouchEnd={gotoprofile}>
            <Avatar size="xl" source={{ uri: details?.image }} />
            <VStack mt="5" ml="2">
              <Heading size="sm">{user?.username}</Heading>
              <Text fontSize="xs">{details?.contact}</Text>
            </VStack>
          </VStack>
          <ThemeToggler />
        </HStack>
        <Divider />
        <DrawerItemList {...props} />

        <View style={styles.logout}>
          <LogoutButton onPress={logout} isLoading={isLoading} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
