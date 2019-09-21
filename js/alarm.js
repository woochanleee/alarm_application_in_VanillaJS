const SHOWING_CN = "showing";
const btn = document.querySelectorAll("button"),
input = document.querySelectorAll("input"),
startBtn = document.querySelector('#js-start'),
resetBtn = document.querySelector('#js-reset'),
stopBtn = document.querySelector('#js-stop'),
minute = document.querySelector('#js-minute'),
second = document.querySelector('#js-second');

let interverName;
// let alarmAudio = new Audio("../audio/삐삐삐삐-삐삐삐삐 - 탁상시계알람.mp3");
let alarmAudio = new Audio();
alarmAudio.src = "../audio/삐삐삐삐-삐삐삐삐 - 탁상시계알람.mp3";

function timeMinus() {
    try {
        
        input.forEach((e) => {
            if (e.value === "" || e.value.indexOf("-") !== -1)
                throw "Error!!!";
        });
        if (parseInt(minute.value) > 0 && parseInt(second.value) == 0){
            second.value = 59;
            minute.value -= 1;
        } else if (parseInt(second.value) > 0){
            second.value -= 1;
        }
        if (second.value >= 60) { 
            minute.value = parseInt(minute.value) + parseInt(second.value / 60);
            second.value -= parseInt(second.value / 60) * 60;
        }
        if (second.value == 0 && minute.value == 0) {
            clearInterval(interverName);
            var modal = document.getElementById('myModal');
            var btn = document.getElementById("myBtn");
            modal.style.display = "block";
            alarmAudio.play();
            btn.addEventListener("click", () => {
                alarmAudio.pause();
                modal.style.display = "none";
            });
            startBtn.classList.add(SHOWING_CN);
            resetBtn.classList.remove(SHOWING_CN);
            stopBtn.classList.remove(SHOWING_CN);
        }
    } catch(err) {
        console.log(err);
    }
}

function timeReset() {
    minute.value = 0;
    second.value = 0;
    clearInterval(interverName);
}

function alarmStarting(e) {
    switch (e.target.innerText) {
        case "시작":
            if ((minute.value === "0" && second.value === "0") || (minute.value === "" || minute.value.indexOf("-") !== -1) || (second.value === "" || second.value.indexOf("-") !== -1)) return;
            else {
                interverName = setInterval(timeMinus, 1000);
                startBtn.classList.remove(SHOWING_CN);
                resetBtn.classList.add(SHOWING_CN);
                stopBtn.classList.add(SHOWING_CN);
            }
            break;
        case "재설정":
            timeReset();
            startBtn.classList.add(SHOWING_CN);
            resetBtn.classList.remove(SHOWING_CN);
            stopBtn.classList.remove(SHOWING_CN);
            break;
        case "중지":
            clearInterval(interverName)
            startBtn.classList.add(SHOWING_CN);
            resetBtn.classList.add(SHOWING_CN);
            stopBtn.classList.remove(SHOWING_CN);
            break;
    }
}

function init() {
    minute.value = 0;
    second.value = 0;
    btn.forEach((e) => e.addEventListener("click", alarmStarting));
}

init();