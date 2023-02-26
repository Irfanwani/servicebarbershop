interface CredProps {
  username: string;
  email: string;
  password: string;
  passwordagain: string;
  code?: string;
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

interface GenProps {
  image: string;
  location: string;
  employeeNo: string;
  startend: boolean | string;
}

interface CallBProps {
  setError: (props: GenProps) => void;
}

export const generalDetailsValidator = ({
  image,
  location,
  employeeNo,
  startend,
  setError,
}: GenProps & CallBProps) => {
  if (!image) {
    setError({
      image: "Please select a profile picture",
      location: null,
      employeeNo: null,
      startend: null,
    });
    return false;
  }

  if (!location) {
    setError({
      image: null,
      location: "Please select your location",
      employeeNo: null,
      startend: null,
    });
    return false;
  }

  if (!employeeNo) {
    setError({
      image: null,
      location: null,
      employeeNo: "Please provide the number of employees",
      startend: null,
    });

    return false;
  }

  if (!startend) {
    setError({
      image: null,
      location: null,
      employeeNo: null,
      startend: "Please provide both start and end time for a day",
    });
    return false;
  }

  setError({
    image: null,
    location: null,
    employeeNo: null,
    startend: null,
  });

  return true;
};
