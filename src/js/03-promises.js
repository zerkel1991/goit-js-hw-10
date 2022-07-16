
import Notiflix from 'notiflix';

const form = document.querySelector(".form");
const firstDelay = document.querySelector('[name = "delay"]')
const stepDelay = document.querySelector('[name = "step"]')
const amount = document.querySelector('[name = "amount"]')
const submitBtn = document.querySelector("button")
let fullDelay = Number(firstDelay.value);
form.addEventListener("submit",((event)=>{
  event.preventDefault()
 
  for (let i = 1; i <= amount.value;i++){
    createPromise(i,fullDelay)
    .then(({position,delay})=>{
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
    .catch(({position,delay})=>{
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      })
    })
    fullDelay = fullDelay + Number(stepDelay.value)
}
// form.reset() 
}));




function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve,reject)=>{
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve ({position,delay})
      } else {
        reject({position,delay})
      }
    }, delay);
})
}







  