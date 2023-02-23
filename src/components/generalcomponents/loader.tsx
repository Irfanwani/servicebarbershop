import { Spinner, View } from "native-base";
import { FC } from "react";

const Loader: FC = () => {
  return (
    <View alignItems="center" flex={1} justifyContent="center">
      <Spinner color='teal.500' size="lg" />
    </View>
  );
};

export default Loader;
