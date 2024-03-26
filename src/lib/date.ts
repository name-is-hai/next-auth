export const currentDate = () => {
  var currentDate = new Date();

  // Define an array for weekdays
  var weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Define an array for months
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract components from the current date
  var dayOfWeek = weekdays[currentDate.getDay()];
  var month = months[currentDate.getMonth()];
  var dayOfMonth = currentDate.getDate();
  var year = currentDate.getFullYear();

  // Format hour and minutes
  var hour = currentDate.getHours();
  var minutes = currentDate.getMinutes();

  // Convert hour to 12-hour format and determine AM/PM
  var ampm = hour >= 12 ? " PM" : " AM";
  hour = hour % 12;
  hour = hour ? hour : 12; // 0 should be treated as 12

  // Construct the desired output string
  return (
    dayOfWeek +
    ", " +
    month +
    " " +
    dayOfMonth +
    "th at " +
    hour +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    ampm
  );
};
