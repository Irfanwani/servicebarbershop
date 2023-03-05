import { Button, Heading, HStack, Icon, Switch, Text, View } from "native-base";
import { FC, memo, useEffect, useState } from "react";
import { DeleteProps, SettingItemType } from "./types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { bgLightCard } from "../../theme";
import styles from "../styles";
import authApiSlice, {
  useDeleteaccountMutation,
} from "../../store/apislices/authapislices";
import { errorHandler } from "../../utils/errorhandler";
import { useDispatch } from "react-redux";
import { CustomAlertDialog, showToast } from "./alerts";
import { deleteItemAsync } from "expo-secure-store";

const SettingItem: FC<SettingItemType> = ({
  icon,
  title,
  onPress,
  bg,
  value,
  isSwitch = true,
  CustomComponent,
}) => {
  const [val, setVal] = useState(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  const onToggle = (v: boolean) => {
    setVal(v);
    onPress();
  };

  return (
    <HStack style={styles.settingitem}>
      <HStack space="3">
        <View p="1" backgroundColor={bg} borderRadius="5">
          <Icon
            color="white"
            as={MaterialCommunityIcons}
            name={icon}
            size="md"
          />
        </View>
        <Heading size="md" fontWeight="medium">
          {title}
        </Heading>
      </HStack>

      {isSwitch ? (
        <HStack space="2" alignItems="center">
          <Text>{val ? "On" : "Off"}</Text>
          <Switch
            value={val}
            onToggle={onToggle}
            onTrackColor={bgLightCard}
            offTrackColor="blueGray.400"
          />
        </HStack>
      ) : (
        <CustomComponent />
      )}
    </HStack>
  );
};

export default memo(SettingItem);

export const DeleteComponent: FC<DeleteProps> = ({ id }) => {
  const [deleteAccount, { isLoading }] = useDeleteaccountMutation();

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsOpen(true);
  };

  const deleteaccount = async () => {
    try {
      await deleteAccount(id).unwrap();
      await deleteItemAsync("token");
      dispatch(authApiSlice.util.resetApiState());
      showToast("info", "Account Deleted successfully. Hope to see you again!");
    } catch (err) {
      errorHandler(err);
    }
  };
  return (
    <>
      <Button
        borderColor="red.500"
        variant="solid"
        colorScheme="danger"
        onPress={open}
        isLoading={isLoading}
        isLoadingText="Removing all the data"
      >
        Delete Account
      </Button>
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onPress={deleteaccount}
        header={"This action is irreversible!"}
        message={
          "This will delete all of your data including user data like email, username, appointment data (fixed appointments, ratings and reviews). This action cannot be reverted.\nIf you are facing any issues, please contact us at \n[barbershopservices@gmail.com]\n before deleting the account."
        }
        cancelText={"Cancel"}
        confirmText={"Delete Account"}
        confirmColor={"error"}
      />
    </>
  );
};
