const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

let intervalId = null;
let isActive = false;

refs.btnStart.addEventListener('click', () => {
  if (isActive) {
    return;
  }
  intervalId = setInterval(() => {
    function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
    isActive = true;
});

refs.btnStop.addEventListener('click', () => {
  clearInterval(intervalId);
  isActive = false;
});
