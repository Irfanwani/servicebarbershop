import { Button, Icon, Input, ScrollView, Text, useToast } from "native-base";
import { FC, memo, useState } from "react";
import styles from "./styles";

import { Ionicons } from "@expo/vector-icons";
import { LoginProps } from "./types";
import { CustomSvg } from "../../components/svgs/svg";
import { login } from "../../assets/login";
import { useLoginMutation } from "../../store/apislices/authapislices";
import ErrorMessage from "../../components/generalcomponents/error";
import * as SecureStore from "expo-secure-store";
import { CustomAlert } from "../../components/generalcomponents/alerts";

const Login: FC<LoginProps> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: null, password: null });

  const [isSecure, setIsSecure] = useState(true);

  const [loginMutation, { isLoading }] = useLoginMutation();

  const toast = useToast();

  const changeSecure = () => {
    setIsSecure((prev) => !prev);
  };

  const gotoRegister = () => {
    navigation.navigate("register");
  };

  const gotoForgotPassword = () => {
    navigation.navigate("forgotpassword");
  };

  const submit = async () => {
    if (!username) {
      setError({ username: "Please provide a valid username", password: null });
      return;
    }
    if (!password) {
      setError({ username: null, password: "Please provide a valid password" });
      return;
    }

    setError({ username: null, password: null });
    try {
      let res = await loginMutation({ username, password }).unwrap();
      await SecureStore.setItemAsync("token", res.token);
      toast.show({
        render: () => (
          <CustomAlert status="success" message="Logged in successfully" />
        ),
      });
    } catch (err) {
      // ADD AN ERROR HANDLER
      console.log(err);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.loginscroll}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      {/* <CustomAlert status="success" message="Logged in successfully" /> */}
      <CustomSvg xml={login} />
      <Text style={styles.label}>Welcome Back!</Text>
      <Input
        isInvalid={!!error.username}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        marginY="1"
        variant="rounded"
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

      <Button
        variant="link"
        padding="0"
        alignSelf="flex-end"
        onPress={gotoForgotPassword}
      >
        Forgot Password?
      </Button>
      <ErrorMessage error={error.username ?? error.password} />
      <Button
        isLoading={isLoading}
        isLoadingText="Logging In"
        size="lg"
        style={styles.button}
        padding="5"
        onPress={submit}
      >
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
