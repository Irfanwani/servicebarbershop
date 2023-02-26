import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootAuthStackProps = {
  landingpage: undefined;
  login: undefined;
  register: undefined;
  forgotpassword: undefined;
  verifyemail: undefined;
};

export type LandingPageProps = NativeStackScreenProps<
  RootAuthStackProps,
  "landingpage"
>;

export type LoginProps = NativeStackScreenProps<RootAuthStackProps, "login">;

export type passwordResetErrorType = {
  email: string;
  password: string;
  passwordagain: string;
  code?: string;
};
