import React, { FC, useRef, useState } from "react";
import {
  ScrollView,
  ImageBackground,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from "react-native";

import { Fab, Icon, Text, View } from "native-base";

import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { LoginProps } from "./types";

const LandingPage: FC<LoginProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { width } = useWindowDimensions();

  const scroller = useRef<ScrollView>();

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
            renderInPortal={isFocused}
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
