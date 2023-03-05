import {
  Button,
  Checkbox,
  Heading,
  Input,
  ScrollView,
  Text,
} from "native-base";
import { FC, memo, useState } from "react";
import styles from "./styles";
import authstyles from "../authscreens/styles";
import { CustomSvg } from "../../components/svgs/svg";
import { bank } from "../../assets/bank";
import { CustomSelect } from "../../components/actionsheets/dropdownsheet";
import { accounttypes, businesstypes } from "./constants";
import { useAddbankdetailsMutation } from "../../store/apislices/detailsapislice";
import { showToast } from "../../components/generalcomponents/alerts";
import { errorHandler } from "../../utils/errorhandler";
import ErrorMessage from "../../components/generalcomponents/error";
import { bankDetailsValidator } from "../../utils/credsvalidator";
import { useSelector } from "react-redux";
import { authDetails, UserType } from "../../store/slice";

const BankDetails: FC = () => {
  const data = useSelector<any, UserType[]>(authDetails)?.[0];

  const [business_name, setBusinessName] = useState("");
  const [business_type, setBusinessType] = useState("");

  const [account_name, setaccname] = useState("");
  const [acc_number, setaccnum] = useState("");
  const [ifsc_code, setifsccode] = useState("");
  const [account_type, setAccountType] = useState("");

  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState({ error: null, type: null });

  const [bankMutation, { isLoading }] = useAddbankdetailsMutation();

  const submit = async () => {
    if (
      !bankDetailsValidator(
        business_name,
        business_type,
        account_name,
        acc_number,
        ifsc_code,
        account_type,
        agreed,
        setError
      )
    )
      return;
    try {
      let body = {
        name: account_name,
        email: data?.user?.email,
        tnc_accepted: agreed,
        account_details: {
          business_name,
          business_type,
        },
        bank_account: {
          ifsc_code,
          beneficiary_name: account_name,
          account_type,
          account_number: acc_number,
        },
      };
      await bankMutation(body).unwrap();
      showToast("success", "Bank details added successfully!");
    } catch (err) {
      errorHandler(err);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.scroll}
    >
      <CustomSvg xml={bank} />
      <Text style={authstyles.label}>Payment Account Details</Text>
      <Text style={styles.helpertext}>
        These Details are taken so that clients can pay you online using our
        app. These credentials are kept confidential and cannot be updated!
      </Text>

      <Heading size="sm" mt="4">
        Business Details
      </Heading>
      <Input
        isInvalid={error.type == "b_name"}
        placeholder="Business Name"
        marginY="2"
        value={business_name}
        onChangeText={setBusinessName}
      />

      <CustomSelect
        value={business_type}
        onValueChange={setBusinessType}
        items={businesstypes}
        placeholder="Business Type"
      />

      <Heading size="sm" mt="4">
        Bank Details
      </Heading>

      <Input
        isInvalid={error.type == "ben_name"}
        placeholder="Beneficiary Name (your name in bank)"
        my="2"
        value={account_name}
        onChangeText={setaccname}
      />
      <Input
        isInvalid={error.type == "acc_number"}
        placeholder="Account Number"
        value={acc_number}
        onChangeText={setaccnum}
        keyboardType="numeric"
      />
      <Input
        isInvalid={error.type == "ifsc_code"}
        placeholder="IFSC code"
        my="2"
        value={ifsc_code}
        onChangeText={setifsccode}
      />

      <CustomSelect
        value={account_type}
        onValueChange={setAccountType}
        items={accounttypes}
        placeholder="Account Type"
      />

      <Checkbox
        isInvalid={error.type == "t_c"}
        alignSelf="center"
        mt="3"
        value={agreed.toString()}
        onChange={setAgreed}
      >
        I agree to the Terms and Conditions.
      </Checkbox>

      <ErrorMessage error={error.error} />
      <Button
        onPress={submit}
        isLoading={isLoading}
        isLoadingText="Saving details"
        p="3"
      >
        Save Details
      </Button>
    </ScrollView>
  );
};

export default memo(BankDetails);
