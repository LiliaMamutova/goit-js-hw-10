import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElement = document.querySelector('.form');

formElement.addEventListener("submit", handleSubmit);


function handleSubmit(event) {
  event.preventDefault();

  const delay = Number(event.target.delay.value);
  const state = event.target.state.value;

  if (delay === 0) {
    return;
  }

  const promise = new Promise((resolve, reject) => {

    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then((delay) => {
      showSuccessMessage(delay);
    })
    .catch((delay) => {
      showErrorMessage(delay);
    })
    .finally(() => {
      event.target.reset();
    })
}

function showSuccessMessage(delay) {
  return iziToast.show({
    message: `✅ Fulfilled promise in ${delay}ms`,
    position: "topRight"
  });
}

function showErrorMessage(delay) {
  return iziToast.show({
    message: `❌ Rejected promise in ${delay}ms`,
    position: "topRight"
  });
}