import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestCameraPermissionsAsync,
} from "expo-image-picker";
import { Alert } from "react-native";
import Share from "react-native-share";

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
    aspect: [1, 1],
  });

  if (result.canceled) return null;

  return result.assets[0].uri;
};

export const getImageAsync = async () => {
  let result = await launchImageLibraryAsync({
    mediaTypes: MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
  });

  if (result.canceled) return null;

  return result.assets[0].uri;
};

const options = {
  title: "Barbershop Services App",
  message:
    "Download the barbershop services app from playstore for free to connect with new clients and manage your appoinments.",
  url: "https://play.google.com/store/apps/details?id=com.servicebarbershop",
};

export const shareApp = async () => {
  try {
    await Share.open(options);
  } catch {}
};
