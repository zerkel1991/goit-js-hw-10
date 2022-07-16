
const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop");
const timerId = null;
stopBtn.disabled=true;

startBtn.addEventListener("click",startBtnAction);
stopBtn.addEventListener("click",stopBtnAction);


timerId = setInterval(() => {
    if(startBtn.disabled){
        document.body.style.background = getRandomHexColor();
    }
}, 1000);


function startBtnAction(){
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function stopBtnAction(){
    startBtn.disabled=false;
    stopBtn.disabled=true;
    clearInterval(timerId)
}
function getRandomHexColor()  {

return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

