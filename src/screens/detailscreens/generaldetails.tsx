import { Avatar, Icon, IconButton, View } from "native-base";
import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const GeneralDetails: FC = () => {
  return (
    <View alignSelf="center" paddingY="30">
      <Avatar size="2xl">
        <Icon as={Ionicons} name="person" size="2xl" />
      </Avatar>
      <IconButton
        variant="solid"
        icon={<Icon as={Ionicons} name="camera" size="2xl" />}
        style={styles.iconbutton}
        colorScheme="teal"
      />
    </View>
  );
};
export default GeneralDetails;
