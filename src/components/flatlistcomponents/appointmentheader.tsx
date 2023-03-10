import {
  HStack,
  Input,
  Icon,
  Spinner,
  Heading,
  IconButton,
  Modal,
  Button,
  Checkbox,
} from "native-base";
import { FC, useState } from "react";
import { AppHeaderProps } from "./types";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export const ListHeader: FC<AppHeaderProps> = ({ setSearch, loading }) => {
  const theme = useTheme();

  const [value, setValue] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [paid, setPaid] = useState(false);

  const [today, setToday] = useState(false);

  const [date, setDate] = useState("");

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const clearFilters = () => {
    setDate("");
    setPaid(false);
    setToday(false);
    setSearch(value, "");
    closeModal();
  };

  const showDate = () => {
    DateTimePickerAndroid.open({
      neutralButtonLabel: "clear",
      mode: "date",
      value: date ? new Date(date) : new Date(),
      onChange: (event, date) => {
        if (event.type == "dismissed") return;

        if (event.type == "neutralButtonPressed") {
          setDate("");
          return;
        }
        let dt = date.toISOString();
        setDate(dt.slice(0, dt.indexOf("T")));
      },
    });
  };

  const applyfiters = () => {
    let pd = paid ? paid : "";
    const currentdate = new Date().toISOString();
    let td = today ? currentdate.slice(0, currentdate.indexOf("T")) : "";
    setSearch(value, `${pd} ${td} ${date}`);
    closeModal();
  };

  return (
    <HStack
      pb="10"
      pt="5"
      px="2"
      bg={theme.colors.card}
      justifyContent="space-between"
      borderBottomLeftRadius="30"
    >
      <Input
        value={value}
        onChangeText={setValue}
        onEndEditing={applyfiters}
        placeholder="Search appointment..."
        placeholderTextColor={theme.colors.text}
        flex="0.9"
        variant="rounded"
        leftElement={<Icon as={MaterialIcons} name="search" size={25} m="2" />}
        rightElement={loading ? <Spinner mr="2" /> : null}
      />
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            <Heading>Filters</Heading>
          </Modal.Header>

          <Modal.Body>
            <Checkbox isChecked={paid} value="paid" onChange={setPaid}>
              Paid
            </Checkbox>
            <Checkbox
              isChecked={today}
              my="3"
              value="today"
              onChange={setToday}
            >
              Today
            </Checkbox>

            <Button onPress={showDate} variant="outline">
              {date ? date : "Filter by Date"}
            </Button>
          </Modal.Body>

          <Modal.Footer>
            <Button.Group space={2}>
              <Button colorScheme="coolGray" onPress={clearFilters}>
                Clear filters
              </Button>
              <Button
                variant="outline"
                colorScheme="coolGray"
                onPress={closeModal}
              >
                Cancel
              </Button>
              <Button onPress={applyfiters}>Apply</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <IconButton
        onPress={openModal}
        size="10"
        title="Filters"
        icon={<Icon as={MaterialIcons} name="filter-list" m="2" />}
        variant="solid"
        rounded="full"
      />
    </HStack>
  );
};
