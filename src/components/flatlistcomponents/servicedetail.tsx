import {
  Button,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  View,
} from "native-base";
import { FC } from "react";
import { services } from "../../assets/services";
import { servicetype } from "../../screens/detailscreens/constants";
import { CustomSelect } from "../actionsheets/dropdownsheet";
import { CustomSvg } from "../svgs/svg";
import { serviceHeaderProps, serviceItemProps } from "./types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

export const renderItem = ({ item }) => {
  return <RenderItem item={item} />;
};

const RenderItem: FC<serviceItemProps> = ({ item }) => {
  return (
    <Checkbox
      rounded="full"
      size="lg"
      colorScheme="teal"
      value={item}
      justifyContent="space-between"
    >
      <Text textAlign='center' flexWrap="wrap" maxW="3xs">
        {item}
      </Text>
      <Input
      placeholder='Price'
      size='md'
        width="20"
        leftElement={
          <Icon as={MaterialCommunityIcons} name="currency-inr" size="md" />
        }
      />
    </Checkbox>
  );
};

export const ItemSeparator: FC = () => {
  return <Divider my="5" />;
};

export const ListHeader: FC<serviceHeaderProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <View background="transparent">
      <CustomSvg xml={services} />
      <CustomSelect
        placeholder="Select Service Type"
        items={servicetype}
        value={value}
        onValueChange={onValueChange}
      />

      <HStack justifyContent="space-between" mt="5" mb="3">
        <Heading size="md">Service</Heading>
        <Heading size="md">Cost (Rs.)</Heading>
      </HStack>
    </View>
  );
};

export const ListFooter: FC = () => {
  return (
    <Button colorScheme="teal" p="3" mt="5">
      Complete Registration
    </Button>
  );
};
