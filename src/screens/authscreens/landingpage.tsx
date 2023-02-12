import React, { FC } from "react";
import { ScrollView, ImageBackground } from "react-native";

import { Button, Icon, Text, View } from "native-base";

import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const LandingPage: FC = () => {
  return (
    <ScrollView horizontal style={styles.view}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/barbershop.jpg")}
      >
        <View style={styles.tagview}>
          <Text style={styles.tagline}>
            Manage All your appointments at one place!
          </Text>
          <Text style={styles.tagline}>
            Join the Barbershop Services App to connect with new clients.
          </Text>
        </View>
      </ImageBackground>

      <Button
        style={styles.button}
        endIcon={<Icon as={Ionicons} name="arrow-forward" size="md" />}
        padding="4"
        colorScheme="rose"
        shadow="9"
      >
        Let's Start
      </Button>
    </ScrollView>
  );
};

export default LandingPage;
