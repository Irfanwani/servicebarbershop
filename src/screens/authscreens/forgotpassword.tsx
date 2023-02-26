import { Button, Icon, Input, ScrollView, Text, useToast } from "native-base";
import { FC, memo, useState } from "react";
import styles from "./styles";

import { Ionicons } from "@expo/vector-icons";
import { CustomSvg } from "../../components/svgs/svg";
import { forgot } from "../../assets/forgot";
import {
  useGetresetcodeMutation,
  useResetpasswordMutation,
} from "../../store/apislices/authapislices";
import { credsvalidator, emailvalidator } from "../../utils/credsvalidator";
import ErrorMessage from "../../components/generalcomponents/error";
import { passwordResetErrorType } from "./types";
import * as SecureStore from "expo-secure-store";
import { CustomAlert } from "../../components/generalcomponents/alerts";
import { errorHandler } from "../../utils/errorhandler";

const ForgotPassword: FC = () => {
  const [isSecure, setIsSecure] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordAgain] = useState("");

  const [code, setCode] = useState("");
  const [error, setError] = useState<passwordResetErrorType>({
    email: null,
    password: null,
    passwordagain: null,
  });

  const toast = useToast();

  const [getcodeMutation, { isLoading: gettingCode }] =
    useGetresetcodeMutation();

  const [resetMutation, { isLoading }] = useResetpasswordMutation();

  const changeSecure = () => {
    setIsSecure((prev) => !prev);
  };

  const getcode = async () => {
    if (!emailvalidator(email)) {
      setError((prev) => ({
        ...prev,
        email: "Please provide a valid and registered email",
      }));

      return;
    }

    setError({
      email: null,
      password: null,
      code: null,
      passwordagain: null,
    });

    try {
      await getcodeMutation({ email }).unwrap();
      toast.show({
        render: () => (
          <CustomAlert
            status="success"
            message="OTP sent! Please check your inbox"
          />
        ),
      });
    } catch (err) {
      errorHandler(err);
    }
  };

  const resetPassword = async () => {
    if (!code) {
      setError({
        email: null,
        password: null,
        passwordagain: null,
        code: "Please enter a Verification Code",
      });
      return;
    }
    if (
      !credsvalidator({
        username: "null",
        email,
        password,
        passwordagain,
        setError,
      })
    )
      return;

    try {
      let res = await resetMutation({ code, password, email }).unwrap();
      await SecureStore.setItemAsync("token", res.token);
      toast.show({
        render: () => (
          <CustomAlert
            status="success"
            message="Password Reset! Logged in successfully"
          />
        ),
      });
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
      <CustomSvg xml={forgot} />
      <Text style={styles.label}>Reset Password</Text>
      <Input
        isInvalid={!!error.email}
        placeholder="Registered Email"
        value={email}
        onChangeText={setEmail}
        marginY="1"
        variant="rounded"
      />

      <Button
        onPress={getcode}
        isLoading={gettingCode}
        isLoadingText="Sending code"
        variant="ghost"
        alignSelf="center"
        size="lg"
      >
        Get Verification Code
      </Button>

      <Input
        isInvalid={!!error.code}
        placeholder="Verification code"
        value={code}
        onChangeText={setCode}
        marginY="1"
        variant="rounded"
      />

      <Input
        isInvalid={!!error.password}
        autoCorrect={false}
        placeholder="New Password"
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
          error.email ?? error.code ?? error.password ?? error.passwordagain
        }
      />
      <Button
        onPress={resetPassword}
        isLoading={isLoading}
        isLoadingText="Logging In"
        size="lg"
        style={styles.button}
        padding="5"
      >
        Reset Password
      </Button>
    </ScrollView>
  );
};

export default memo(ForgotPassword);
