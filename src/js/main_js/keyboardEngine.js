let keyboardRunningText = document.querySelector(".keyboardSection__showingText");
let keyboardInputText = document.querySelector(".keyboardSection__writeText__input");

let width = parseInt(getComputedStyle(keyboardRunningText).getPropertyValue('width'));
console.log(width / 2 / 18);
// console.log(width);