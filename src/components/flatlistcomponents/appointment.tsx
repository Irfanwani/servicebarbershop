import {
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Skeleton,
  Spinner,
  Text,
  useColorMode,
  VStack,
} from "native-base";
import { FC, useState } from "react";
import { darkgradient, lightgradient } from "../../theme";
import { AppFooterProps, AppHeaderProps, AppointmentType } from "./types";
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

export const ListHeader: FC<AppHeaderProps> = ({ setSearch, loading }) => {
  const theme = useTheme();

  const [value, setValue] = useState("");

  const search = () => {
    setSearch(value);
  };

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
        value={value}
        onChangeText={setValue}
        onEndEditing={search}
        placeholder="Search appointment..."
        placeholderTextColor={theme.colors.text}
        flex="0.9"
        variant="rounded"
        leftElement={<Icon as={MaterialIcons} name="search" size={25} m="2" />}
        rightElement={loading ? <Spinner mr="2" /> : null}
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
          <HStack justifyContent="space-between" p="3" alignItems={"center"}>
            <Skeleton h="4" w="100" />
            <Skeleton h="10" w="10" />
          </HStack>
          <Skeleton.Text lines={4} px="3" />
          <Skeleton rounded="md" my="5" />
        </Box>
      ))}
    </>
  );
};
