import { FlatList } from "native-base";
import { FC, useEffect } from "react";
import { renderItem } from "../../components/flatlistcomponents/appointment";
import Loader from "../../components/generalcomponents/loader";
import { useGetappointmentsQuery } from "../../store/apislices/mainapislices";
import { errorHandler } from "../../utils/errorhandler";
import styles from "./styles";

const Appointments: FC = () => {
  const {
    data: appointments,
    isLoading,
    error,
  } = useGetappointmentsQuery(null);

  useEffect(() => {
    if (error) errorHandler(error);
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatlist}
      data={appointments}
      renderItem={renderItem}
    />
  );
};

export default Appointments;
