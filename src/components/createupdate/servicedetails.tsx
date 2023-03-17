import { FlatList } from "native-base";
import { FC, memo, useState } from "react";
import { Keyboard } from "react-native";
import {
  ItemSeparator,
  ListFooter,
  ListHeader,
  renderItem,
} from "../flatlistcomponents/servicedetail";
import { showToast } from "../generalcomponents/alerts";
import { serviceDetailsValidator } from "../../utils/credsvalidator";
import { useKeyboardVisible } from "../../utils/customhooks";
import { errorHandler } from "../../utils/errorhandler";
import { services } from "../../screens/detailscreens/constants";
import styles from "../../screens/detailscreens/styles";
import { ServiceProps } from "./types";

const ServiceDetails: FC<ServiceProps> = ({
  servicesMutation,
  isLoading,
  servicesSelected,
  message,
  updating,
}) => {
  const [selectedServices, setSelectedServices] = useState(servicesSelected);
  const [error, setError] = useState(null);

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

  const keyboardOn = useKeyboardVisible();

  const submit = async () => {
    if (keyboardOn) {
      Keyboard.dismiss();
      return;
    }

    let selservices: any = Object.values(selectedServices).filter(
      (item) => item
    );
    if (!serviceDetailsValidator(selservices, setError)) return;
    try {
      let body = {
        services_list: selservices,
      };

      await servicesMutation(body).unwrap();
      showToast("success", message);
    } catch (err) {
      errorHandler(err);
    }
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
      ListHeaderComponent={<ListHeader />}
      ListFooterComponent={
        <ListFooter
          onPress={submit}
          isLoading={isLoading}
          error={error}
          title={updating ? "Update Services" : "Complete Registration"}
        />
      }
    />
  );
};

export default memo(ServiceDetails);
