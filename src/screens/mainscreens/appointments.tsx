import { FlatList } from "native-base";
import { FC, memo, useEffect, useRef, useState } from "react";
import { RefreshControl } from "react-native";
import {
  CustomSkeleton,
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
  const [searching, setSearching] = useState(false);

  const [search, setSearch] = useState("");

  const {
    data: appointments,
    error,
    isFetching,
    isLoading,
    refetch,
    isError,
  } = useGetappointmentsQuery(
    { page_no, search },
    { refetchOnMountOrArgChange: true }
  );

  const changeSearch = (val: string) => {
    if (isFetching || isLoading) return;
    setScroll(false);
    setSearching(true);
    setPageNo(1);
    setSearch(val);
  };

  const refetchData = () => {
    if (isFetching || isLoading) return;
    setSearching(false);
    setLoading(true);
    if (page_no == 1) refetch();
    else setPageNo(1);
    setEndReached(false);
  };

  useEffect(() => {
    if (!isFetching) {
      setSearching(false);
      setLoading(false);
    }
  }, [isFetching]);

  const firstRender = useRef(true);

  const changePage = () => {
    if (isFetching || isLoading) return;
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
      ListHeaderComponent={
        <ListHeader
          setSearch={changeSearch}
          loading={isFetching && searching}
        />
      }
      ListEmptyComponent={isFetching ? <CustomSkeleton /> : <Empty />}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll
      ListFooterComponent={
        <Footer
          isFetching={isFetching && !loading && !searching}
          endReached={endReached}
        />
      }
      onEndReached={changePage}
    />
  );
};

export default memo(Appointments);
