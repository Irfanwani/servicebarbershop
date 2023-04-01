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
    if (hr < 10) {
      hours = `0${hr}`;
    } else {
      hours = hr.toString();
    }
    AmPm = "PM";
  } else {
    hours = +hours < 10 ? `0${hours}` : hours;
    AmPm = "AM";
  }

  let result = `${hours}:${minutes} ${AmPm}`;
  return result;
};
