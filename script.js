let r = 176;
let g = 139;
let b = 255;
let wordRate = 0;
let directionC = 1;
let wordInterval = null;
let fourLetterWords = [];

const maxR = 250;
const maxG = 213;
const boxes = document.querySelectorAll(".box");
const body= document.body;
const set = document.getElementById("set");
const input = document.getElementById("input");
const start = document.getElementById("start");
const increase = document.getElementById("increase")
const close = document.getElementById("close");
const close1 = document.getElementById("close1");
const wordi = document.getElementById("word");
const wordDisplay = document.getElementById("words");
const warning = document.getElementById("warning");
const content = document.getElementById("content");
const dictionaryUrl = "https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json";
const box1 = document.getElementById("1");
const box2 = document.getElementById("2");
const box3 = document.getElementById("3");
const box4 = document.getElementById("4");
const box5 = document.getElementById("5");
const box6 = document.getElementById("6");
const box7 = document.getElementById("7");
const box8 = document.getElementById("8");
const box9 = document.getElementById("9");
const box10 = document.getElementById("10");
const box11 = document.getElementById("11");
const box12 = document.getElementById("12");
const box13 = document.getElementById("13");
const box14 = document.getElementById("14");
const box15 = document.getElementById("15");
const box16 = document.getElementById("16");

fetch(dictionaryUrl)
  .then(response => response.json())
  .then(dictObj => {

    fourLetterWords = Object.keys(dictObj).filter(word => word.length === 4);

    const randomWord = fourLetterWords[Math.floor(Math.random() * fourLetterWords.length)];
  })

setInterval(() => {
    r += directionC;
    g += directionC;

    if (r >= maxR) {
        directionC = -1;
    } else if (r <= 176) {
        directionC = 1;
    }

    body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}, 200);

boxes.forEach(box => {
    box.addEventListener("click", () => {
    boxes.forEach(b => b.style.borderColor = "black");
    boxes.forEach(b => b.classList.remove("selected"));
    box.style.borderColor = "rgba(3, 166, 22, 0.87)";
    box.classList.add("selected");
    });
});

set.addEventListener("click", () => {
    const selecetedBox = document.querySelector(".box.selected");
    if (input.value.replace(/\s/g, "").length !== 4) {
        warningGenerator("Please enter a 4-letter word.");
        return;
    } else if (redundantCheck(input.value)) {
        warningGenerator("Word already used. Enter another.");
        return;
    } else if (!fourLetterWords.includes(input.value.toLowerCase())) {
        warningGenerator("Word not in dictionary.");
        return;
    };

    selecetedBox.innerHTML = input.value;
    selecetedBox.classList.add("filled");
});

start.addEventListener("click", () => {
    if (document.querySelectorAll(".box.filled").length < 16) {
        warningGenerator("Please fill all the boxes before starting the game.");
        return;
    }

    if (wordInterval) return;

    let wordlist = assignList();

    wordi.style.display = "flex";
    wordInterval = setInterval(() => {
        const word = wordGenerator(wordlist);
        
        for (let key in wordlist) {
            if (wordlist[key] === word) {
        delete wordlist[key];
        }
    }

        wordDisplay.innerText = word.split("").join(" ");

        boxes.forEach(box => {
            if (box.innerText === word) {
                box.style.backgroundColor = "limegreen";
                box.classList.add("correct");
            }
        })

        if (bingoCheck()) {
            clearInterval(wordInterval);
            wordInterval = null;
            setTimeout(() => {
                alert("Bingo! You've completed the game.");
        }, 0);
        }
    }, 2000);
});

increase.addEventListener("click", () => {
    wordRate++
})

function wordGenerator(list){
    let num = Math.floor(Math.random() * fourLetterWords.length)
    let word = fourLetterWords[num];
    fourLetterWords.splice(num, 1);

    if (getRandomBit() == 1) {
        word = list["box" + Math.floor(Math.random() * 16 + 1)]
    }

    return word;
}

function warningGenerator(message){
    warning.style.display = "flex";
    content.innerHTML = message;
}

function redundantCheck(word){
    const filledWords = Array.from(document.querySelectorAll(".box.filled")).map(box => box.innerText.toLowerCase());
    return filledWords.includes(word.toLowerCase());
}

close.addEventListener("click", () => {
    wordi.style.display = "none";
    clearInterval(wordInterval);
    wordInterval = null;
});

close1.addEventListener("click", () => {
    warning.style.display = "none";
});

function bingoCheck(){
    if (box1.classList.contains("correct") && box2.classList.contains("correct") && box3.classList.contains("correct") && box4.classList.contains("correct") ||
        box5.classList.contains("correct") && box6.classList.contains("correct") && box7.classList.contains("correct") && box8.classList.contains("correct") ||
        box9.classList.contains("correct") && box10.classList.contains("correct") && box11.classList.contains("correct") && box12.classList.contains("correct") ||
        box13.classList.contains("correct") && box14.classList.contains("correct") && box15.classList.contains("correct") && box16.classList.contains("correct") ||
        box1.classList.contains("correct") && box5.classList.contains("correct") && box9.classList.contains("correct") && box13.classList.contains("correct") ||
        box2.classList.contains("correct") && box6.classList.contains("correct") && box10.classList.contains("correct") && box14.classList.contains("correct") ||
        box3.classList.contains("correct") && box7.classList.contains("correct") && box11.classList.contains("correct") && box15.classList.contains("correct") ||
        box4.classList.contains("correct") && box8.classList.contains("correct") && box12.classList.contains("correct") && box16.classList.contains("correct") ||
        box1.classList.contains("correct") && box6.classList.contains("correct") && box11.classList.contains("correct") && box16.classList.contains("correct") ||
        box4.classList.contains("correct") && box7.classList.contains("correct") && box10.classList.contains("correct") && box13.classList.contains("correct")) {
            return true;
    } else {
        return false;
    }
}

function assignList() {
    let boxes = {};
    for (let i = 1; i <= 16; i++) {
        boxes["box" + i] = document.getElementById(i).innerHTML;
    }
    return boxes;
}

function getRandomBit() {
    let probability = Math.min(wordRate * 0.1, 1);
    return Math.random() < probability ? 1 : 0;
}