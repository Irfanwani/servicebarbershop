import { Button, Icon, Input, ScrollView, Text } from "native-base";
import { FC, memo, useState } from "react";
import styles from "./styles";

import { Ionicons } from "@expo/vector-icons";
import { LoginProps } from "./types";
import { CustomSvg } from "../../components/svgs/svg";
import { login } from "../../assets/login";

const Register: FC<LoginProps> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordagain, setPasswordAgain] = useState("");

  const [isSecure, setIsSecure] = useState(true);

  const changeSecure = () => {
    setIsSecure((prev) => !prev);
  };

  const gotoLogin = () => {
    navigation.navigate("login");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.loginscroll}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <CustomSvg xml={login} />
      <Text style={styles.label}>Let's Get Started!</Text>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        marginY="1"
        size="md"
        variant="rounded"
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        marginY="1"
        size="md"
        variant="rounded"
        keyboardType="email-address"
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
      <Input
        autoCorrect={false}
        placeholder="Confirm Password"
        value={passwordagain}
        onChangeText={setPasswordAgain}
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

      <Button colorScheme="teal" size="lg" style={styles.button} padding="5">
        REGISTER
      </Button>

      <Text style={styles.footer}>
        Already an account?{" "}
        <Text color="teal.600" onPress={gotoLogin}>
          Login Here!
        </Text>
      </Text>
    </ScrollView>
  );
};

export default memo(Register);
