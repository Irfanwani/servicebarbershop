import { Button, Icon, Image, Input, ScrollView, Text } from "native-base";
import { FC, useState } from "react";
import styles from "./styles";

import { Ionicons } from "@expo/vector-icons";
import { LoginProps } from "./types";

const ForgotPassword: FC<LoginProps> = ({ navigation }) => {
  const [isSecure, setIsSecure] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordAgain] = useState("");

  const [code, setCode] = useState("");

  const changeSecure = () => {
    setIsSecure((prev) => !prev);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.loginscroll}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <Image
        style={styles.loginimg}
        source={require("../../assets/forgot.png")}
        alt="ForgotPassword"
      />
      <Text style={styles.label}>Reset Password</Text>
      <Input
        placeholder="Registered Email"
        value={email}
        onChangeText={setEmail}
        marginY="1"
        size="md"
        variant="rounded"
      />

      <Button variant="ghost" alignSelf="center" size="lg">
        Get Verification Code
      </Button>

      <Input
        placeholder="Verification code"
        value={code}
        onChangeText={setCode}
        marginY="1"
        size="md"
        variant="rounded"
      />

      <Input
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
        Reset Password
      </Button>
    </ScrollView>
  );
};

export default ForgotPassword;
