function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let myTimerId = null;
stopBtn.style.background = 'grey';

const startFunc = () => {
  myTimerId = setInterval(changeBackground, 1000);
  startBtn.setAttribute('disabled', 'disabled');
  startBtn.style.background = 'grey';
  stopBtn.removeAttribute('disabled');
  stopBtn.style.removeProperty('background');  

};
const stopFunc = () => {
  clearInterval(myTimerId);
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', 'disabled');
    startBtn.style.removeProperty('background');
    stopBtn.style.background = 'grey';
};

function changeBackground() {
  document.body.style.background = getRandomHexColor();
}
startBtn.addEventListener('click', startFunc);
stopBtn.addEventListener('click', stopFunc);
