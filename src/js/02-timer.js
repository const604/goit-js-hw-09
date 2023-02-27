import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startDate = Date.now();
    if (selectedDates[0] < startDate) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.btnStart.disabled = false;
  },
});

refs.btnStart.addEventListener('click', () => {
  let intervalId = null;
  intervalId = setInterval(() => {
    const currentDate = Date.now();
    const selectedDate = new Date(refs.input.value);
    const ms = selectedDate - currentDate;
    refs.btnStart.disabled = true;
    if (ms <= 0) {
      clearInterval(intervalId);
      return;
    }
    updateTimer(ms);
  }, 1000);
});

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
