class KeyboardController {
    constructor() {
        // this.onStart();
        this.isStartedToType = false;
        this.correctLetters = "";
        this.wrongLetters = "";
    }

    getDOM() {
        this.keyboardInputTextDOM = document.querySelector(".keyboardSection__writeText__input");
        this.excludeWords = ["shift", "tab", "capslock", "backspace", "space", "alt", "win", "fn", "ps", "enter", "ctrl"];
        this.showingTextDOM = document.querySelector(".showingText__text");
        this.showingText_array = this.showingTextDOM.innerText.split(' ');
        this.activeWordDOM = document.querySelector(".showingText__activeWord");
        this.writtenDOM = document.querySelector(".showingText__written");
        this.writtenHiddenDOM = document.querySelector(".showingText__written__hidden");
        
    }

    onStart() {
        this.setFingersBacklight(localStorage.getItem("theme"));
        this.keyboardInputAddEventListener();
    }

    getNextActiveWord() {
        console.log(this.showingText_array);
        
        if (this.showingText_array.length == 0) {
            this.writtenHiddenDOM.innerHTML += this.writtenDOM.innerHTML;
            this.writtenDOM.innerHTML = "";
            keyboardLesson.continueLesson();
            keyboardLesson.progressBarUpdate();
            this.showingText_array = this.showingTextDOM.innerText.split(" ");
        }
        // this.progressBarUpdate();
        this.activeWordDOM.innerHTML = this.showingText_array[0] + " ";
        this.showingText_array.shift();
        this.showingTextDOM.innerHTML = this.showingText_array.join(" ");
        this.hightlightHandFinger(this.activeWordDOM.innerText[0]);
        if (this.writtenDOM.innerText != '') this.keyboardInputTextDOM.placeholder = '';
        
    }

