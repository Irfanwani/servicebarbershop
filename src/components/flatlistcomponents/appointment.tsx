import {
  Box,
  Divider,
  Heading,
  HStack,
  Text,
  useColorMode,
  VStack,
} from "native-base";
import { FC } from "react";
import { darkgradient, lightgradient } from "../../theme";
import { AppointmentType } from "./types";

export const renderItem = ({ item }: AppointmentType) => {
  return <RenderItem item={item} />;
};

const RenderItem: FC<AppointmentType> = ({ item }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      background={{
        linearGradient: {
          colors: colorMode == "light" ? lightgradient : darkgradient,
          start: [0, 0],
          end: [1, 1],
        },
      }}
      borderRadius="2xl"
      my="4"
      p="3"
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
