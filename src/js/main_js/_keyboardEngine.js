let keyboardRunningText = document.querySelector(".keyboardSection__showingText");
let keyboardInputText = document.querySelector(".keyboardSection__writeText__input");

let excludeWords = ["shift", "tab", "capslock", "backspace", "space", "alt", "win", "fn", "ps", "enter", "ctrl"];

let showingText_text = document.querySelector(".showingText__text");
let showingText_textArray = showingText_text.innerText.split(" ");
let showingText_active = document.querySelector(".showingText__activeWord");
let showingText_written = document.querySelector(".showingText__written");

let inputText__dontTouch = document.querySelector(".keyboardSection__writeText__dontTouch");

let keyboardLesson = new Lesson(currentLesson, currentPartLesson);
keyboardLesson.showLesson();


Object.keys(keyboardBacklightConfig.default).forEach((finger) => {
    if (finger == 'default') return;
    let item; let color;
    if (finger[0] == 'L') item = document.querySelector(`.keyboardSection__keyboard__leftHand__${finger}`);
    else item = document.querySelector(`.keyboardSection__keyboard__rightHand__${finger}`);
    const theme = localStorage.getItem("theme");
    if (theme == null) color = item.style.backgroundColor = keyboardBacklightConfig.default[finger];
    else color = item.style.backgroundColor = keyboardBacklightConfig[theme][finger];
    item.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}`;
});

function hightlightHandFinger(ch) {
    document.querySelectorAll(".keyboardSection__keyboard__leftHand__finger").forEach((finger) => {finger.style.opacity = null;});
    document.querySelectorAll(".keyboardSection__keyboard__rightHand__finger").forEach((finger) => {finger.style.opacity = null;});

    if (!mainSettings.keyboardBacklight) return;
    if (ch == ' ') {
        document.querySelector(`.keyboardSection__keyboard__leftHand__Lthumb`).style.opacity = 1;
        document.querySelector(`.keyboardSection__keyboard__rightHand__Rthumb`).style.opacity = 1;
        return;
    }
    
    // let nextCharacter = document.querySelector(".showingText__activeWord .theRestWord").innerText[0];
    let isUpperCase = ch.toUpperCase() === ch;
    document.querySelectorAll(".keyboardSection__keyboard__keyboard div").forEach(function(el) {
        if (el.childNodes.length != 1) return;

        if (el.innerText.toLowerCase().indexOf(ch.toLowerCase()) != -1 && !excludeWords.includes(el.innerText.toLowerCase())) {
            if (el.innerText.length > 1) {
                if (el.innerText.indexOf(ch) == 0) isUpperCase = false;
                else isUpperCase = true;
            }
            let zone = keycodesZones[el.id];
            let theme = mainSettings.theme;
            if(zone[0].toLowerCase() == "l") {
                if (isUpperCase) document.querySelector(".keyboardSection__keyboard__rightHand__Rpinkie").style.opacity = 1;
                document.querySelector(`.keyboardSection__keyboard__leftHand__${zone}`).style.opacity = 1;
            } else {
                if (isUpperCase) document.querySelector(".keyboardSection__keyboard__leftHand__Lpinkie").style.opacity = 1;
                document.querySelector(`.keyboardSection__keyboard__rightHand__${zone}`).style.opacity = 1;
            }
            return;
        }
    });
}

function getNextActiveWord() {
    showingText_active.innerHTML = showingText_textArray[0] + " ";
    showingText_textArray.shift();
    showingText_text.innerHTML = showingText_textArray.join(" ");
    hightlightHandFinger(showingText_active.innerText[0]);
    if (showingText_written.innerText != '') keyboardInputText.placeholder = '';
}
getNextActiveWord();


let width = parseInt(getComputedStyle(keyboardRunningText).getPropertyValue('width'));
console.log(width / 2 / 18);
// console.log(width);

function getSpanWrapText(correctWord, inputWord) {
    console.log("comparing '" + correctWord + "' with '" + inputWord + "'");
    let spanCorrection = "";
    let spanWrongCh = '<span class="wrongCh">';
    let spanRightCh = '<span class="rightCh">';
    let spanArray = [];
    let spanCorrectionArray = [];
    let isRight = false;
    let size = correctWord.length < inputWord.length ? correctWord.length : inputWord.length;

    for (let i = 0; i < size; ++i) {
        if (correctWord[i] == inputWord[i]) {
            if (isRight) {
                spanArray[spanArray.length - 1] += correctWord[i];
            } else {
                spanArray.push(correctWord[i]);
                spanCorrectionArray.push(true);
            }
            isRight = true;
        } else {
            if (i == 0) isRight = true;
            if (isRight) {
                spanArray.push(correctWord[i]);
                spanCorrectionArray.push(false);
            } else {
                spanArray[spanArray.length - 1] += correctWord[i];
            }
            isRight = false;
        }
    }
    if (size < correctWord.length) {
        if (isRight) {
            spanArray.push(correctWord.substr(size, correctWord.length - size));
            spanCorrectionArray.push(false);
        } else {
            spanArray[spanArray.length - 1] += correctWord.substr(size, correctWord.length - size);
        }
    }
    spanArray.forEach((value, index) => {
        if (spanCorrectionArray[index]) spanCorrection += spanRightCh + value + "</span>";
        else spanCorrection += spanWrongCh + value + "</span>"; 
    });
    return spanCorrection;
}

keyboardInputText.addEventListener("input", function() {
    let currentInputWord = keyboardInputText.value.toString();
    let currentWord = showingText_active.innerText;

    if (currentInputWord[currentInputWord.length - 1] == ' ') {
        hightlightHandFinger(' ');
        let spanCorrectionText = getSpanWrapText(currentWord.substr(0, currentWord.length - 1), currentInputWord.substr(0, currentInputWord.length - 1)) + ' ';
        showingText_written.innerHTML += spanCorrectionText;
        getNextActiveWord();
        keyboardInputText.value = '';
    }
    if (currentInputWord.length < currentWord.length) {
        hightlightHandFinger(currentWord[currentInputWord.length]);
    }

    // if (inputText.length == 0 || currentInputWord.length > currentWord.length) return;

    // console.log("Comparing " + inputCh + " with " + currentCh);
    
    

    // let element = this.value[this.value.length - 1];
    // console.log(element);
    // document.querySelectorAll(".keyboardSection__keyboard__keyboard div").forEach(function(el) {
    //     if (el.childNodes.length != 1) return;
        
    //     if (element == " ")  {
    //         document.querySelector(".keyboardSection__keyboard__keyboard__spaceKey").style.backgroundColor = "cyan";
    //         return;
    //     }
    //     if (el.innerText.toLowerCase().indexOf(element) != -1 && !excludeWords.includes(el.innerText.toLowerCase())) {
    //         let elId = el.id;
    //         let zone = keycodesZones[elId];
    //         let theme = localStorage.getItem("theme");

    //         el.style.backgroundColor = keyboardBacklightConfig[theme][zone];
    //     }
    // })
});

