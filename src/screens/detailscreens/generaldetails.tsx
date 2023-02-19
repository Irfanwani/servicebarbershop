import { FC, useState, useRef } from "react";
import {
  Button,
  HStack,
  Input,
  ScrollView,
  TextArea,
  useDisclose,
} from "native-base";
import styles from "./styles";
import { getCameraImageAsync, getImageAsync } from "../../utils/getassets";
import { Sheet } from "../../components/actionsheets/selectionsheet";
import { ActionAvatar } from "../../components/avatars/actionavatar";
import {
  geoCode,
  getCurrentLocation,
  reverseGeocode,
} from "../../utils/location";
import { details } from "../../assets/details";
import { CustomSvg } from "../../components/svgs/svg";

const GeneralDetails: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclose();

  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [contact, setContact] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  const locationRef = useRef(null);

  const [isLocationSheet, setIsLocationSheet] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const getCameraImage = async () => {
    const capturedImg = await getCameraImageAsync();
    if (!capturedImg) return;
    setImage(capturedImg);
    onClose();
  };

  const getImage = async () => {
    const selectedImg = await getImageAsync();
    if (!selectedImg) return;
    setImage(selectedImg);
    onClose();
  };

  const removeImage = () => {
    setImage("");
    onClose();
  };

  const openImageSheet = () => {
    setIsLocationSheet(false);
    onOpen();
  };
  const openLocationSheet = () => {
    setIsLocationSheet(true);
    onOpen();
  };

  const getLocation = async () => {
    const currentLocation = await getCurrentLocation();
    setCoords(currentLocation);
    const address = await reverseGeocode(currentLocation);
    setLocation(address);
    onClose();
    locationRef.current?.blur();
  };

  const focusLocationInput = () => {
    onClose();
    locationRef.current?.blur();
    setTimeout(() => {
      locationRef.current?.focus();
    }, 100);
  };

  const changeLocation = (lc: string) => {
    setEditing(true);
    setLocation(lc);
  };

  const setAddress = async () => {
    if (!isEditing) return;

    let crds = await geoCode(location);

    setCoords(crds);
    setEditing(false);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.scroll}
    >
      <HStack>
        <ActionAvatar image={image} onOpen={openImageSheet} />
        <CustomSvg xml={details} />
      </HStack>

      <Input
        ref={(ref) => (locationRef.current = ref)}
        placeholder="Location"
        value={location}
        onPressIn={openLocationSheet}
        onChangeText={changeLocation}
        onEndEditing={setAddress}
      />
      {isLocationSheet ? (
        <Sheet
          isOpen={isOpen}
          onClose={onClose}
          firstIconCallback={getLocation}
          secondIconCallback={getImage}
          thirdIconCallback={focusLocationInput}
          icon1="location"
          icon2="map"
          icon3="pencil"
        />
      ) : (
        <Sheet
          isOpen={isOpen}
          onClose={onClose}
          firstIconCallback={getCameraImage}
          secondIconCallback={getImage}
          thirdIconCallback={removeImage}
          icon1="camera"
          icon2="image-sharp"
          icon3="reload"
        />
      )}
      <TextArea
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        maxLength={1000}
        autoCompleteType={undefined}
        marginY="2"
      />

      <Input
        value={contact}
        onChangeText={setContact}
        placeholder="Contact (Another Email or Phone)"
        keyboardType="email-address"
      />

      <Input
        value={employeeNo}
        onChangeText={setEmployeeNo}
        placeholder="Number of Employees"
        keyboardType="numeric"
        marginY="2"
      />

      <Button colorScheme="teal" marginTop="5" padding="3">
        Save Details
      </Button>
    </ScrollView>
  );
};
export default GeneralDetails;
