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
  Icon,
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
import { Ionicons } from "@expo/vector-icons";
import { bgLightCard } from "../../theme";
import { TouchableOpacity } from "react-native";
import { shareApp } from "../../utils/getassets";

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

        <TouchableOpacity style={styles.share} onPress={shareApp}>
          <HStack h="60" p="5" space="8">
            <Icon
              as={Ionicons}
              name="share-social"
              size="lg"
              color={bgLightCard}
            />
            <Text fontWeight="medium" color={bgLightCard} size="sm">
              Share
            </Text>
          </HStack>
        </TouchableOpacity>

        <View style={styles.logout}>
          <LogoutButton onPress={logout} isLoading={isLoading} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
