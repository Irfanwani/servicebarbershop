interface CredProps {
  username: string;
  email: string;
  password: string;
  passwordagain: string;
}
interface CallBackProps {
  setError: (props: CredProps) => void;
}
export const credsvalidator = ({
  username,
  email,
  password,
  passwordagain,
  setError,
}: CredProps & CallBackProps) => {
  if (username.length < 3) {
    setError({
      username: "Username must be 3 characters or more",
      email: null,
      password: null,
      passwordagain: null,
    });
    return false;
  }
  if (!emailvalidator(email)) {
    setError({
      username: null,
      email: "Please Enter a valid email",
      password: null,
      passwordagain: null,
    });
    return false;
  }
  if (password.length < 8) {
    setError({
      username: null,
      email: null,
      password: "Password should contain atleast 8 characters",
      passwordagain: null,
    });
    return false;
  }
  if (password != passwordagain) {
    setError({
      username: null,
      email: null,
      password: null,
      passwordagain: "Please confirm the password.",
    });
    return false;
  }
  setError({
    username: null,
    email: null,
    password: null,
    passwordagain: null,
  });
  return true;
};

export const emailvalidator = (email: string) => {
  if (!email.includes("@") || email.lastIndexOf("@") == email.length - 1) {
    return false;
  }
  return true;
};
