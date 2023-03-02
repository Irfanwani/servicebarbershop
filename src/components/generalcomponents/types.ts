export type ErrorProps = {
  error: string;
};

export type CustomAlertProps = {
  status: string;
  message: string;
};

export type LogoutProps = {
  onPress: () => Promise<void>;
  isLoading: boolean;
};
