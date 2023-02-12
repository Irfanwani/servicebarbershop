import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootAuthStackProps = {
  landingpage: undefined;
  login: undefined;
  register: undefined;
  resetpassword: undefined;
  verifyemail: undefined;
};

export type LandingPageProps = NativeStackScreenProps<
  RootAuthStackProps,
  "landingpage"
>;

export type LoginProps = NativeStackScreenProps<RootAuthStackProps, "login">;