    hightlightHandFinger(ch) {
        if (!ch || ch == undefined || ch == null) return;
        // console.log(ch);
        document.querySelectorAll(".keyboardSection__keyboard__leftHand__finger").forEach((finger) => {finger.style.opacity = null;});
        document.querySelectorAll(".keyboardSection__keyboard__rightHand__finger").forEach((finger) => {finger.style.opacity = null;});
    
        if (!mainSettings.keyboardBacklight) return;
        if (ch == ' ') {
            document.querySelector(`.keyboardSection__keyboard__leftHand__Lthumb`).style.opacity = 1;
            document.querySelector(`.keyboardSection__keyboard__rightHand__Rthumb`).style.opacity = 1;
            return;
        }
    
        let isUpperCase = ch.toUpperCase() === ch;
        let excludeWords = this.excludeWords;
        document.querySelectorAll(".keyboardSection__keyboard__keyboard div").forEach(function(el) {
            if (el.childNodes.length != 1) return;
    
            if (el.innerText.toLowerCase().indexOf(ch.toLowerCase()) != -1 && !excludeWords.includes(el.innerText.toLowerCase())) {
                if (el.innerText.length > 1) {
                    if (el.innerText.indexOf(ch) == 0) isUpperCase = false;
                    else isUpperCase = true;
                }
                let zone = keycodesZones[el.id];
                // let theme = mainSettings.theme;
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

    setFingersBacklight(theme) {
        console.log(theme);
        let config;
        if (theme == null || theme == undefined) config = keyboardBacklightConfig.default;
        else config = keyboardBacklightConfig[theme];
        Object.keys(config).forEach((finger) => {
            if (finger == 'default') return;
            let item; let color;
            if (finger[0] == 'L') item = document.querySelector(`.keyboardSection__keyboard__leftHand__${finger}`);
            else item = document.querySelector(`.keyboardSection__keyboard__rightHand__${finger}`);
            const theme = localStorage.getItem("theme");
            if (theme == null) color = item.style.backgroundColor = keyboardBacklightConfig.default[finger];
            else color = item.style.backgroundColor = keyboardBacklightConfig[theme][finger];
            item.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}`;
        });
        
    }

    setStartedToType(bool) {
        this.isStartedToType = bool;
    }

    keyboardInputAddEventListener() {
        this.keyboardInputTextDOM.addEventListener("input", () => {
            if (!this.isStartedToType) {
                this.isStartedToType = true;
                stopwatch.timerStart();
            }
            
            let currentInputWord = this.keyboardInputTextDOM.value.toString();
            let currentWord = this.activeWordDOM.innerText;
            
            if (currentInputWord == ' ') {
                this.keyboardInputTextDOM.value = '';
                return;
            }
            if (currentInputWord[currentInputWord.length - 1] == ' ') {
                this.hightlightHandFinger(' ');
                let spanCorrectionText = this.getSpanWrapText(currentWord, currentInputWord.substr(0, currentInputWord.length - 1)) + ' ';
                this.writtenDOM.innerHTML += spanCorrectionText;
                this.getNextActiveWord();
                this.keyboardInputTextDOM.value = '';
            }
            if (currentInputWord.length < currentWord.length) {
                this.hightlightHandFinger(currentWord[currentInputWord.length]);
            }
        });
    }

    getWrongCharacters() {
        return this.wrongLetters.split(/\s+/).join('');
    }

    getRightCharacters() {
        return this.correctLetters.split(/\s+/).join('');
    }

    resetCharacters() {
        this.wrongLetters = "";
        this.correctLetters = "";
    }

    getAllText() {
        return (this.wrongLetters + this.correctLetters).split(/\s+/).join('');
    }

    getSpanWrapText(correctWord, inputWord) {
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
        let correctCharacters = "";
        let wrongCharacters = "";
        spanArray.forEach((value, index) => {
            if (spanCorrectionArray[index]) {
                spanCorrection += spanRightCh + value + "</span>";
                correctCharacters += value;
            }
            else {
                spanCorrection += spanWrongCh + value + "</span>";
                wrongCharacters += value;
            } 
        });
        // wrongCharacters = wrongCharacters.replace('/\s/g', '');
        // correctCharacters = correctCharacters.replace('/\s/g', '');
        this.correctLetters += correctCharacters;
        this.wrongLetters += wrongCharacters;
        // console.log("wrong Letters: '" + this.wrongLetters + "'");
        return spanCorrection;
    }

};


// keyboardControll.keyboardOnStart();

// let keyboardRunningText = document.querySelector(".keyboardSection__showingText");
// let keyboardInputText = document.querySelector(".keyboardSection__writeText__input");

// let excludeWords = ["shift", "tab", "capslock", "backspace", "space", "alt", "win", "fn", "ps", "enter", "ctrl"];


// let showingText_text = document.querySelector(".showingText__text");
// let showingText_textArray = showingText_text.innerText.split(" ");
// let showingText_active = document.querySelector(".showingText__activeWord");
// let showingText_written = document.querySelector(".showingText__written");
// let showingText_writtenHidden = document.querySelector(".showingText__written__hidden");

// let inputText__dontTouch = document.querySelector(".keyboardSection__writeText__dontTouch");

// let lessonsDropDownItems = document.querySelectorAll(".mainSectionContainer__lessons__flexContainer__menu__item");

// for (let i = 0; i < lessonsDropDownItems.length; ++i) {
//     lessonsDropDownItems[i].onclick = function() {
//         lessonsDropDownItems[i].parentElement.classList.toggle("mainSectionContainer__lessons__flexContainer__menu__item_active");
//         let blockHeightSubmenu = lessonsDropDownItems[i].parentElement.querySelectorAll(".mainSectionContainer__lessons__flexContainer__menu__subitem").length * 50;

//         if (lessonsDropDownItems[i].parentElement.querySelector(".mainSectionContainer__lessons__flexContainer__menu__item_active .mainSectionContainer__lessons__flexContainer__submenu") != null) {
//             lessonsDropDownItems[i].parentElement.querySelector(".mainSectionContainer__lessons__flexContainer__menu__item_active .mainSectionContainer__lessons__flexContainer__submenu")
//             .style.height = blockHeightSubmenu + "px";
//         } else {
//             lessonsDropDownItems[i].parentElement.querySelector(".mainSectionContainer__lessons__flexContainer__submenu")
//             .style.height = 0 + "px";
//         }        
//     }
// }

// lessonsDropDownItems[currentLesson].onclick();


// Object.keys(keyboardBacklightConfig.default).forEach((finger) => {
//     if (finger == 'default') return;
//     let item; let color;
//     if (finger[0] == 'L') item = document.querySelector(`.keyboardSection__keyboard__leftHand__${finger}`);
//     else item = document.querySelector(`.keyboardSection__keyboard__rightHand__${finger}`);
//     const theme = localStorage.getItem("theme");
//     if (theme == null) color = item.style.backgroundColor = keyboardBacklightConfig.default[finger];
//     else color = item.style.backgroundColor = keyboardBacklightConfig[theme][finger];
//     item.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}`;
// });

// function hightlightHandFinger(ch) {
//     if (!ch || ch == undefined || ch == null) return;
//     console.log(ch);
//     document.querySelectorAll(".keyboardSection__keyboard__leftHand__finger").forEach((finger) => {finger.style.opacity = null;});
//     document.querySelectorAll(".keyboardSection__keyboard__rightHand__finger").forEach((finger) => {finger.style.opacity = null;});

//     if (!mainSettings.keyboardBacklight) return;
//     if (ch == ' ') {
//         document.querySelector(`.keyboardSection__keyboard__leftHand__Lthumb`).style.opacity = 1;
//         document.querySelector(`.keyboardSection__keyboard__rightHand__Rthumb`).style.opacity = 1;
//         return;
//     }
    
//     // let nextCharacter = document.querySelector(".showingText__activeWord .theRestWord").innerText[0];
//     let isUpperCase = ch.toUpperCase() === ch;
//     document.querySelectorAll(".keyboardSection__keyboard__keyboard div").forEach(function(el) {
//         if (el.childNodes.length != 1) return;

//         if (el.innerText.toLowerCase().indexOf(ch.toLowerCase()) != -1 && !excludeWords.includes(el.innerText.toLowerCase())) {
//             if (el.innerText.length > 1) {
//                 if (el.innerText.indexOf(ch) == 0) isUpperCase = false;
//                 else isUpperCase = true;
//             }
//             let zone = keycodesZones[el.id];
//             let theme = mainSettings.theme;
//             if(zone[0].toLowerCase() == "l") {
//                 if (isUpperCase) document.querySelector(".keyboardSection__keyboard__rightHand__Rpinkie").style.opacity = 1;
//                 document.querySelector(`.keyboardSection__keyboard__leftHand__${zone}`).style.opacity = 1;
//             } else {
//                 if (isUpperCase) document.querySelector(".keyboardSection__keyboard__leftHand__Lpinkie").style.opacity = 1;
//                 document.querySelector(`.keyboardSection__keyboard__rightHand__${zone}`).style.opacity = 1;
//             }
//             return;
//         }
//     });
// }

// function getNextActiveWord() {
//     console.log(showingText_textArray);
//     if (showingText_textArray.length == 0) {
//         showingText_writtenHidden.innerHTML += showingText_written.innerHTML;
//         showingText_written.innerHTML = "";
//         keyboardLesson.continueLesson();
//         showingText_textArray = showingText_text.innerText.split(" ");
//     }
//     showingText_active.innerHTML = showingText_textArray[0] + " ";
//     showingText_textArray.shift();
//     showingText_text.innerHTML = showingText_textArray.join(" ");
//     hightlightHandFinger(showingText_active.innerText[0]);
//     if (showingText_written.innerText != '') keyboardInputText.placeholder = '';
// }


// getNextActiveWord();

// let width = parseInt(getComputedStyle(keyboardRunningText).getPropertyValue('width'));
// console.log(width / 2 / 18);
// console.log(width);

// function getSpanWrapText(correctWord, inputWord) {
//     console.log("comparing '" + correctWord + "' with '" + inputWord + "'");
//     let spanCorrection = "";
//     let spanWrongCh = '<span class="wrongCh">';
//     let spanRightCh = '<span class="rightCh">';
//     let spanArray = [];
//     let spanCorrectionArray = [];
//     let isRight = false;
//     let size = correctWord.length < inputWord.length ? correctWord.length : inputWord.length;

//     for (let i = 0; i < size; ++i) {
//         if (correctWord[i] == inputWord[i]) {
//             if (isRight) {
//                 spanArray[spanArray.length - 1] += correctWord[i];
//             } else {
//                 spanArray.push(correctWord[i]);
//                 spanCorrectionArray.push(true);
//             }
//             isRight = true;
//         } else {
//             if (i == 0) isRight = true;
//             if (isRight) {
//                 spanArray.push(correctWord[i]);
//                 spanCorrectionArray.push(false);
//             } else {
//                 spanArray[spanArray.length - 1] += correctWord[i];
//             }
//             isRight = false;
//         }
//     }
//     if (size < correctWord.length) {
//         if (isRight) {
//             spanArray.push(correctWord.substr(size, correctWord.length - size));
//             spanCorrectionArray.push(false);
//         } else {
//             spanArray[spanArray.length - 1] += correctWord.substr(size, correctWord.length - size);
//         }
//     }
//     spanArray.forEach((value, index) => {
//         if (spanCorrectionArray[index]) spanCorrection += spanRightCh + value + "</span>";
//         else spanCorrection += spanWrongCh + value + "</span>"; 
//     });
//     return spanCorrection;
// }

// keyboardInputText.addEventListener("input", function() {
//     let currentInputWord = keyboardInputText.value.toString();
//     let currentWord = showingText_active.innerText;
    
//     if (currentInputWord == ' ') {
//         keyboardInputText.value = '';
//         return;
//     }
//     if (currentInputWord[currentInputWord.length - 1] == ' ') {
//         hightlightHandFinger(' ');
//         let spanCorrectionText = getSpanWrapText(currentWord.substr(0, currentWord.length - 1), currentInputWord.substr(0, currentInputWord.length - 1)) + ' ';
//         showingText_written.innerHTML += spanCorrectionText;
//         getNextActiveWord();
//         keyboardInputText.value = '';
//     }
//     if (currentInputWord.length < currentWord.length) {
//         hightlightHandFinger(currentWord[currentInputWord.length]);
//     }
// });



