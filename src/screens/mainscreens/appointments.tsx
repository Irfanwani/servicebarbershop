import { FlatList } from "native-base";
import { FC, memo, useEffect, useRef, useState } from "react";
import {
  Empty,
  Footer,
  ListHeader,
  renderItem,
} from "../../components/flatlistcomponents/appointment";
import { useGetappointmentsQuery } from "../../store/apislices/mainapislices";
import { errorHandler } from "../../utils/errorhandler";

const Appointments: FC = () => {
  const [page_no, setPageNo] = useState(1);
  const [scroll, setScroll] = useState(false);
  const [endReached, setEndReached] = useState(false);

  const {
    data: appointments,
    error,
    refetch,
    isFetching,
    isError,
  } = useGetappointmentsQuery(page_no, { refetchOnMountOrArgChange: true });

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
      refreshing={isFetching}
      onRefresh={refetch}
      ListHeaderComponent={<ListHeader />}
      ListEmptyComponent={isFetching ? null : <Empty />}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll
      ListFooterComponent={<Footer endReached={endReached} />}
      onEndReached={changePage}
    />
  );
};

export default memo(Appointments);
