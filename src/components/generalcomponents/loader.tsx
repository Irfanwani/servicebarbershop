import { Spinner, VStack } from "native-base";
import { FC } from "react";

const Loader: FC = () => {
  return (
    <VStack alignItems="center" flex={1} p="30" justifyContent="center">
      <Spinner color="teal.600" size="lg" />
    </VStack>
  );
};

export default Loader;
