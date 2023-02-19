import { Actionsheet } from "native-base";
import { FC } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import styles from "../styles";
import { MapSheetProps } from "./types";

export const MapSheet: FC<MapSheetProps> = ({ isOpen, onClose, location }) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <MapView initialRegion={location} provider={PROVIDER_GOOGLE} style={styles.map}>
            <Marker coordinate={location} />
        </MapView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
