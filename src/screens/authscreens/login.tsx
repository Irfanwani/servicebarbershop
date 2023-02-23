import { Button, Icon, Input, ScrollView, Text } from "native-base";
import { FC, memo, useState } from "react";
import styles from "./styles";

import { Ionicons } from "@expo/vector-icons";
import { LoginProps } from "./types";
import { CustomSvg } from "../../components/svgs/svg";
import { login } from "../../assets/login";

const Login: FC<LoginProps> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isSecure, setIsSecure] = useState(true);

  const changeSecure = () => {
    setIsSecure((prev) => !prev);
  };

  const gotoRegister = () => {
    navigation.navigate("register");
  };

  const gotoForgotPassword = () => {
    navigation.navigate("forgotpassword");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.loginscroll}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <CustomSvg xml={login} />
      <Text style={styles.label}>Welcome Back!</Text>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        marginY="1"
        size="md"
        variant="rounded"
      />
      <Input
        autoCorrect={false}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={isSecure}
        keyboardType={isSecure ? undefined : "visible-password"}
        marginY="1"
        rightElement={
          <Icon
            onPress={changeSecure}
            as={Ionicons}
            name={isSecure ? "eye-off" : "eye"}
            size="lg"
            marginRight="3"
          />
        }
        size="md"
        variant="rounded"
      />

      <Button
        variant="link"
        padding="0"
        alignSelf="flex-end"
        onPress={gotoForgotPassword}
      >
        Forgot Password?
      </Button>
      <Button size="lg" style={styles.button} padding="5">
        LOGIN
      </Button>

      <Text style={styles.footer}>
        Don't have an account?{" "}
        <Text color="teal.600" onPress={gotoRegister}>
          Register Here!
        </Text>
      </Text>
    </ScrollView>
  );
};

export default memo(Login);
