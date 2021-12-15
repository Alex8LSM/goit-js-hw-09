import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top',
});

const convertedDateInput = document.getElementById('datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const html = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
let selectedDate = null;
let formattedDate = null;
let timerId = null;
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function dateConverter(date) {
  for (const key in date) {
    date[key] = addLeadingZero(date[key]);
  }
  return date;
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log(selectedDate);
    if (selectedDate <= options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      console.log(options.defaultDate);
    } else {
      btnStart.removeAttribute('disabled');
    }
  },
};
function stopTimer() {
  clearInterval(timerId);
  Notiflix.Notify.success('Wake Up!');
}
function updateTimer() {
  const currentDate = new Date();
  const interval = selectedDate.getTime() - currentDate.getTime();
  if (interval < 0) {
    stopTimer();
    return;
  }
  const convertedDate = convertMs(interval);
  formattedDate = dateConverter(convertedDate);
  html.days.innerText = formattedDate.days;
  html.hours.innerText = formattedDate.hours;
  html.minutes.innerText = formattedDate.minutes;
  html.seconds.innerText = formattedDate.seconds;
}

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', () => {
  btnStart.setAttribute('disabled', 'disabled');
  timerId = setInterval(updateTimer, 1000);
});
