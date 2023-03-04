import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ColorMode, extendTheme, StorageManager } from "native-base";
import { ColorSchemeType } from "native-base/lib/typescript/components/types";

export const lightgradient = ["teal.200", 'orange.100', "pink.200"];

export const darkgradient = ["cyan.800", "blueGray.500"];

export const bgDark = "#27272f";
export const bgLight = "white";

const colorScheme: ColorSchemeType = "teal";

const size = "md";
export const theme = extendTheme({
  components: {
    FlatList: {
      baseStyle: {
        _light: { backgroundColor: bgLight },
        _dark: { backgroundColor: bgDark },
      },
    },
    ScrollView: {
      baseStyle: {
        _light: { backgroundColor: bgLight },
        _dark: { backgroundColor: bgDark },
      },
    },
    View: {
      baseStyle: {
        _light: { backgroundColor: bgLight },
        _dark: { backgroundColor: bgDark },
      },
    },
    Button: {
      defaultProps: {
        colorScheme,
      },
    },
    Checkbox: {
      defaultProps: {
        colorScheme,
      },
    },
    IconButton: {
      defaultProps: {
        colorScheme,
      },
    },
    Input: {
      defaultProps: {
        size,
      },
    },
    Heading: {
      defaultProps: {
        size,
      },
    },
    TextArea: {
      defaultProps: {
        size,
      },
    },
  },
});

export const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

export const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem("@color-mode");
      return val === "dark" ? "dark" : "light";
    } catch (e) {
      return "light";
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem("@color-mode", value);
    } catch (e) {}
  },
};

// Navigator theme
const bgDarkNav = "#374151";
const bgDarkCard = "#262626";
export const bgLightCard = "#14b8a6";

export const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: bgDarkNav,
    card: bgDarkCard,
  },
};

export const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: bgLight,
    card: bgLightCard,
  },
};
