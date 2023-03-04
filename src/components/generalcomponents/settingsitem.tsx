import { Heading, HStack, Icon, Switch, Text, View } from "native-base";
import { FC } from "react";
import { SettingItemType } from "./types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { bgLightCard } from "../../theme";
import styles from "../styles";

const SettingItem: FC<SettingItemType> = ({
  icon,
  title,
  onPress,
  bg,
  value,
}) => {
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

      <HStack space="2" alignItems="center">
        <Text>{value ? "On" : "Off"}</Text>
        <Switch
          value={value}
          onToggle={onPress}
          onTrackColor={bgLightCard}
          offTrackColor="blueGray.400"
        />
      </HStack>
    </HStack>
  );
};

export default SettingItem;
