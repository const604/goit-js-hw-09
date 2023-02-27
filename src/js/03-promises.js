import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const {
    elements: { amount, delay, step },
  } = e.currentTarget;

  let amountValue = Number(amount.value);
  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  console.log(amountValue, delayValue, stepValue);

  for (let position = 1; position <= amountValue; position += 1) {
    delayValue += stepValue;
    console.log(delayValue);

    createPromise(position, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  form.reset();
});
