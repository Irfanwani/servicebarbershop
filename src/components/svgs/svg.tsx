import { FC } from "react";
import { ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";
import styles from "../styles";

interface CustomSvgProps {
  xml: string;
  style?: ViewStyle;
}

export const CustomSvg: FC<CustomSvgProps> = ({ xml, style }) => {
  return <SvgXml style={[styles.svg, style]} xml={xml} />;
};
