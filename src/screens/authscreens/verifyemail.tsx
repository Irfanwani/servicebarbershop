import { Button, Input, ScrollView, Text } from "native-base";
import { FC, memo, useState } from "react";
import { mail } from "../../assets/mail";
import { showToast } from "../../components/generalcomponents/alerts";
import ErrorMessage from "../../components/generalcomponents/error";
import { CustomSvg } from "../../components/svgs/svg";
import {
  useLazyGetsignupcodeQuery,
  useVerifyemailMutation,
} from "../../store/apislices/authapislices";
import { errorHandler } from "../../utils/errorhandler";
import styles from "./styles";

const VerifyEmail: FC = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const [getCodeQuery, { isFetching: gettingCode }] =
    useLazyGetsignupcodeQuery();

  const [verifyemailMutation, { isLoading }] = useVerifyemailMutation();

  const getcode = async () => {
    try {
      await getCodeQuery(null).unwrap();
      showToast("success", "OTP sent! Please check your inbox");
    } catch (err) {
      errorHandler(err);
    }
  };

  const submit = async () => {
    if (!code) {
      setError("Please enter a verification code");
      return;
    }

    setError(null);
    try {
      await verifyemailMutation({ code }).unwrap();
      showToast(
        "success",
        "Email Verified! Please complete the remaining steps"
      );
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
