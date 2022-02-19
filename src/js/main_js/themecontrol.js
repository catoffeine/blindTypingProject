'use strict';

let themeSwitcher = document.querySelector(".themeSwitcher");
let currentTheme = 0;

if (localStorage.getItem("theme") == "bright") {
    currentTheme = 1;
    document.querySelector("body").classList = "";
    document.querySelector("body").classList.add("bright");
} else if (localStorage.getItem("theme") == "dark") {
    currentTheme = 0;
    document.querySelector("body").classList = "";
    document.querySelector("body").classList.add("dark");
} else if (localStorage.getItem("theme") == null) {
    localStorage.setItem("theme", "dark");
}

themeSwitcher.onclick = function() {
    switch(currentTheme) {
        case 0: {
            currentTheme++;
            document.querySelector("body").classList = "";
            document.querySelector("body").classList.add("bright");
            localStorage.removeItem("theme");
            localStorage.setItem("theme", "bright");
            break;
        }
        case 1: {
            currentTheme = 0;
            document.querySelector("body").classList = "";
            document.querySelector("body").classList.add("dark");
            localStorage.removeItem("theme");
            localStorage.setItem("theme", "dark");
            break;
        }
        // case 2: {
        //     currentTheme = 0;
        //     document.querySelector("body").classList = "";
        //     document.querySelector("body").classList.add("dark");
        //     break;
        // }
    }
}

