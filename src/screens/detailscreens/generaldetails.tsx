import { FC, useState, useRef, memo } from "react";
import {
  Button,
  HStack,
  Input,
  ScrollView,
  Text,
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

import authstyles from "../authscreens/styles";
import { MapSheet } from "../../components/actionsheets/mapsheet";
import { LatLng } from "react-native-maps";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { timeFormatter } from "../../utils/timeFormatter";
import { useAddgeneraldetailsMutation } from "../../store/apislices/detailsapislice";
import { errorHandler } from "../../utils/errorhandler";
import { generalDetailsValidator } from "../../utils/credsvalidator";
import { getFormData } from "../../utils/formdata";
import ErrorMessage from "../../components/generalcomponents/error";
import { showToast } from "../../components/generalcomponents/alerts";

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

  const [error, setError] = useState({
    image: null,
    location: null,
    employeeNo: null,
    startend: null,
  });

  const locationRef = useRef(null);

  const [isLocationSheet, setIsLocationSheet] = useState(false);
  const [isMapSheet, setIsMapSheet] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const [detailsMutation, { isLoading }] = useAddgeneraldetailsMutation();

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
    setIsMapSheet(false);
    onOpen();
  };
  const openLocationSheet = () => {
    setIsLocationSheet(true);
    setIsMapSheet(false);
    onOpen();
  };

  const openMapSheet = () => {
    setIsLocationSheet(false);
    setIsMapSheet(true);
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

  const selectLocation = async (coords: LatLng) => {
    setCoords(coords);
    const address = await reverseGeocode(coords);
    setLocation(address);
  };

  const onChange = (date: Date, type: string) => {
    if (type == "start") {
      setStartTime(date.toLocaleTimeString().slice(0, 5));
    } else {
      setEndTime(date.toLocaleTimeString().slice(0, 5));
    }
  };

  const openDateTimePicker = (type: string) => {
    const [hour, minute] =
      type == "start" ? startTime.split(":") : endTime.split(":");

    let value =
      (type == "start" && startTime) || (type == "end" && endTime)
        ? new Date(2023, 3, 3, +hour, +minute)
        : new Date();
    DateTimePickerAndroid.open({
      value,
      onChange: (event: DateTimePickerEvent, date: Date) => {
        onChange(date, type);
      },
      mode: "time",
      is24Hour: false,
    });
  };

  const submit = async () => {
    if (
      !generalDetailsValidator({
        image,
        location,
        employeeNo,
        startend: !!(startTime && endTime),
        setError,
      })
    )
      return;

    let body = getFormData(image, {
      lat: coords.latitude,
      lng: coords.longitude,
      location,
      about: bio,
      contact,
      employee_count: employeeNo,
      start_time: startTime,
      end_time: endTime,
    });

    try {
      await detailsMutation(body).unwrap();
      showToast("success", "Details saved successfully!");
    } catch (err) {
      errorHandler(err);
    }
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
      <Text style={authstyles.label}>Please Fill these details</Text>

      <Input
        isInvalid={!!error.location}
        ref={(ref) => (locationRef.current = ref)}
        placeholder="Location"
        value={location}
        onPressIn={openLocationSheet}
        onChangeText={changeLocation}
        onEndEditing={setAddress}
        marginY="2"
      />
      {isLocationSheet ? (
        <Sheet
          isOpen={isOpen}
          onClose={onClose}
          firstIconCallback={getLocation}
          secondIconCallback={openMapSheet}
          thirdIconCallback={focusLocationInput}
          icon1="location"
          icon2="map"
          icon3="pencil"
        />
      ) : isMapSheet ? (
        <MapSheet
          selectLocation={selectLocation}
          isOpen={isOpen}
          onClose={onClose}
          location={{ ...coords, latitudeDelta: 5, longitudeDelta: 5 }}
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

      <Input
        value={contact}
        onChangeText={setContact}
        placeholder="Contact (Another Email or Phone)"
        keyboardType="email-address"
      />

      <Input
        isInvalid={!!error.employeeNo}
        value={employeeNo}
        onChangeText={setEmployeeNo}
        placeholder="Number of Employees"
        keyboardType="numeric"
        marginY="2"
      />

      <TextArea
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        maxLength={1000}
        autoCompleteType={undefined}
        rightElement={<Text style={styles.affix}>{bio.length}/1000</Text>}
      />

      <HStack justifyContent="space-evenly" my="2">
        <Button
          onPress={() => openDateTimePicker("start")}
          variant="outline"
          colorScheme="success"
        >
          {startTime ? timeFormatter(startTime) : "Start Time"}
        </Button>

        <Button
          onPress={() => openDateTimePicker("end")}
          variant="outline"
          colorScheme="danger"
        >
          {endTime ? timeFormatter(endTime) : "End Time"}
        </Button>
      </HStack>

      <ErrorMessage
        error={
          error.image ?? error.location ?? error.employeeNo ?? error.startend
        }
      />

      <Button
        isLoading={isLoading}
        isLoadingText="Saving details"
        onPress={submit}
        padding="3"
      >
        Save Details
      </Button>
    </ScrollView>
  );
};
export default memo(GeneralDetails);
