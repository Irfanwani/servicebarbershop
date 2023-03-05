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
    paddingHorizontal: 5,
  },
  logout: {
    position: "absolute",
    overflow: "hidden",
    bottom: -20,
    left: width / 2 - 20,
  },
  options: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    elevation: 5,
    marginBottom: 10
  },
});

export default styles;
