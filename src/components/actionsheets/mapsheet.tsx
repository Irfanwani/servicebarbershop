import { Actionsheet, Icon, IconButton, VStack } from "native-base";
import { FC, useState } from "react";
import MapView, {
  LatLng,
  MapPressEvent,
  MapType,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import styles from "../styles";
import { MapSheetProps } from "./types";
import { Ionicons } from "@expo/vector-icons";

export const MapSheet: FC<MapSheetProps> = ({
  isOpen,
  onClose,
  location,
  selectLocation,
}) => {
  const [mapType, setMapType] = useState<MapType>("standard");

  const [coords, setCoords] = useState<LatLng>(location);

  const changeMapType = () => {
    if (mapType == "standard") {
      setMapType("hybrid");
    } else {
      setMapType("standard");
    }
  };

  const setLocation = (event: MapPressEvent) => {
    let crds = event.nativeEvent.coordinate;
    setCoords(crds);
  };

  const confirmLocation = () => {
    selectLocation(coords);
    onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <MapView
          onPress={setLocation}
          mapType={mapType}
          loadingEnabled
          initialRegion={location}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
        >
          <Marker coordinate={coords} />
        </MapView>

        <VStack
          space="3"
          marginRight="3"
          marginBottom="10"
          style={styles.iconbutton}
        >
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
            onPress={confirmLocation}
          />
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
