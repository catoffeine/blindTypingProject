'use strict';

let currentLesson;
let currentPartLesson;
let currentLessonID;

if (localStorage.getItem("currentLesson") == null) {
    currentLesson = 0;
    localStorage.setItem("currentLesson", currentLesson.toString())
} else {
    currentLesson = localStorage.getItem("currentLesson");
}

if (localStorage.getItem("currentLessonPart") == null) {
    currentPartLesson = 0;
    localStorage.setItem("currentLessonPart", currentPartLesson.toString())
} else {
    currentPartLesson = localStorage.getItem("currentLessonPart");
}

let domLesson = document.querySelector(".mainSectionContainer__lessons__flexContainer__menu");
let keyboardLesson = new Lesson(currentLesson, currentPartLesson, lessons, domLesson);

function switchLesson(currentLesson, currentPartLesson) {
    localStorage.setItem("currentLesson", currentLesson);
    localStorage.setItem("currentLessonPart", currentPartLesson);
    document.querySelectorAll(".mainSectionContainer__lessons__flexContainer__menu__subitem__active").forEach((el) => {
        el.classList.toggle("mainSectionContainer__lessons__flexContainer__menu__subitem__active");
    });
    
    let currentLesson_subItem = document.querySelectorAll(".mainSectionContainer__lessons__flexContainer__submenu")[currentLesson].querySelectorAll(".mainSectionContainer__lessons__flexContainer__menu__subitem__text")[currentPartLesson];
    currentLesson_subItem.classList.toggle("mainSectionContainer__lessons__flexContainer__menu__subitem__active");
    currentLessonID = currentLesson_subItem.id;
    
}

switchLesson(currentLesson, currentPartLesson);

document.querySelectorAll(".mainSectionContainer__lessons__flexContainer__submenu").forEach((item, itemInd) => {
    let itemIndex = itemInd;
    item.querySelectorAll(".mainSectionContainer__lessons__flexContainer__menu__subitem__text").forEach((subItem, subitemInd) => {
        subItem.addEventListener("click", function() {
            currentPartLesson = subitemInd;
            currentLesson = itemIndex;
            currentLessonID = this.id;
            switchLesson(currentLesson, currentPartLesson);
            debug.log(2, "currentLesson is " + currentLesson);
            debug.log(2, "currentLesson is " + currentPartLesson);
        });
    });
});
