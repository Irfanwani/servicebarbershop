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
import { useLogout } from "../../utils/customhooks";
import { LogoutButton } from "../generalcomponents/roundbutton";
import { ThemeToggler } from "../generalcomponents/themeToggler";
import styles from "../styles";

const CustomDrawer: FC<DrawerContentComponentProps> = (props) => {
  const { uri, username, contact } = useSelector((state: any) => ({
    uri: state.authApiSlice?.mutations?.logindata?.data?.details?.image,
    contact: state.authApiSlice?.mutations?.logindata?.data?.details?.contact,
    username: state.authApiSlice?.mutations?.logindata?.data?.user?.username,
  }));

  const [logout, isLoading] = useLogout();

  const gotoprofile = () => {
    props.navigation.navigate('profile')
  }

  return (
    <DrawerContentScrollView contentContainerStyle={{ flex: 1 }} {...props}>
      <View flex="1">
        <HStack alignItems="flex-start" justifyContent="space-between" p="2">
          <VStack onTouchEnd={gotoprofile}>
            <Avatar size="xl" source={{ uri }} />
            <VStack mt="5" ml="2">
              <Heading size="sm">{username}</Heading>
              <Text fontSize="xs">{contact}</Text>
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
