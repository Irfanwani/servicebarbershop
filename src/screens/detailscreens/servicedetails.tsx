import { FlatList } from "native-base";
import { FC, memo, useState } from "react";
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
  const [selectedServices, setSelectedServices] = useState({});

  const selectItem = (item: string, cost: number, selected: boolean) => {
    if (selected) {
      setSelectedServices((prev) => ({
        ...prev,
        [item]: { service: item, cost },
      }));
    } else {
      setSelectedServices((prev) => ({ ...prev, [item]: null }));
    }
  };

  const singleItem = ({ item }) => {
    return renderItem({ item, selectItem });
  };

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      removeClippedSubviews={false}
      data={services}
      contentContainerStyle={styles.scroll}
      renderItem={singleItem}
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
