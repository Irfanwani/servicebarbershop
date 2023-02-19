import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  svg: {
    height: height / 2.5,
    aspectRatio: 1,
    alignSelf: "center",
  },
});

export default styles;
