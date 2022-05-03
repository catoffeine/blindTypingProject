'use strict';

let mainThemes = ['dark', 'bright'];
let currentTheme = 0;

function setTheme() {
    if (localStorage.getItem("theme") == null) localStorage.setItem("theme", "dark");
    let newTheme = localStorage.getItem("theme");
    currentTheme = mainThemes.findIndex(el => el == newTheme);
    document.querySelector("body").classList = "";
    document.querySelector("body").classList.add(newTheme);
}

function changeThemeForward() {
    currentTheme = (currentTheme + 1) % mainThemes.length;
    localStorage.setItem("theme", mainThemes[currentTheme]);
    keyboardControll.setFingersBacklight(mainThemes[currentTheme]);
    backlightSwitch();
    setTheme();
}

document.querySelector(".themeSwitcher").onclick = function() {
    changeThemeForward();
}