import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  gradient: {
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    height: height / 2,
    width,
    paddingHorizontal: 5
  },
});

export default styles;
