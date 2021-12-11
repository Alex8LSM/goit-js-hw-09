import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const myDateInput = document.getElementById('datetime-picker');

flatpickr('#datetime-picker', {});
console.log(myDateInput);