import { FlatList, View } from "native-base";
import { FC, memo, useEffect, useState } from "react";
import {
  ItemSeparator,
  ListFooter,
  ListHeader,
  renderItem,
} from "../../components/flatlistcomponents/servicedetail";
import { services } from "./constants";
import styles from "./styles";

const ServiceDetails: FC = () => {
  const [servicetype, setServiceType] = useState("");

  return (
    <FlatList
      data={services}
      contentContainerStyle={styles.scroll}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={ItemSeparator}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <ListHeader value={servicetype} onValueChange={setServiceType} />
      }
      ListFooterComponent={<ListFooter />}
    />
  );
};

export default memo(ServiceDetails);
