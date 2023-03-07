import { FlatList } from "native-base";
import { FC, memo, useEffect, useRef, useState } from "react";
import { RefreshControl } from "react-native";
import {
  Empty,
  Footer,
  ListHeader,
  renderItem,
} from "../../components/flatlistcomponents/appointment";
import { useGetappointmentsQuery } from "../../store/apislices/mainapislices";
import { refreshcolors } from "../../theme";
import { errorHandler } from "../../utils/errorhandler";

const Appointments: FC = () => {
  const [page_no, setPageNo] = useState(1);
  const [scroll, setScroll] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data: appointments,
    error,
    refetch,
    isFetching,
    isError,
  } = useGetappointmentsQuery(page_no, { refetchOnMountOrArgChange: true });

  const refetchData = () => {
    setLoading(true);
    refetch();
  };

  useEffect(() => {
    if (!isFetching) setLoading(false);
  }, [isFetching]);

  const firstRender = useRef(true);

  const changePage = () => {
    if (scroll && !endReached) {
      setScroll(false);
      setPageNo((prev) => prev + 1);
    }
  };

  const changeScroll = () => {
    setScroll(true);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (isError) {
      const { status }: any = error;
      if (status == 404) {
        setEndReached(true);
        return;
      }
      errorHandler(error);
    }
  }, [error]);

  return (
    <FlatList
      onScrollBeginDrag={changeScroll}
      showsVerticalScrollIndicator={false}
      data={appointments}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          colors={refreshcolors}
          refreshing={loading}
          onRefresh={refetchData}
        />
      }
      ListHeaderComponent={<ListHeader />}
      ListEmptyComponent={isFetching ? null : <Empty />}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll
      ListFooterComponent={
        <Footer isFetching={isFetching} endReached={endReached} />
      }
      onEndReached={changePage}
    />
  );
};

export default memo(Appointments);
