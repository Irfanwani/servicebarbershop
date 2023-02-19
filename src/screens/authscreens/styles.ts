import { Dimensions, StyleSheet } from "react-native";

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
  loginscroll: {
    padding: 20,
  },
  label: {
    fontSize: 25,
    fontWeight: "bold",
    lineHeight: 30,
    alignSelf: "center",
  },
  button: {
    borderRadius: 40,
    margin: 20,
  },
  footer: {
    alignSelf: "center",
  },
});

export default styles;
