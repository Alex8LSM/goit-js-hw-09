function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const starnBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let myTimerId = null;
stopBtn.style.background = 'grey';

const startFunc = () => {
  myTimerId = setInterval(changeBackground, 1000);
  starnBtn.setAttribute('disabled', 'disabled');
  starnBtn.style.background = 'grey';
  stopBtn.removeAttribute('disabled');
  stopBtn.style.removeProperty('background');  

};
const stopFunc = () => {
  clearInterval(myTimerId);
    starnBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', 'disabled');
    starnBtn.style.removeProperty('background');
    stopBtn.style.background = 'grey';
};

function changeBackground() {
  document.body.style.background = getRandomHexColor();
}
starnBtn.addEventListener('click', startFunc);
stopBtn.addEventListener('click', stopFunc);
