import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  useColorMode,
  VStack,
} from "native-base";
import { FC } from "react";
import { darkgradient, lightgradient } from "../../theme";
import { AppointmentType } from "./types";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { CustomSvg } from "../svgs/svg";
import { notfound } from "../../assets/notfound";

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

export const ListHeader: FC = () => {
  const theme = useTheme();
  return (
    <HStack
      pb="10"
      pt="5"
      px="2"
      bg={theme.colors.card}
      justifyContent="space-between"
      borderBottomLeftRadius="30"
    >
      <Input
        placeholder="Search appointment..."
        placeholderTextColor={theme.colors.text}
        flex="0.9"
        variant="rounded"
        leftElement={<Icon as={MaterialIcons} name="search" size={25} m="2" />}
      />
      <IconButton
        size="10"
        title="Filters"
        icon={<Icon as={MaterialIcons} name="filter-list" m="2" />}
        variant="solid"
        rounded="full"
      />
    </HStack>
  );
};

export const Empty: FC = () => {
  return (
    <VStack pt='70'> 
      <CustomSvg xml={notfound} />
    </VStack>
  );
};
