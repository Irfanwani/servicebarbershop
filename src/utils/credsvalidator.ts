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

interface BankProps {
  (
    b_name: string,
    b_type: string,
    ben_name: string,
    acc_number: string,
    ifsc_code: string,
    acc_type: string,
    t_c: boolean,
    setError: ({ error, type }: { error: string; type: string }) => void
  ): boolean;
}

export const bankDetailsValidator: BankProps = (
  b_name,
  b_type,
  ben_name,
  acc_number,
  ifsc_code,
  acc_type,
  t_c,
  setError
) => {
  if (!b_name) {
    setError({ error: "Please provide a business name", type: "b_name" });
    return false;
  }
  if (!b_type) {
    setError({ error: "Please select a business type", type: "b_type" });
    return false;
  }
  if (!ben_name) {
    setError({
      error: "Please Provide the beneficiary name (same as in bank)",
      type: "ben_name",
    });
    return false;
  }
  if (!acc_number) {
    setError({
      error: "Please Provide a valid account number",
      type: "acc_number",
    });
    return false;
  }
  if (!ifsc_code) {
    setError({ error: "Please Provide a valid IFSC code", type: "ifsc_code" });
    return false;
  }
  if (!acc_type) {
    setError({ error: "Please select an account type", type: "acc_type" });
    return false;
  }
  if (!t_c) {
    setError({ error: "Please accecpt the terms and conditions", type: "t_c" });
    return false;
  }

  setError({ error: null, type: null });
  return true;
};

interface ServiceProps {
  (
    servicetype: string,
    services: { service: string; cost: number }[],
    setError: (error: string) => void
  ): boolean;
}

export const serviceDetailsValidator: ServiceProps = (
  servicetype,
  services,
  setError
) => {
  if (!servicetype) {
    setError("Please provide a service type");
    return false;
  }

  if (!services.length) {
    setError("Please select atleast one service to continue");
    return false;
  }

  for (let service of services) {
    if (!service.cost) {
      setError("Please provide a cost for each service selected");
      return false;
    }
  }

  setError(null);
  return true;
};
