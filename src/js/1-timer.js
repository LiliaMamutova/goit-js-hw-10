import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';


const dataTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');

const daysElement = document.querySelector('span[data-days]');
const hoursElement = document.querySelector('span[data-hours]');
const minutesElement = document.querySelector('span[data-minutes]');
const secondsElement = document.querySelector('span[data-seconds]');

startButton.addEventListener('click', handleStart);

let userSelectedDate = null;
let intervalId = null;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();
    userSelectedDate = selectedDates[0].getTime();

    if (userSelectedDate <= currentTime) {
      showMessage();
      startButton.disabled = true;
      return;
    }

    startButton.disabled = false;
  },
};

flatpickr(dataTimePicker, options);


function handleStart() {
  startButton.disabled = true;
  dataTimePicker.disabled = true;

  updateTime();

  intervalId = setInterval(updateTime, 1000);
}


function updateTime() {
  const currentTime = Date.now();
  const timeRemaining = userSelectedDate - currentTime;

  if (timeRemaining <= 0) {
    clearInterval(intervalId);

    onTick(convertMs(0));
    dataTimePicker.disabled = false;
    return;
  }

  const timeComponents = convertMs(timeRemaining);
  onTick(timeComponents);
}

function onTick({ days, hours, minutes, seconds }) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function showMessage() {
  return iziToast.show({
    message: "Please choose a date in the future",
    color: "yellow",
    position: "center",
  });
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}






