import { Box, Divider, Heading, HStack, Text, VStack } from "native-base";
import { AppointmentType } from "./types";

export const renderItem = ({ item }: { item: AppointmentType }) => {
  return (
    <Box borderRadius="2xl" my="4" p="3">
      <HStack justifyContent="space-between">
        <Heading>{item.user}</Heading>
        <VStack alignItems="center">
          <Heading size="sm">₹{item.totalcost}</Heading>
          <Text>{item.paid ? "Paid" : "Not Paid"}</Text>
        </VStack>
      </HStack>

      <Text>{item.datetime}</Text>

      <Heading size="sm">Services Selected:</Heading>
      {item.services.split("|").map((service, index) => (
        <Text key={index}>{service}</Text>
      ))}

      <Divider />
      <Heading mt="1" size="xs">
        Booking ID: #{item.bookingID}
      </Heading>
    </Box>
  );
};
