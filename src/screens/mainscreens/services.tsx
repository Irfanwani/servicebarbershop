import { FlatList, HStack, Skeleton } from "native-base";
import { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Servicedetails from "../../components/createupdate/servicedetails";
import { SelectedServiceType } from "../../components/createupdate/types";
import { ListHeader } from "../../components/flatlistcomponents/servicedetail";
import { useGetservicesQuery } from "../../store/apislices/mainapislices";
import { authDetails, UserType } from "../../store/slice";
import styles from "../detailscreens/styles";
import { serviceType } from "./types";

const Services: FC = () => {
  const { user } = useSelector<any, UserType>(authDetails);

  const { data, isFetching } = useGetservicesQuery(user.id);

  const [loading, setLoading] = useState(false);

  const [servicesSelected, setSelServices] = useState<SelectedServiceType>({});

  useEffect(() => {
    if (data?.length) {
      setLoading(true);
      data.forEach(({ service, cost, id }: serviceType) => {
        setSelServices((prev) => ({
          ...prev,
          [service]: { service, cost, id },
        }));
      });
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(servicesSelected)?.length == data?.length) {
      setLoading(false);
    }
  }, [servicesSelected]);

  if (isFetching || loading)
    return (
      <FlatList
        contentContainerStyle={styles.scroll}
        data={[...Array(10)].map((item, index) => index)}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        ListHeaderComponent={<ListHeader />}
        showsVerticalScrollIndicator={false}
      />
    );
  return (
    <Servicedetails
      servicesSelected={servicesSelected}
      message="Services Updated Successfully!"
      updating={true}
      services={Object.keys(servicesSelected)}
    />
  );
};

export default memo(Services);

const renderItem = () => {
  return <ServiceSkeleton />;
};

const ServiceSkeleton: FC = () => {
  return (
    <HStack justifyContent="space-between" py="4">
      <Skeleton w={50} h={50} borderRadius="full" />
      <Skeleton.Text lines={2} w={150} />
      <Skeleton w={70} h={50} borderRadius="sm" />
    </HStack>
  );
};
