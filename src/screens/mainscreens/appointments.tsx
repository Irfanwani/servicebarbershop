import { FlatList } from "native-base";
import { FC, useEffect } from "react";
import {
  Empty,
  ListHeader,
  renderItem,
} from "../../components/flatlistcomponents/appointment";
import Loader from "../../components/generalcomponents/loader";
import { useGetappointmentsQuery } from "../../store/apislices/mainapislices";
import { errorHandler } from "../../utils/errorhandler";

const Appointments: FC = () => {
  const {
    data: appointments,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetappointmentsQuery(null);

  useEffect(() => {
    if (error) errorHandler(error);
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={appointments}
      renderItem={renderItem}
      refreshing={isFetching}
      onRefresh={refetch}
      ListHeaderComponent={<ListHeader />}
      ListEmptyComponent={<Empty />}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll
    />
  );
};

export default Appointments;
