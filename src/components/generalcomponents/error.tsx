import { Text } from "native-base";
import { FC } from "react";
import styles from "../styles";
import { ErrorProps } from "./types";

const ErrorMessage: FC<ErrorProps> = ({ error }) => {
  return (
    <Text color="red.500" style={styles.error}>
      {error}
    </Text>
  );
};

export default ErrorMessage;
