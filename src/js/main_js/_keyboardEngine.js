//Loading configs

let keyboardRunningText = document.querySelector(".keyboardSection__showingText");
let keyboardInputText = document.querySelector(".keyboardSection__writeText__input");

let excludeWords = ["shift", "tab", "capslock", "backspace", "space", "alt", "win", "fn", "ps", "enter", "ctrl"];

let showingText_text = document.querySelector(".showingText__text");
let showingText_textArray = showingText_text.innerText.split(" ");
let showingText_active = document.querySelector(".showingText__activeWord");
let showingText_written = document.querySelector(".showingText__written");

function hightlightHandFinger(ch) {
    if (!document.querySelector(".settingsKeysBacklight input").checked) return;
    // let nextCharacter = document.querySelector(".showingText__activeWord .theRestWord").innerText[0];
    let isUpperCase = ch.toUpperCase() === ch;
    document.querySelectorAll(".keyboardSection__keyboard__keyboard div").forEach(function(el) {
        if (el.childNodes.length != 1) return;

        if (el.innerText.toLowerCase().indexOf(ch.toLowerCase()) != -1 && !excludeWords.includes(el.innerText.toLowerCase())) {
            if (el.innerText.length > 1) {
                if (el.innerText.indexOf(ch) == 0) isUpperCase = false;
                else isUpperCase = true;
            }
            document.querySelectorAll(".keyboardSection__keyboard__leftHand__finger").forEach((finger) => {finger.style.opacity = null;});
            document.querySelectorAll(".keyboardSection__keyboard__rightHand__finger").forEach((finger) => {finger.style.opacity = null;});
            let zone = keycodesZones[el.id];
            let theme = localStorage.getItem("theme");
            if(zone[0].toLowerCase() == "l") {
                if (isUpperCase) {
                    document.querySelector(".keyboardSection__keyboard__rightHand__Rpinkie").style.backgroundColor = keyboardBacklightConfig[theme].Rpinkie;
                    document.querySelector(".keyboardSection__keyboard__rightHand__Rpinkie").style.opacity = 1;
                }
                document.querySelector(`.keyboardSection__keyboard__leftHand__${zone}`).style.backgroundColor = keyboardBacklightConfig[theme][zone];
                document.querySelector(`.keyboardSection__keyboard__leftHand__${zone}`).style.opacity = 1;
            } else {
                if (isUpperCase) {
                    document.querySelector(".keyboardSection__keyboard__leftHand__Lpinkie").style.backgroundColor = keyboardBacklightConfig[theme].Lpinkie;
                    document.querySelector(".keyboardSection__keyboard__leftHand__Lpinkie").style.opacity = 1;
                }
                document.querySelector(`.keyboardSection__keyboard__rightHand__${zone}`).style.backgroundColor = keyboardBacklightConfig[theme][zone];
                document.querySelector(`.keyboardSection__keyboard__rightHand__${zone}`).style.opacity = 1;
            }
            return;
        }
    });
}



showingText_active.innerHTML = showingText_textArray[0] + " ";
showingText_textArray.shift();
showingText_text.innerHTML = showingText_textArray.join(" ");
hightlightHandFinger(showingText_active.innerText[0]);




let width = parseInt(getComputedStyle(keyboardRunningText).getPropertyValue('width'));
console.log(width / 2 / 18);
// console.log(width);



let isRight = false;
let inputTextSize;
let currentInputWord = "";

// let keyboardSection_keyboard = document.querySelector(".keyboardSection__keyboard__keyboard");

keyboardInputText.addEventListener("input", function() {
    let inputText = keyboardInputText.value.toString();
    let currentWord = showingText_active.innerText;

    let arrTmp = inputText.split(" ");
    currentInputWord = arrTmp[arrTmp.length - 1];

    if (currentInputWord.length == 0) {
        hightlightHandFinger(currentWord[currentInputWord.length]);
    }

    if (inputText.length == 0 || currentInputWord.length > currentWord.length) return;
    if (inputText[inputText.length - 1] == " ") return;
    if (inputText.length < inputTextSize) {
        console.log("decreasing");
    } else {
        console.log("increasing");
    }

    let inputCh = currentInputWord[currentInputWord.length - 1];
    let currentCh = currentWord[currentInputWord.length - 1];

    if (currentInputWord.length < currentWord.length) {
        hightlightHandFinger(currentWord[currentInputWord.length]);
    }

    console.log("Comparing " + inputCh + " with " + currentCh);
    
    inputTextSize = inputText.length;
    

    // if (inputText[inputText.length - 1] === currentWord[0]) {
    //     console.log("right");
    //     if (spanCorrectionText.length == 0) {
    //         isRight = true;
    //         spanCorrectionText = rightCh_template + currentWord[0] + '</span>';
    //     }
    //     misTypingDocument.innerHTML = spanCorrectionText;
    //     showingText_activeWord.innerHTML = currentWord.substr(1);
    // } else {
    //     console.log("incorrect");
    // }

    let lastCharacter = inputText[inputText.length - 1];
    
    

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

