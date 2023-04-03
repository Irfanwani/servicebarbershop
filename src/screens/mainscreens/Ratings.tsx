import {
  Avatar,
  Box,
  FlatList,
  Heading,
  HStack,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetratingsQuery } from "../../store/apislices/mainapislices";
import { authDetails, UserType } from "../../store/slice";
import { Empty } from "../../components/flatlistcomponents/appointment";
import { RefreshControl } from "react-native";
import { refreshcolors } from "../../theme";
import { RheaderType } from "./types";
import { StarRating } from "../../components/svgs/svg";

const Ratings: FC = () => {
  const { user } = useSelector<any, UserType>(authDetails);
  const { data, isFetching, refetch } = useGetratingsQuery(user.id);

  const [loading, setLoading] = useState(false);

  const refetchData = () => {
    setLoading(true);
    refetch();
  };

  useEffect(() => {
    if (!isFetching) setLoading(false);
  }, [isFetching]);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          colors={refreshcolors}
          refreshing={loading}
          onRefresh={refetchData}
        />
      }
      data={data?.data}
      renderItem={renderItem}
      ListEmptyComponent={isFetching ? <RatingSkeleton /> : <Empty />}
      ListHeaderComponent={
        isFetching ? (
          <HeaderSkeleton />
        ) : data?.data?.length ? (
          <ListHeader
            numreviews={data?.data?.length}
            rating={data?.avg_ratings}
          />
        ) : null
      }
    />
  );
};

export default Ratings;

const renderItem = ({ item }) => {
  return <RenderItem item={item} />;
};

const RenderItem = ({ item }) => {
  const [numberOfLines, setNum] = useState(3);

  const changeNum = () => {
    if (numberOfLines) setNum(undefined);
    else setNum(3);
  };
  return (
    <Box py="6" px="5">
      <HStack justifyContent="space-between">
        <HStack space="3">
          <Avatar source={{ uri: item.dp }} size="md" />
          <VStack>
            <Heading size="sm">{item.user}</Heading>
            <HStack space="2" alignItems="center">
              <StarRating rating={item.ratings} />
              <Text>{item.ratings.toFixed(1)}</Text>
            </HStack>
          </VStack>
        </HStack>
        <Text alignSelf="flex-end">{item.date}</Text>
      </HStack>

      <Text numberOfLines={numberOfLines} onPress={changeNum} pt="3">
        {item.comments ? item.comments : "No Comments!"}
      </Text>
    </Box>
  );
};

const ListHeader: FC<RheaderType> = ({ numreviews, rating }) => {
  return (
    <VStack justifyContent="center" alignSelf="center" py="50">
      <Heading textAlign="center" size="4xl">
        {rating}
      </Heading>

      <Box alignSelf="center">
        <StarRating rating={rating} size="lg" />
      </Box>

      <Text textAlign="center">based on {numreviews} reviews</Text>
    </VStack>
  );
};

const HeaderSkeleton: FC = () => {
  return (
    <Box alignItems="center" py="50">
      <Skeleton height="60" width="150" borderRadius="full" />
      <HStack space="2" pt="4">
        <Skeleton w="5" h="5" borderRadius="full" />
        <Skeleton w="5" h="5" borderRadius="full" />
        <Skeleton w="5" h="5" borderRadius="full" />
        <Skeleton w="5" h="5" borderRadius="full" />
        <Skeleton w="5" h="5" borderRadius="full" />
      </HStack>

      <Skeleton.Text w="150" pt="2" pb="0.5" lines={1} />
    </Box>
  );
};

const RatingSkeleton: FC = () => {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <Box key={item} py="6" px="10">
          <HStack space="3" alignItems="center">
            <Skeleton w="50" height="50" borderRadius="full" />
            <Skeleton.Text lines={2} width="100" />
          </HStack>
          <Skeleton.Text lines={5} py="4" />
        </Box>
      ))}
    </>
  );
};
