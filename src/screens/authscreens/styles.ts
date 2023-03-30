import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  landingrender: {
    width,
    justifyContent: "center",
  },
  animatedview: {
    height,
  },
  image: {
    height,
    aspectRatio: 4500 / 4507, // copy pasted the dimensions,
  },
  headings: {
    alignSelf: "center",
    width: width - 20,
  },
  tagline: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  subheading: {
    textAlign: "center",
  },
  tagview: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconbutton: {
    position: "absolute",
  },
  loginscroll: {
    padding: 20,
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 30,
    alignSelf: "center",
  },
  button: {
    borderRadius: 40,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  footer: {
    alignSelf: "center",
  },
  fab: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
  },
});

export default styles;
