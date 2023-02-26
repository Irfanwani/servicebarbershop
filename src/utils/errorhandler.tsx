import { Toast } from "native-base";
import { CustomAlert } from "../components/generalcomponents/alerts";

export const errorHandler = (err: any) => {
  console.log(JSON.stringify(err), "error");
  const { status, data } = err;

  let errorString = Object.values(data).join(" ");
  try {
    if (!Number(status)) throw new Error();
    if (Number(status) == 401) {
      Toast.show({
        render: () => (
          <CustomAlert
            status="info"
            message="Token Expired! Please login again"
          />
        ),
      });
    } else {
      Toast.show({
        render: () => <CustomAlert status="error" message={errorString} />,
      });
    }
  } catch (error) {
    Toast.show({
      render: () => (
        <CustomAlert
          status="warning"
          message="Please check your internet connection and try again"
        />
      ),
    });
  }
};
