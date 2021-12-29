'use strict';

let currentLessonContent = document.querySelector(".currentLesson");
let currentLessonNumber;

let currentPartLessonContent = document.querySelector(".currentPart");
let currentPartLessonNumber;

if (currentLessonContent != null) {
    currentLessonNumber = Number(currentLessonContent.innerHTML);
    if (localStorage.getItem("currentLesson") == null) {
        localStorage.setItem("currentLesson", currentLessonNumber.toString());
    }
}

if (currentPartLessonContent != null) {
    currentPartLessonNumber = Number(currentPartLessonContent.innerHTML);
    if (localStorage.getItem("currentPart") == null) {
        localStorage.setItem("currentPart", currentPartLessonNumber.toString());
    }
}

let lessonsDropDownItems = document.querySelectorAll(".mainSectionContainer__lessons__flexContainer__menu__dropDownItem");

for (let i = 0; i < lessonsDropDownItems.length; ++i) {
    lessonsDropDownItems[i].onclick = function() {
        lessonsDropDownItems[i].classList.toggle("mainSectionContainer__lessons__flexContainer__menu__item_active");
        let blockHeightSubmenu = lessonsDropDownItems[i].querySelectorAll(".mainSectionContainer__lessons__flexContainer__menu__subitem").length * 50;
        if (lessonsDropDownItems[i].querySelector(".mainSectionContainer__lessons__flexContainer__menu__item_active .mainSectionContainer__lessons__flexContainer__submenu") != null) {
            lessonsDropDownItems[i].querySelector(".mainSectionContainer__lessons__flexContainer__menu__item_active .mainSectionContainer__lessons__flexContainer__submenu")
            .style.height = blockHeightSubmenu + "px";
        } else {
            lessonsDropDownItems[i].querySelector(".mainSectionContainer__lessons__flexContainer__submenu")
            .style.height = 0 + "px";
        }        
    }
}

if (localStorage.getItem("currentLesson") != null && localStorage.getItem("currentPart") != null) {
    let currentSubitemSelection = document.querySelectorAll(".mainSectionContainer__lessons__flexContainer__menu__dropDownItem")[localStorage.getItem("currentLesson") - 1].querySelectorAll(".mainSectionContainer__lessons__flexContainer__menu__subitem__text")[1];
    let mainSectionContainer__lessons__flexContainer = document.querySelector(".mainSectionContainer__lessons__flexContainer");
    if (!currentSubitemSelection.classList.contains("mainSectionContainer__lessons__flexContainer__menu__subitem__active")) { 
        currentSubitemSelection.classList.add("mainSectionContainer__lessons__flexContainer__menu__subitem__active");
        mainSectionContainer__lessons__flexContainer.scroll({
            top: (localStorage.getItem("currentLesson") - 1) * 30,
            behavior: 'smooth'
        });
        currentSubitemSelection.focus();
    }
}

if (localStorage.getItem("currentLesson") != null) {

    lessonsDropDownItems[localStorage.getItem("currentLesson") - 1].onclick();

    // lessonsDropDownItems[localStorage.getItem("currentLesson") - 1].classList.toggle("mainSectionContainer__lessons__flexContainer__menu__item_active");
    // let blockHeightSubmenu = lessonsDropDownItems[localStorage.getItem("currentLesson") - 1].querySelectorAll(".mainSectionContainer__lessons__flexContainer__menu__subitem").length * 50;
    // if (lessonsDropDownItems[localStorage.getItem("currentLesson") - 1].querySelector(".mainSectionContainer__lessons__flexContainer__menu__item_active .mainSectionContainer__lessons__flexContainer__submenu") != null) {
    //     lessonsDropDownItems[localStorage.getItem("currentLesson") - 1].querySelector(".mainSectionContainer__lessons__flexContainer__menu__item_active .mainSectionContainer__lessons__flexContainer__submenu")
    //     .style.height = blockHeightSubmenu + "px";
    // } else {
    //     lessonsDropDownItems[localStorage.getItem("currentLesson") - 1].querySelector(".mainSectionContainer__lessons__flexContainer__submenu")
    //     .style.height = 0 + "px";
    // }
}