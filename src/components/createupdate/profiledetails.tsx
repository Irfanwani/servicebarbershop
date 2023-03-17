import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  Button,
  HStack,
  Input,
  ScrollView,
  Text,
  TextArea,
  useDisclose,
} from "native-base";
import { FC, memo, useRef, useState } from "react";
import { LatLng } from "react-native-maps";
import { details as detailsvg } from "../../assets/details";
import { generalDetailsValidator } from "../../utils/credsvalidator";
import { errorHandler } from "../../utils/errorhandler";
import { getFormData } from "../../utils/formdata";
import { getCameraImageAsync, getImageAsync } from "../../utils/getassets";
import {
  geoCode,
  getCurrentLocation,
  reverseGeocode,
} from "../../utils/location";
import { timeFormatter } from "../../utils/timeFormatter";
import { MapSheet } from "../actionsheets/mapsheet";
import { Sheet } from "../actionsheets/selectionsheet";
import { ActionAvatar } from "../avatars/actionavatar";
import { showToast } from "../generalcomponents/alerts";
import ErrorMessage from "../generalcomponents/error";
import { CustomSvg } from "../svgs/svg";
import styles from "../../screens/detailscreens/styles";
import authstyles from "../../screens/authscreens/styles";
import { DetailsScreenProps } from "./types";
import { CustomSelect } from "../actionsheets/dropdownsheet";
import { servicetypes } from "../../screens/detailscreens/constants";
import { useAddgeneraldetailsMutation } from "../../store/apislices/detailsapislice";

const ProfileDetails: FC<DetailsScreenProps> = ({
  updating,
  heading,
  details,
}) => {
  const { isOpen, onClose, onOpen } = useDisclose();

  const [detailsMutation, { isLoading }] = useAddgeneraldetailsMutation();

  const {
    image: uri,
    location: loc,
    about,
    contact: ct,
    employee_count,
    start_time,
    end_time,
    coords: coordinates,
    service_type,
  } = details;

  const [image, setImage] = useState(uri);
  const [location, setLocation] = useState(loc);
  const [bio, setBio] = useState(about);
  const [contact, setContact] = useState(ct);
  const [employeeNo, setEmployeeNo] = useState(employee_count.toString());
  const [startTime, setStartTime] = useState(start_time);
  const [endTime, setEndTime] = useState(end_time);

  const [coords, setCoords] = useState(coordinates);

  const [servicetype, setServiceType] = useState(service_type);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    image: null,
    location: null,
    employeeNo: null,
    startend: null,
    servicetype: null,
  });

  const locationRef = useRef(null);

  const [isLocationSheet, setIsLocationSheet] = useState(false);
  const [isMapSheet, setIsMapSheet] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const getCameraImage = async () => {
    setLoading(true);
    const capturedImg = await getCameraImageAsync();
    setLoading(false);
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
    setImage(uri);
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
    setLoading(true);
    const currentLocation = await getCurrentLocation();
    setCoords(currentLocation);
    const address = await reverseGeocode(currentLocation);
    setLocation(address);
    onClose();
    locationRef.current?.blur();
    setLoading(false);
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
        if (event.type == "dismissed") return;
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
        servicetype,
        setError,
      })
    )
      return;

    let img = image == uri ? null : image;
    let crds = { lat: coords.latitude, lng: coords.longitude };
    let data = {
      location,
      about: bio,
      contact,
      employee_count: employeeNo,
      start_time: startTime,
      end_time: endTime,
      service_type: servicetype,
    };
    let finaldata: any = {};

    Object.keys(data).forEach((key) => {
      if (data[key] != details[key]) finaldata[key] = data[key];
    });
    if (crds.lat != coordinates.latitude) finaldata.lat = crds.lat;
    if (crds.lng != coordinates.longitude) finaldata.lng = crds.lng;

    let body = getFormData(img, finaldata);

    if (body["_parts"].length == 0) {
      showToast("info", "No details updated!");
      return;
    }
    try {
      await detailsMutation({
        body,
        method: updating ? "PUT" : "POST",
      }).unwrap();
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
        <CustomSvg xml={detailsvg} />
      </HStack>
      <Text style={authstyles.label}>{heading}</Text>

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
          loading={loading}
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
          loading={loading}
        />
      )}

      <CustomSelect
        placeholder="Select Service Type"
        items={servicetypes}
        value={servicetype}
        onValueChange={setServiceType}
      />

      <Input
        value={contact}
        onChangeText={setContact}
        placeholder="Contact (Another Email or Phone)"
        keyboardType="email-address"
        mt="2"
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
          error.image ??
          error.location ??
          error.servicetype ??
          error.employeeNo ??
          error.startend
        }
      />

      <Button
        isLoading={isLoading}
        isLoadingText={updating ? "Updating details" : "Saving details"}
        onPress={submit}
        padding="3"
      >
        {updating ? "Update Details" : "Save Details"}
      </Button>
    </ScrollView>
  );
};
export default memo(ProfileDetails);
