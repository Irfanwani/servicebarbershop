import React, { FC, memo, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
  FlatList as FLType,
} from "react-native";

import { Fab, FlatList, Heading, Icon, Text, VStack } from "native-base";

import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { LandingPageProps } from "./types";
import { CustomSvg } from "../../components/svgs/svg";
import { landingfirst } from "../../assets/landingfirst";
import { landing2nd } from "../../assets/landing2nd";

const LandingPage: FC<LandingPageProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { width } = useWindowDimensions();

  const scroller = useRef<FLType>();

  const [atEnd, setAtEnd] = useState(false);

  const moveOn = () => {
    if (atEnd) {
      navigation.navigate("login");
    }
    scroller.current.scrollToEnd({ animated: true });
  };

  const changescroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.x < width / 1.3) {
      setAtEnd(false);
    } else if (event.nativeEvent.contentOffset.x >= width / 1.3) {
      setAtEnd(true);
    }
  };
  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        onScroll={changescroll}
        ref={scroller}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      />

      <Fab
        style={[
          styles.fab,
          {
            right: width / 2 - (atEnd ? 60 : 25),
          },
        ]}
        renderInPortal={isFocused}
        onPress={moveOn}
        colorScheme="rose"
        label={atEnd ? `Let's Start` : ""}
        endIcon={<Icon as={Ionicons} name="arrow-forward" size="lg" />}
      />
    </>
  );
};

export default memo(LandingPage);

interface renderProps {
  item: { svg: string; heading: string; subheading: string };
}

const renderItem = ({ item }: renderProps) => {
  return (
    <VStack style={styles.landingrender}>
      <CustomSvg xml={item.svg} />
      <VStack style={styles.headings}>
        <Heading style={styles.tagline}>{item.heading}</Heading>
        <Text style={styles.subheading}>{item.subheading}</Text>
      </VStack>
    </VStack>
  );
};

const data = [
  {
    svg: landingfirst,
    heading: "All at one place!",
    subheading:
      "Now you can Manage all your appointments with the clients at one place!",
  },
  {
    svg: landing2nd,
    heading: "Join Us!",
    subheading: "Join the Barbershop Services App to connect with new clients.",
  },
];
