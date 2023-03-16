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
import { useAddserviceDetailsMutation } from "../../store/apislices/detailsapislice";
import { serviceDetailsValidator } from "../../utils/credsvalidator";
import { useKeyboardVisible } from "../../utils/customhooks";
import { errorHandler } from "../../utils/errorhandler";
import { services } from "../../screens/detailscreens/constants";
import styles from "../../screens/detailscreens/styles";

const ServiceDetails: FC = () => {
  const [servicetype, setServiceType] = useState("");
  const [selectedServices, setSelectedServices] = useState({});
  const [error, setError] = useState(null);

  const [servicesMutation, { isLoading }] = useAddserviceDetailsMutation();

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
    if (!serviceDetailsValidator(servicetype, selservices, setError)) return;
    try {
      let body = {
        service_type: servicetype,
        services_list: selservices,
      };

      await servicesMutation(body).unwrap();
      showToast("success", "Registration Completed!");
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
      ListHeaderComponent={
        <ListHeader value={servicetype} onValueChange={setServiceType} />
      }
      ListFooterComponent={
        <ListFooter onPress={submit} isLoading={isLoading} error={error} />
      }
    />
  );
};

export default memo(ServiceDetails);
