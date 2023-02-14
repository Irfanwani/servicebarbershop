import { Button, Image, Input, ScrollView, Text } from "native-base";
import { FC, useState } from "react";
import styles from "./styles";

const VerifyEmail: FC = () => {
  const [code, setCode] = useState("");

  return (
    <ScrollView
      contentContainerStyle={styles.loginscroll}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <Image
        style={styles.loginimg}
        source={require("../../assets/mail.png")}
        alt="VerifyEmail"
      />
      <Text style={styles.label}>Verify Email</Text>
      <Input
        placeholder="Enter Verification Code"
        value={code}
        onChangeText={setCode}
        marginY="1"
        size="md"
        variant="rounded"
      />
      <Button colorScheme="teal" size="lg" style={styles.button} padding="5">
        Verify Email
      </Button>

      <Button variant="ghost" alignSelf="center" style={styles.button}>
        Resend Verification Code
      </Button>
    </ScrollView>
  );
};

export default VerifyEmail;
