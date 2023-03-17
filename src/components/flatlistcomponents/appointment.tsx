import {
  Box,
  Divider,
  Heading,
  HStack,
  Skeleton,
  Spinner,
  Text,
  useColorMode,
  VStack,
} from "native-base";
import { FC } from "react";
import { lineargradient } from "../../theme";
import { AppFooterProps, AppointmentType } from "./types";
import { CustomSvg } from "../svgs/svg";
import { notfound } from "../../assets/notfound";

export const renderItem = ({ item }: AppointmentType) => {
  return <RenderItem item={item} />;
};

const RenderItem: FC<AppointmentType> = ({ item }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      background={lineargradient(colorMode)}
      borderRadius="2xl"
      my="4"
      p="3"
      mx="2"
    >
      <HStack justifyContent="space-between">
        <Heading>{item.user}</Heading>
        <VStack alignItems="center">
          <Heading size="sm">₹{item.totalcost}</Heading>
          <Text>{item.paid ? "Paid" : "Not Paid"}</Text>
        </VStack>
      </HStack>

      <Text>{item.datetime}</Text>

      <VStack py="2">
        <Heading size="sm">Services Selected:</Heading>
        {item.services.split("|").map((service, index) => (
          <Text px="2" key={index}>
            {index + 1 + ") "}
            {service}
          </Text>
        ))}
      </VStack>

      <Divider />
      <Heading mt="1" size="xs">
        Booking ID: #{item.bookingID}
      </Heading>
    </Box>
  );
};

export const Empty: FC = () => {
  return (
    <VStack pt="70">
      <CustomSvg xml={notfound} />
    </VStack>
  );
};

export const Footer: FC<AppFooterProps> = ({ endReached, isFetching }) => {
  if (isFetching) return <Spinner pb="4" size="lg" />;
  return (
    <Heading textAlign="center" pb="4" size="xs">
      {endReached ? "End Reached!" : ""}
    </Heading>
  );
};

export const CustomSkeleton: FC = () => {
  const { colorMode } = useColorMode();
  return (
    <>
      {[1, 2, 3].map((item) => (
        <Box
          key={item}
          background={lineargradient(colorMode)}
          borderRadius="2xl"
          my="4"
          p="3"
          mx="2"
        >
          <HStack justifyContent="space-between" p="3" alignItems={"center"}>
            <Skeleton h="4" w="100" borderRadius="full" />
            <Skeleton h="10" w="10" borderRadius="full" />
          </HStack>
          <Skeleton.Text lines={4} px="3" />
          <Skeleton rounded="full" my="5" />
        </Box>
      ))}
    </>
  );
};
