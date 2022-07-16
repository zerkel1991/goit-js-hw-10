import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const dataPickerEl = document.querySelector("#datetime-picker");
const buttonStart = document.querySelector("[data-start]");
const fieldDays = document.querySelector("[data-days]");
const fieldHours = document.querySelector("[data-hours]");
const fieldMinutes = document.querySelector("[data-minutes]");
const fieldSeconds = document.querySelector("[data-seconds]");
const currentDate = Date.now();       //Текущая дата
buttonStart.disabled = true;     // выключил кнопку старт по дефолту
let timeResult;
let time;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
     
      if(selectedDates[0].getTime() <= currentDate){
        Notiflix.Notify.failure("Please choose a date in the future");
        
      }else{
        buttonStart.disabled = false;
        timeResult = selectedDates[0].getTime() - currentDate;
        time = selectedDates[0];
         }
      },
  };
flatpickr(dataPickerEl,options);// Инициализация календаря из либы
buttonStart.addEventListener("click",addValueToFields)


function addLeadingZero(value){
    return String(value).padStart(2,'0');
}


 function  convertMs(timeResult) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(timeResult / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((timeResult % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((timeResult % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((timeResult % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
  }


 function addTextContent (){
 const {days,hours,minutes,seconds} = convertMs(time - new Date());
    fieldDays.textContent = days;
    fieldHours.textContent = hours;
    fieldMinutes.textContent = minutes;
    fieldSeconds.textContent = seconds;
 }



 function addValueToFields(){
    const intevalId = setInterval(() => {
       
      if(timeResult <= 0){
         return clearInterval(intevalId)
      }
       addTextContent(timeResult); 
       timeResult -= 1;
       
       },1000);
 }
 

