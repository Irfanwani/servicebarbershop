import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  svg: {
    height: height / 2.6,
    aspectRatio: 1,
    alignSelf: "center",
  },
  map: {
    height: height / 1.3,
    width,
  },
  iconbutton: { borderRadius: 40, position: "absolute", bottom: 25, right: 0 },
});

export default styles;
