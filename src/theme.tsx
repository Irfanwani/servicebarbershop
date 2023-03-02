import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { extendTheme } from "native-base";

export const theme = extendTheme({
  components: {
    FlatList: {
      baseStyle: {
        _light: { backgroundColor: "white" },
        _dark: { backgroundColor: "#27272f" },
      },
    },
    ScrollView: {
      baseStyle: {
        _light: { backgroundColor: "white" },
        _dark: { backgroundColor: "#27272f" },
      },
    },
    View: {
      baseStyle: {
        _light: { backgroundColor: "white" },
        _dark: { backgroundColor: "#27272f" },
      },
    },
    Button: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
    Checkbox: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
    IconButton: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
    Input: {
      defaultProps: {
        size: "md",
      },
    },
    Heading: {
      defaultProps: {
        size: "md",
      },
    },
    TextArea: {
      defaultProps: {
        size: "md",
      },
    },
  },
});

export const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#27272f",
  },
};

export const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};
