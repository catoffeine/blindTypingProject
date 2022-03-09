'use strict';

let mainThemes = {'dark': 0, 'bright': 1};
let currentTheme = 0;

function changeTheme() {
    let theme = localStorage.getItem('theme');
    if (theme == null) currentTheme = mainThemes['dark'];
    if (theme != mainThemes[currentTheme]) currentTheme = mainThemes[theme];
    document.querySelector("body").classList = "";
    document.querySelector("body").classList.add(mainThemes[currentTheme]);
    localStorage.setItem('theme', mainThemes[currentTheme]);
    currentTheme = (currentTheme + 1) % mainThemes.length;
}

document.querySelector(".themeSwitcher").onclick = function() {
    changeTheme();
}

