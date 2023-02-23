import { extendTheme } from "native-base";

export const theme = extendTheme({
  components: {
    FlatList: {
      baseStyle: {
        _light: { backgroundColor: "white" },
        _dark: { backgroundColor: "#27273a" },
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
  },
});
