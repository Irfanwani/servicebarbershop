import { Heading, HStack, Icon, Switch, Text, View } from "native-base";
import { FC, memo, useEffect, useState } from "react";
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

      <HStack space="2" alignItems="center">
        <Text>{val ? "On" : "Off"}</Text>
        <Switch
          value={val}
          onToggle={onToggle}
          onTrackColor={bgLightCard}
          offTrackColor="blueGray.400"
        />
      </HStack>
    </HStack>
  );
};

export default memo(SettingItem);
