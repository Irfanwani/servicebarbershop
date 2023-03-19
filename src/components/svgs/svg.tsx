import { Box, HStack, Icon, useColorMode, View } from "native-base";
import { FC } from "react";
import { ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { bgDark, bgLight } from "../../theme";

interface CustomSvgProps {
  xml: string;
  style?: ViewStyle;
}

export const CustomSvg: FC<CustomSvgProps> = ({ xml, style }) => {
  return <SvgXml style={[styles.svg, style]} xml={xml} />;
};

interface StarProps {
  rating: number;
}

export const StarRating: FC<StarProps> = ({ rating }) => {
  const { colorMode } = useColorMode();

  const bg = colorMode == "light" ? bgLight : bgDark;
  return (
    <HStack bg={bg} overflow="hidden" space="0.5">
      <View
        position="absolute"
        h="100%"
        width={`${100 * (rating / 5)}%`}
        bg="yellow.300"
      />
      {[...Array(5)].map((item, index) => (
        <Icon key={index} as={Ionicons} name="star" size="sm" />
      ))}
    </HStack>
  );
};
