const startBtn = document.getElementById("start");
const timeField = document.getElementById("time");
const moves = document.getElementById("moves-count");
const control = document.querySelector(".controls-container");
const gameContainer = document.querySelector(".game-container");
const stopBtn = document.getElementById("stop");
const result = document.getElementById("result");

let interval;
let movesCount = 0;
let seconds = 0;
let minitues = 0;
let firstCard = 0;
let secondCard = 0;
let winCount = 0;
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

const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
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

  let firstCardValue;
  let secondCardValue;
  const cards = document.querySelectorAll(".card-container");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          secondCardValue = card.getAttribute("data-card-value");

          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;

            winCount += 1;

            if (winCount == Math.floor(cardValues.length) / 2) {
              result.innerHTML = `<h2>You Won</h2>
              <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 500);
          }
        }
      }
    });
  });
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

stopBtn.addEventListener(
  "click",
  (stopGame = () => {
    control.classList.remove("hide");
    stopBtn.classList.add("hide");
    startBtn.classList.remove("hide");
    clearInterval(interval);
  })
);

const initializer = () => {
  let cardValues = generateRandom();

  matrixGenerator(cardValues);
};
