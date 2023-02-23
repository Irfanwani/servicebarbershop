import { FC, useEffect, useRef, useState } from "react";
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
import { services } from "../../assets/services";
import { servicetype } from "../../screens/detailscreens/constants";
import { CustomSelect } from "../actionsheets/dropdownsheet";
import { CustomSvg } from "../svgs/svg";
import { serviceHeaderProps, serviceItemProps } from "./types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const renderItem = ({ item, selectItem }) => {
  return <RenderItem item={item} selectItem={selectItem} />;
};

const RenderItem: FC<serviceItemProps> = ({ item, selectItem }) => {
  const [selected, setSelected] = useState(null);
  const [cost, setCost] = useState("");

  const inputref = useRef(null);

  useEffect(() => {
    if (typeof selected != "boolean") return;

    if (selected) {
      setTimeout(() => {
        inputref.current.focus();
      }, 10);
    }
    setItem();
  }, [selected]);

  const setItem = () => {
    selectItem(item, Number(cost), selected);
  };

  const changeCost = (val: string) => {
    if (!val) {
      setCost("");
      return;
    }
    if (+val) {
      setCost(val);
    }
  };

  return (
    <Checkbox
      rounded="full"
      size="lg"
      value={item}
      justifyContent="space-between"
      onChange={setSelected}
    >
      <Text textAlign="center" flexWrap="wrap" maxW="3xs">
        {item}
      </Text>
      <Input
        borderColor={!cost && selected ? "red.600" : undefined}
        ref={(ref) => (inputref.current = ref)}
        onBlur={setItem}
        value={selected ? cost : ""}
        onChangeText={changeCost}
        keyboardType="numeric"
        isDisabled={!selected}
        placeholder="Price"
        size="md"
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
    <Button p="3" mt="5">
      Complete Registration
    </Button>
  );
};
