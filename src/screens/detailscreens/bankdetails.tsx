import {
  Button,
  Checkbox,
  Heading,
  Input,
  ScrollView,
  Select,
  Text,
} from "native-base";
import { FC, useState } from "react";
import styles from "./styles";
import authstyles from "../authscreens/styles";
import { CustomSvg } from "../../components/svgs/svg";
import { bank } from "../../assets/bank";
import { CustomSelect } from "../../components/actionsheets/dropdownsheet";
import { accounttypes, businesstypes } from "./constants";

const BankDetails: FC = () => {
  const [business_name, setBusinessName] = useState("");
  const [business_type, setBusinessType] = useState("");

  const [account_name, setaccname] = useState("");
  const [acc_number, setaccnum] = useState("");
  const [ifsc_code, setifsccode] = useState("");
  const [account_type, setAccountType] = useState("");

  const [agreed, setAgreed] = useState(false);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.scroll}
    >
      <CustomSvg xml={bank} />
      <Text style={authstyles.label}>Payment Account Details</Text>
      <Text style={styles.helpertext}>
        These Details are taken so that clients can pay you online. These
        credentials are kept confidential!
      </Text>

      <Heading size="sm" mt="4">
        Business Details
      </Heading>
      <Input
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
        placeholder="Beneficiary Name (your name in bank)"
        my="2"
        value={account_name}
        onChangeText={setaccname}
      />
      <Input
        placeholder="Account Number"
        value={acc_number}
        onChangeText={setaccnum}
        keyboardType="numeric"
      />
      <Input
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
        colorScheme="teal"
        alignSelf="center"
        my="3"
        value={agreed.toString()}
        onChange={setAgreed}
      >
        I agree to the Terms and Conditions.
      </Checkbox>

      <Button p="3" colorScheme="teal">
        Save Details
      </Button>
    </ScrollView>
  );
};

export default BankDetails;
