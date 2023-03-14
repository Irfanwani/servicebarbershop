import { useColorMode } from "native-base";
import { FC, useEffect, useState } from "react";
import { RoundButton } from "./roundbutton";
import { CustomTransition } from "./transition";

export const ThemeToggler: FC = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const [loading, setLoading] = useState(false);

  const changeTheme = () => {
    setLoading(true);
    toggleColorMode();
  };

  useEffect(() => {
    setLoading(false);
  }, [colorMode]);

  return (
    <>
      <RoundButton
        colorScheme="rose"
        icon={colorMode == "dark" ? "md-sunny" : "moon"}
        onPress={changeTheme}
        isLoading={loading}
      />

      <CustomTransition loading={loading} />
    </>
  );
};
