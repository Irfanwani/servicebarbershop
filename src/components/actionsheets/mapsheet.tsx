import { Actionsheet, Icon, IconButton, VStack } from "native-base";
import { FC, useState } from "react";
import MapView, { MapType, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import styles from "../styles";
import { MapSheetProps } from "./types";
import { Ionicons } from "@expo/vector-icons";

export const MapSheet: FC<MapSheetProps> = ({ isOpen, onClose, location }) => {
  const [mapType, setMapType] = useState<MapType>("standard");
  const changeMapType = () => {
    if (mapType == "standard") {
      setMapType("hybrid");
    } else {
      setMapType("standard");
    }
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <MapView
          mapType={mapType}
          loadingEnabled
          initialRegion={location}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
        >
          <Marker coordinate={location} />
        </MapView>

        <VStack space="3" marginRight="3" style={styles.iconbutton}>
          <IconButton
            variant="solid"
            borderRadius="full"
            icon={
              <Icon
                as={Ionicons}
                name={mapType == "standard" ? "map" : "globe"}
                size="xl"
              />
            }
            colorScheme="secondary"
            onPress={changeMapType}
          />
          <IconButton
            variant="solid"
            borderRadius="full"
            icon={<Icon as={Ionicons} name="checkmark" size="xl" />}
            colorScheme="success"
          />
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
