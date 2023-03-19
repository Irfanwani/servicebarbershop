import { Image, VStack } from "native-base";
import { FC } from "react";

const Loader: FC = () => {
  return (
    <VStack alignItems="center" flex={1} p="30" justifyContent="center">
      <Image
        source={require("../../assets/loader.gif")}
        h="150"
        w="150"
        alt="loader"
      />
    </VStack>
  );
};

export default Loader;
