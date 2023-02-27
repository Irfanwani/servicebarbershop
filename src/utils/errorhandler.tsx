import { showToast } from "../components/generalcomponents/alerts";

export const errorHandler = (err: any) => {
  console.log(JSON.stringify(err), "error");
  const { status, data } = err;

  try {
    let errorString = Object.values(data).join("\n");

    if (!Number(status)) throw new Error();
    if (Number(status) == 401) {
      showToast("info", "Token Expired! Please login again");
    } else {
      showToast("error", errorString);
    }
  } catch (error) {
    showToast("warning", "Please check your internet connection and try again");
  }
};
