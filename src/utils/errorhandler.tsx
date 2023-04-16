import { deleteItemAsync } from "expo-secure-store";
import { showToast } from "../components/generalcomponents/alerts";
import authApiSlice from "../store/apislices/authapislices";
import { logoutaction } from "../store/slice";
import { store } from "../store/store";

export const errorHandler = async (err: any) => {
  console.log(JSON.stringify(err), "error");

  try {
    const { status, data } = err;
    let errorString = Object.values(data).join("\n");

    if (!Number(status)) throw new Error();
    if (Number(status) == 401) {
      showToast("info", "Token Expired! Please login again");
      store.dispatch(logoutaction());
      await deleteItemAsync("token");
      store.dispatch(authApiSlice.util.resetApiState());
    } else {
      showToast("error", errorString);
    }
  } catch (error) {
    showToast("warning", "Please check your internet connection and try again");
  }
};
