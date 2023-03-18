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
import styles from "../../screens/detailscreens/styles";
import { ServiceProps } from "./types";
import { useAddserviceDetailsMutation } from "../../store/apislices/detailsapislice";

const ServiceDetails: FC<ServiceProps> = ({
  servicesSelected,
  message,
  updating,
  services,
}) => {
  const [selectedServices, setSelectedServices] = useState(servicesSelected);
  const [error, setError] = useState(null);

  const [servicesMutation, { isLoading }] = useAddserviceDetailsMutation();

  const selectItem = (item: string, cost: number, selected: boolean) => {
    if (selected) {
      setSelectedServices((prev) => ({
        ...prev,
        [item]: { ...prev?.[item], service: item, cost },
      }));
    } else {
      setSelectedServices((prev) => ({ ...prev, [item]: null }));
    }
  };

  const singleItem = ({ item }) => {
    return renderItem({
      item,
      selectItem,
      updating,
      oldcost: selectedServices?.[item]?.cost?.toString(),
    });
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

      console.log(body);
      await servicesMutation({
        body,
        method: updating ? "PUT" : "POST",
      }).unwrap();
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
