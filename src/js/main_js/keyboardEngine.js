let keyboardRunningText = document.querySelector(".keyboardSection__showingText");
let keyboardInputText = document.querySelector(".keyboardSection__writeText__input");

let width = parseInt(getComputedStyle(keyboardRunningText).getPropertyValue('width'));
console.log(width / 2 / 18);
// console.log(width);

let excludeWords = ["shift", "tab", "capslock", "backspace", "space", "alt", "win", "fn", "ps", "enter", "ctrl"];


let keyboardSection_keyboard = document.querySelector(".keyboardSection__keyboard__keyboard");
keyboardInputText.addEventListener("input", function() {
    let element = this.value[this.value.length - 1];
    console.log(element);
    document.querySelectorAll(".keyboardSection__keyboard__keyboard div").forEach(function(el) {
        if (el.childNodes.length != 1) return;
        
        if (element == " ")  {
            document.querySelector(".keyboardSection__keyboard__keyboard__spaceKey").style.backgroundColor = "cyan";
            return;
        }
        if (el.innerText.toLowerCase().indexOf(element) != -1 && !excludeWords.includes(el.innerText.toLowerCase())) el.style.backgroundColor = "red";
    })
});