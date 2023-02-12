import React, { FC, useRef, useState } from "react";
import {
  ScrollView,
  ImageBackground,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import { Fab, Icon, Text, View } from "native-base";

import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const LandingPage: FC = () => {
  const scroller = useRef<ScrollView>();

  const [atEnd, setAtEnd] = useState(false);

  const moveOn = () => {
    scroller.current.scrollToEnd({ animated: true });
    setAtEnd(true);
  };

  const changescroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.x == 0) {
      setAtEnd(false);
    } else {
      setAtEnd(true);
    }
  };
  return (
    <ScrollView
      onScroll={changescroll}
      ref={(ref) => (scroller.current = ref)}
      horizontal
      style={styles.view}
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
    >
      <ImageBackground
        style={styles.image}
        source={require("../../assets/barbershop.jpeg")}
      >
        <View style={styles.tagview}>
          <Text style={styles.tagline}>
            Manage All your appointments at one place!
          </Text>
          <Text style={styles.tagline}>
            Join the Barbershop Services App to connect with new clients.
          </Text>

          <Fab
            onPress={moveOn}
            colorScheme="rose"
            label={atEnd ? `Let's Start` : ""}
            endIcon={<Icon as={Ionicons} name="arrow-forward" size="lg" />}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default LandingPage;
