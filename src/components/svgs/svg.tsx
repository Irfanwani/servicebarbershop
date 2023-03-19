import { HStack, Icon } from "native-base";
import { FC } from "react";
import { ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { ThemeComponentSizeType } from "native-base/lib/typescript/components/types";

interface CustomSvgProps {
  xml: string;
  style?: ViewStyle;
}

export const CustomSvg: FC<CustomSvgProps> = ({ xml, style }) => {
  return <SvgXml style={[styles.svg, style]} xml={xml} />;
};

interface StarProps {
  rating: number;
  size?: ThemeComponentSizeType<"Icon">;
}

export const StarRating: FC<StarProps> = ({ rating, size = "sm" }) => {
  return (
    <HStack overflow="hidden">
      {[...Array(5)].map((item, index) => (
        <Icon key={index} as={Ionicons} name="star" size={size} />
      ))}

      <HStack
        overflow="hidden"
        position="absolute"
        width={`${100 * (rating / 5)}%`}
      >
        {[...Array(5)].map((item, index) => (
          <Icon
            color="yellow.500"
            key={index}
            as={Ionicons}
            name="star"
            size={size}
          />
        ))}
      </HStack>
    </HStack>
  );
};
