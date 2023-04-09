let alphapet = "abcdefghijklmnopqrstuvwxyz";
let generateLatters = Array.from(alphapet);
let lattersContainer = document.querySelector(".generate-latters");
generateLatters.forEach(function (e) {
  let letterSpan = document.createElement("span");
  letterSpan.textContent = e.toUpperCase();
  letterSpan.classList.add("letter-span");
  lattersContainer.appendChild(letterSpan);
});

let randowWords = {
  "Programming-Language": ["Javascript", "Python"],
  "Pouplar-People": [
    "Mohamed Salah",
    "Lionel Messi",
    "Amany Refaat",
    "Cleopatra",
    "Albert Einstein",
    "Cristiano",
  ],
  "Pouplar-Movies": [
    "Interstellar",
    "Shutter Island",
    "Now You See Me",
    "Inception",
    "Titanic",
    "The Maze Runner",
  ],
  countries: [
    "Syria",
    "Palestine",
    "Yemen",
    "Egypt",
    "Bahrain",
    "Qatar",
    "England",
    "France",
  ],
};
let randoobjsKeys = Object.keys(randowWords);
let randomobjIndex = Math.floor(randoobjsKeys.length * Math.random());
document.querySelector("header span").textContent =
  randoobjsKeys[randomobjIndex];
let theWordsValue = randowWords[randoobjsKeys[randomobjIndex]];
let randomwordIndex = Math.floor(theWordsValue.length * Math.random());
let theGussedWord = theWordsValue[randomwordIndex];
let theGussedWordArr = Array.from(theGussedWord);
let x = theGussedWordArr.join("").split("");
//generate spans
let downSpans = document.querySelector(".generate-spans");
console.log(downSpans.textContent);
theGussedWordArr.forEach((e) => {
  let downSpan = document.createElement("span");
  downSpan.classList.add("down-span");
  if (e === " ") {
    // Add Class To The Span
    downSpan.className = "with-space";
  }
  downSpans.appendChild(downSpan);
});
//spans clicked
let arr = [];
arr.push(theGussedWordArr[0]);
let wrongAnswers = 0;
let guessSpans = document.querySelectorAll(".generate-spans span");

guessSpans[0].innerHTML = theGussedWordArr[0];
document.addEventListener("click", (e) => {
  let status = false;
  if (e.target.className === "letter-span") {
    e.target.classList.add("clicked");
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    let theChosenWord = Array.from(theGussedWord);
    theChosenWord.forEach((wordLetter, WordIndex) => {
      if (theClickedLetter == wordLetter.toLowerCase()) {
        status = true;
        guessSpans.forEach((span, spanIndex) => {
          if (WordIndex === spanIndex) {
            span.innerHTML = wordLetter;
            arr.push(wordLetter);
          }
        });
      }
    });
    if (status === false) {
      ++wrongAnswers;
      let draw = document.querySelector(".hangman-draw ");
      draw.classList.add(`wrong-${wrongAnswers}`);
    }
    if (wrongAnswers === 8) {
      failed();
    }
    let space = 0;
    if (x.includes(" ")) {
      space++;
    }
    let arrSet = [...new Set(arr)];
    let xSet = [...new Set(x)];
    if (arrSet.length + space >= xSet.length) {
      console.log(2);
      success();
    }
  }
});
function failed() {
  let failedPopUp = document.createElement("div");
  failedPopUp.className = "failed-pop";
  failedPopUp.textContent = `You Failed The Answer is ${theGussedWord}`;
  document.body.appendChild(failedPopUp);
  document.querySelector("#fail").play();
  document.querySelectorAll(".letter-span").forEach((e) => {
    e.classList.add("finished");
  });
}
function success() {
  let successPopUp = document.createElement("div");
  successPopUp.className = "success-pop";
  let score;
  if (wrongAnswers <= 2) {
    score = "+A";
  } else if (wrongAnswers <= 4) {
    score = "+B";
  } else if (wrongAnswers <= 6) {
    score = "+c";
  } else score = "+D";
  successPopUp.textContent = `Congratulations You Won
  Your Score Is ${score}
  `;
  document.body.appendChild(successPopUp);
  document.querySelector("#success").play();
}
