export const timeFormatter = (time: string) => {
  let [hours, minutes] = time.split(":");

  let AmPm = "AM";

  if (+hours == 12) {
    hours = "12";
    AmPm = "PM";
  } else if (+hours == 0) {
    hours = "12";
    AmPm = "AM";
  } else if (+hours > 12) {
    let hr = +hours - 12;
    hours = hr.toString();
    AmPm = "PM";
  } else {
    AmPm = "AM";
  }

  let result = `${+hours < 10 ? `0${+hours}` : hours}:${
    +minutes < 10 ? `0${+minutes}` : minutes
  } ${AmPm}`;
  return result;
};
