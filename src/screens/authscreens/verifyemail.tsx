import { Button, Input, ScrollView, Text } from "native-base";
import { FC, memo, useState } from "react";
import { mail } from "../../assets/mail";
import ErrorMessage from "../../components/generalcomponents/error";
import { CustomSvg } from "../../components/svgs/svg";
import {
  useLazyGetsignupcodeQuery,
  useVerifyemailMutation,
} from "../../store/apislices/authapislices";
import styles from "./styles";

const VerifyEmail: FC = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const [getCodeQuery, { isLoading: gettingCode }] =
    useLazyGetsignupcodeQuery();

  const [verifyemailMutation, { isLoading }] = useVerifyemailMutation();

  const getcode = async () => {
    try {
      let res = await getCodeQuery(null).unwrap();
      console.log(res, "new code");
    } catch (err) {
      console.log(err, "new code error");
    }
  };

  const submit = async () => {
    if (!code) {
      setError("Please enter a verification code");
      return;
    }

    try {
      let res = await verifyemailMutation({ code }).unwrap();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.loginscroll}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <CustomSvg xml={mail} />
      <Text style={styles.label}>Verify Email</Text>
      <Input
        isInvalid={!!error}
        placeholder="Enter Verification Code"
        value={code}
        onChangeText={setCode}
        marginY="1"
        variant="rounded"
      />

      <ErrorMessage error={error} />
      <Button
        isLoading={isLoading}
        isLoadingText="Verifying Email"
        onPress={submit}
        size="lg"
        style={styles.button}
        padding="5"
      >
        Verify Email
      </Button>

      <Button
        isLoading={gettingCode}
        isLoadingText="Sending Code"
        onPress={getcode}
        variant="ghost"
        alignSelf="center"
        style={styles.button}
      >
        Resend Verification Code
      </Button>
    </ScrollView>
  );
};

export default memo(VerifyEmail);
