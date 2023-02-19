import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestCameraPermissionsAsync,
} from "expo-image-picker";
import { Alert } from "react-native";

export const getCameraImageAsync = async () => {
  let { status } = await requestCameraPermissionsAsync();

  if (status != "granted") {
    Alert.alert(
      "Permission Denied!",
      "Please provide the camera permissions to use camera within the app."
    );
    let { status: secondTime } = await requestCameraPermissionsAsync();
    if (secondTime != "granted") {
      return null;
    }
  }

  let result = await launchCameraAsync({
    mediaTypes: MediaTypeOptions.Images,
    allowsEditing: true,
  });

  if (result.canceled) return null;

  return result.assets[0].uri;
};

export const getImageAsync = async () => {
  let result = await launchImageLibraryAsync({
    mediaTypes: MediaTypeOptions.Images,
    allowsEditing: true,
  });

  if (result.canceled) return null;

  return result.assets[0].uri;
};
