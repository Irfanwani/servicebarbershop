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
import { CustomSvg } from "../svgs/svg";
import { FooterProps, serviceItemProps } from "./types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ErrorMessage from "../generalcomponents/error";

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

export const ListHeader: FC = () => {
  return (
    <View background="transparent">
      <CustomSvg xml={services} />

      <HStack justifyContent="space-between" mt="5" mb="3">
        <Heading>Service</Heading>
        <Heading>Cost (Rs.)</Heading>
      </HStack>
    </View>
  );
};

export const ListFooter: FC<FooterProps> = ({ onPress, isLoading, error }) => {
  return (
    <>
      <ErrorMessage error={error} />
      <Button
        p="3"
        onPress={onPress}
        isLoading={isLoading}
        isLoadingText="Saving details"
      >
        Complete Registration
      </Button>
    </>
  );
};
