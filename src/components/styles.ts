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
  iconbutton: { borderRadius: 40, position: "absolute", bottom: 0, right: 0 },
  error: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
  logout: { position: "absolute", bottom: 20, right: 10 },
  settingitem: {
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  viewimage: {
    backgroundColor: "#00000055",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: "23%",
    alignItems: "center",
    overflow: "hidden",
    alignSelf: "center",
    borderTopEndRadius: 100,
    borderTopStartRadius: 100,
  },
  imageview: {
    height: "100%",
    justifyContent: "center",
  },
});

export default styles;
