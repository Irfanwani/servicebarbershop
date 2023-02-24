import { Button, Input, ScrollView, Text } from "native-base";
import { FC, memo, useState } from "react";
import { mail } from "../../assets/mail";
import { CustomSvg } from "../../components/svgs/svg";
import styles from "./styles";

const VerifyEmail: FC = () => {
  const [code, setCode] = useState("");

  return (
    <ScrollView
      contentContainerStyle={styles.loginscroll}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <CustomSvg xml={mail} />
      <Text style={styles.label}>Verify Email</Text>
      <Input
        placeholder="Enter Verification Code"
        value={code}
        onChangeText={setCode}
        marginY="1"
        variant="rounded"
      />
      <Button size="lg" style={styles.button} padding="5">
        Verify Email
      </Button>

      <Button variant="ghost" alignSelf="center" style={styles.button}>
        Resend Verification Code
      </Button>
    </ScrollView>
  );
};

export default memo(VerifyEmail);
