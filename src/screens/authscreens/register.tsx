import { Button, Icon, Input, ScrollView, Text } from "native-base";
import { FC, memo, useState } from "react";
import styles from "./styles";

import { Ionicons } from "@expo/vector-icons";
import { LoginProps } from "./types";
import { CustomSvg } from "../../components/svgs/svg";
import { login } from "../../assets/login";
import { useRegisterMutation } from "../../store/apislices/authapislices";
import ErrorMessage from "../../components/generalcomponents/error";
import { credsvalidator } from "../../utils/credsvalidator";
import { showToast } from "../../components/generalcomponents/alerts";
import { errorHandler } from "../../utils/errorhandler";

const Register: FC<LoginProps> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordagain, setPasswordAgain] = useState("");

  const [isSecure, setIsSecure] = useState(true);
  const [error, setError] = useState({
    username: null,
    email: null,
    password: null,
    passwordagain: null,
  });

  const [registerMutation, { isLoading }] = useRegisterMutation({
    fixedCacheKey: "logindata",
  });

  const changeSecure = () => {
    setIsSecure((prev) => !prev);
  };

  const gotoLogin = () => {
    navigation.navigate("login");
  };

  const submit = async () => {
    if (!credsvalidator({ username, email, password, passwordagain, setError }))
      return;
    try {
      await registerMutation({
        username,
        email,
        password,
      }).unwrap();
      showToast("success", "Account Created Successfully!");
    } catch (err) {
      errorHandler(err);
    }
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
        isInvalid={!!error.username}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        marginY="1"
        variant="rounded"
      />
      <Input
        isInvalid={!!error.email}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        marginY="1"
        variant="rounded"
        keyboardType="email-address"
      />
      <Input
        isInvalid={!!error.password}
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
        variant="rounded"
      />
      <Input
        isInvalid={!!error.passwordagain}
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
        variant="rounded"
      />

      <ErrorMessage
        error={
          error.username ?? error.email ?? error.password ?? error.passwordagain
        }
      />
      <Button
        isLoading={isLoading}
        isLoadingText="Registering"
        onPress={submit}
        size="lg"
        style={styles.button}
        padding="5"
      >
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
