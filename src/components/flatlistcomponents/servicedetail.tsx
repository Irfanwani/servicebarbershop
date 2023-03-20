import { FC, useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FlatList,
  Heading,
  HStack,
  Icon,
  Input,
  Skeleton,
  Text,
  View,
} from "native-base";
import { services } from "../../assets/services";
import { CustomSvg } from "../svgs/svg";
import { FooterProps, serviceItemProps } from "./types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ErrorMessage from "../generalcomponents/error";
import styles from "../../screens/detailscreens/styles";
import { useAddserviceDetailsMutation } from "../../store/apislices/detailsapislice";
import { errorHandler } from "../../utils/errorhandler";
import { RoundButton } from "../generalcomponents/roundbutton";
import { CustomAlertDialog } from "../generalcomponents/alerts";

export const renderItem = (props: any) => {
  return <RenderItem {...props} />;
};

const RenderItem: FC<serviceItemProps> = ({
  item,
  selectItem,
  updating,
  oldcost,
  id,
}) => {
  const [selected, setSelected] = useState(updating);
  const [cost, setCost] = useState(oldcost);

  const inputref = useRef(null);

  useEffect(() => {
    if (typeof selected != "boolean") return;

    if (selected && !updating) {
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

  const [isOpen, setIsOpen] = useState(false);

  const [deleteserviceMutation, { isLoading }] = useAddserviceDetailsMutation();

  const openAlert = () => {
    setIsOpen(true);
  };

  const closeAlert = () => {
    setIsOpen(false);
  };

  const deleteService = async () => {
    try {
      await deleteserviceMutation({
        body: { service_id: id },
        method: "DELETE",
      }).unwrap();
    } catch (err) {
      errorHandler(err);
    }
  };

  return (
    <>
      <Checkbox
        isDisabled={updating}
        isChecked={updating ? updating : undefined}
        rounded="full"
        size="lg"
        value={item}
        justifyContent="space-between"
        onChange={setSelected}
      >
        {updating ? (
          <RoundButton
            onPress={openAlert}
            isLoading={isLoading}
            icon="trash"
            colorScheme="red"
            style={styles.deletebutton}
          />
        ) : null}
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
          isDisabled={updating ? false : !selected}
          placeholder="Price"
          width="20"
          leftElement={
            <Icon as={MaterialCommunityIcons} name="currency-inr" size="md" />
          }
        />
      </Checkbox>
      <CustomAlertDialog
        isOpen={isOpen}
        header="Are you sure?"
        message="This service will be deleted from your account. You can add it back from the ADD SERVICES screen"
        onPress={deleteService}
        onClose={closeAlert}
        cancelText="Cancel"
        confirmText="Remove Service"
        confirmColor="danger"
      />
    </>
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

export const ListFooter: FC<FooterProps> = ({
  onPress,
  isLoading,
  error,
  title,
}) => {
  return (
    <>
      <ErrorMessage error={error} />
      <Button
        p="3"
        onPress={onPress}
        isLoading={isLoading}
        isLoadingText="Saving details"
      >
        {title}
      </Button>
    </>
  );
};

export const ServiceSkeleton: FC = () => {
  return (
    <FlatList
      contentContainerStyle={styles.scroll}
      data={[...Array(10)].map((item, index) => index)}
      renderItem={rnItem}
      keyExtractor={(item) => item.toString()}
      ListHeaderComponent={<ListHeader />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const rnItem = () => {
  return <SerSkeleton />;
};

const SerSkeleton: FC = () => {
  return (
    <HStack justifyContent="space-between" py="4">
      <Skeleton w={50} h={50} borderRadius="full" />
      <Skeleton.Text lines={2} w={150} />
      <Skeleton w={70} h={50} borderRadius="sm" />
    </HStack>
  );
};
