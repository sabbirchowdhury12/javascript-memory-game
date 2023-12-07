const startBtn = document.getElementById("start");
const timeField = document.getElementById("time");
const moves = document.getElementById("moves-count");
const control = document.querySelector(".controls-container");
const gameContainer = document.querySelector(".game-container");
const stopBtn = document.getElementById("stop");

let interval;
let movesCount = 0;
let seconds = 0;
let minitues = 0;

const items = [
  { name: "bee", image: "bee.png" },
  { name: "crocodile", image: "crocodile.png" },
  { name: "macaw", image: "macaw.png" },
  { name: "gorilla", image: "gorilla.png" },
  { name: "tiger", image: "tiger.png" },
  { name: "monkey", image: "monkey.png" },
  { name: "chameleon", image: "chameleon.png" },
  { name: "piranha", image: "piranha.png" },
  { name: "anaconda", image: "anaconda.png" },
  { name: "sloth", image: "sloth.png" },
  { name: "cockatoo", image: "cockatoo.png" },
  { name: "toucan", image: "toucan.png" },
];

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

const generateRandom = (size = 4) => {
  let cardValues = [];

  let tempArray = [...items];

  size = (size * size) / 2;

  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }

  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  cardValues = [...cardValues, ...cardValues];
  console.log(cardValues);
  cardValues.sort(() => Math.random() - 0.5);

  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="images/${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }

  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
};

startBtn.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minitues = 0;
  control.classList.add("hide");
  stopBtn.classList.remove("hide");
  interval = setInterval(timeGenerator, 1000);
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;

  initializer();
});

const initializer = () => {
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
