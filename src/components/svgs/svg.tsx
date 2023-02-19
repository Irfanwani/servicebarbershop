import { FC } from "react";
import { SvgXml } from "react-native-svg";
import styles from "./styles";

interface CustomSvgProps {
  xml: string;
}

export const CustomSvg: FC<CustomSvgProps> = ({ xml }) => {
  return <SvgXml style={styles.svg} xml={xml} />;
};
