import { FlatList } from "native-base";
import { FC, memo, useEffect, useRef } from "react";
import {
  Empty,
  Footer,
  ListHeader,
  renderItem,
} from "../../components/flatlistcomponents/appointment";
import Loader from "../../components/generalcomponents/loader";
import { useGetappointmentsQuery } from "../../store/apislices/mainapislices";
import { errorHandler } from "../../utils/errorhandler";

const Appointments: FC = () => {
  const {
    data: appointments,
    error,
    refetch,
    isFetching,
    isError,
  } = useGetappointmentsQuery(null, { refetchOnMountOrArgChange: true });

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (isError) errorHandler(error);
  }, [error]);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={appointments}
      renderItem={renderItem}
      refreshing={isFetching}
      onRefresh={refetch}
      ListHeaderComponent={<ListHeader />}
      ListEmptyComponent={isFetching ? <Loader /> : <Empty />}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll
      ListFooterComponent={<Footer isLoading={isFetching} />}
    />
  );
};

export default memo(Appointments);
