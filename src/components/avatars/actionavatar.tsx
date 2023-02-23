import { Avatar, Icon, IconButton, View } from "native-base";
import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import { ActionAvatarProps } from "./types";

export const ActionAvatar: FC<ActionAvatarProps> = ({ image, onOpen }) => {
  return (
    <View alignSelf="center" paddingY="30">
      <Avatar size="2xl" source={{ uri: image ? image : undefined }}>
        <Icon as={Ionicons} name="person" size="2xl" color="blueGray.700" />
      </Avatar>
      <IconButton
        variant="solid"
        icon={<Icon as={Ionicons} name="camera" size="2xl" />}
        style={styles.iconbutton}
        onPress={onOpen}
      />
    </View>
  );
};
