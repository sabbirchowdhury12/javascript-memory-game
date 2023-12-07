const startBtn = document.getElementById("start");
const timeField = document.getElementById("time");
const control = document.querySelector(".controls-container");
const stopBtn = document.getElementById("stop");

let interval;
let movesCount = 0;
let seconds = 0;
let minitues = 0;

const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minitues += 1;
    seconds = 0;
  }

  const secondValues = seconds < 10 ? `0${seconds}` : seconds;
  const minitueValues = minitues < 10 ? `0${minitues}` : minitues;

  timeField.innerHTML = `<span> Time: </span> ${minitueValues}:${secondValues}`;
};

startBtn.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minitues = 0;
  console.log("hlw");
  console.log(control);
  control.classList.add("hide");
  stopBtn.classList.remove("hide");

  interval = setInterval(timeGenerator, 1000);
});
