import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  animatedview: {
    height,
  },
  image: {
    height,
    aspectRatio: 4500 / 4507, // copy pasted the dimensions,
  },
  tagline: {
    fontSize: 25,
    textAlign: "center",
    color: "cyan",
    width: width / 1.5,
    lineHeight: 35,
    fontStyle: "italic",
  },
  tagview: {
    justifyContent: "space-around",
    flex: 1,
    backgroundColor: "#00000055",
    flexDirection: "row",
    alignItems: "center",
  },
  iconbutton: {
    position: "absolute",
  },
});

export default styles;
