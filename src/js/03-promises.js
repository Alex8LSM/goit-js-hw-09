import Notiflix from 'notiflix';

Notiflix.Notify.init({
  timeout: 5000,
  useIcon: false,
  fontSize: '20px',
  width: '350px',
});

const form = document.querySelector('.form');
const submitData = {};
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const formInput = event.currentTarget.elements;
  submitData.delay = Number(formInput.delay.value);
  submitData.step = Number(formInput.step.value);
  submitData.amount = Number(formInput.amount.value);
  let totalDelay = submitData.delay;
  setTimeout(() => {
    for (let i = 1; i <= submitData.amount; i++) {
      createPromise(i, totalDelay);
      totalDelay += submitData.step;
    }
  }, submitData.delay);
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(value => {
      Notiflix.Notify.success(value);
    })
    .catch(error => {
      Notiflix.Notify.failure(error);
    });
}
