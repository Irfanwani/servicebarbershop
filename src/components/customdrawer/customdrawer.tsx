import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar, HStack, View } from "native-base";
import { FC } from "react";
import { useSelector } from "react-redux";
import { ThemeToggler } from "../generalcomponents/themeToggler";

const CustomDrawer: FC<DrawerContentComponentProps> = (props) => {
  const { uri } = useSelector((state: any) => ({
    uri: state.authApiSlice?.mutations?.logindata?.data?.details?.image,
  }));

  return (
    <DrawerContentScrollView contentContainerStyle={{ flex: 1 }} {...props}>
      <View flex="1">
        <HStack alignItems="flex-start" justifyContent="space-between" p="2">
          <Avatar size="2xl" source={{ uri }} />
          <ThemeToggler />
        </HStack>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
