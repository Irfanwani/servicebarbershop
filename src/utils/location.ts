import {
  geocodeAsync,
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
  LocationAccuracy,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { Alert } from "react-native";

const getLocationPermission = async () => {
  let { status: previousStatus } = await getForegroundPermissionsAsync();

  if (previousStatus == "granted") {
    return previousStatus;
  }

  let { status } = await requestForegroundPermissionsAsync();

  if (status != "granted") {
    Alert.alert(
      "Permission Denied!",
      "Please allow the app to access you current location for better experience for the customers."
    );
    let { status: secondTime } = await requestForegroundPermissionsAsync();

    if (secondTime != "granted") {
      return null;
    }

    return secondTime;
  }

  return status;
};

export const getCurrentLocation = async () => {
  let allowed = await getLocationPermission();

  if (!allowed) return;

  let currentLocation = await getCurrentPositionAsync({
    accuracy: LocationAccuracy.BestForNavigation,
  });

  return currentLocation.coords;
};

export const reverseGeocode = async (location: {
  latitude: number;
  longitude: number;
}) => {
  let allowed = await getLocationPermission();

  if (!allowed) return;

  let address = await reverseGeocodeAsync(location);

  let result = [
    ...new Set(Object.values(address[0]).filter((item: string) => item)),
  ].join(" ");

  return result;
};

export const geoCode = async (address: string) => {
  let allowed = await getLocationPermission();

  if (!allowed) return;

  let coords = await geocodeAsync(address);

  const { latitude, longitude } = coords[0];
  return { latitude, longitude };
};
