'use strict';

let languageChoose_en = document.querySelector(".chooseLan .languageChooseFlex__item-en");
let languageChoose_ru = document.querySelector(".chooseLan .languageChooseFlex__item-ru");
let currentNativeLan = "";

let languageChooseTyping_en = document.querySelector(".typingLan .languageChooseFlex__item-en");
let languageChooseTyping_ru = document.querySelector(".typingLan .languageChooseFlex__item-ru");
let currentTypingLan = "";

let confirmBtn = document.querySelector(".chooseLanAbsolute__confirm");
confirmBtn.style.pointerEvents = "none";
confirmBtn.style.opacity = "0.5";

confirmBtn.onclick = function() {
    if (currentNativeLan == "") alert("Error occurred, you must choose native language");
    if (currentTypingLan == "") alert("Error occurred, you must choose typing language");

    if (currentNativeLan == "EN") {
        localStorage.removeItem("nativeLan");
        localStorage.setItem("nativeLan", "EN");
        if (currentTypingLan == "Russian") {
            localStorage.removeItem("typingLan");
            localStorage.setItem("typingLan", "Russian");
        } else {
            localStorage.removeItem("typingLan");
            localStorage.setItem("typingLan", "English");
        }
    } else if (currentNativeLan == "RU"){
        localStorage.removeItem("nativeLan");
        localStorage.setItem("nativeLan", "RU");
        if (currentTypingLan == "Russian") {
            localStorage.removeItem("typingLan");
            localStorage.setItem("typingLan", "Russian");
        } else {
            localStorage.removeItem("typingLan");
            localStorage.setItem("typingLan", "English");
        }
    } else {
        alert("Error occured, something wrong's happened");
    }
    window.location.href = 
                `/${localStorage.getItem("nativeLan")}-${localStorage.getItem("typingLan")}/lesson/1/part/1`;
}

languageChoose_en.onclick = function() {
    if (currentNativeLan != "") {
        languageChoose_ru.classList.toggle("languageChooseFlex__item_active");
    }
    languageChoose_en.classList.toggle("languageChooseFlex__item_active");
    currentNativeLan = "EN";
    if (currentNativeLan != "" && currentTypingLan != "") {
        confirmBtn.style.pointerEvents = "all";
        confirmBtn.style.opacity = "1";
    }
    // sessionStorage.removeItem("nativeLan");
    // sessionStorage.setItem("nativeLan", "EN");
    // window.location.href = "/startscreen/typinglan_en.html";
    
}

languageChoose_ru.onclick = function() {
    if (currentNativeLan != "") {
        languageChoose_en.classList.toggle("languageChooseFlex__item_active");
    }
    languageChoose_ru.classList.toggle("languageChooseFlex__item_active");
    currentNativeLan = "RU";
    if (currentNativeLan != "" && currentTypingLan != "") {
        confirmBtn.style.pointerEvents = "all";
        confirmBtn.style.opacity = "1";
    }
    // sessionStorage.removeItem("nativeLan");
    // sessionStorage.setItem("nativeLan", "RU");
    // window.location.href = "/startscreen/typinglan_ru.html"
}

languageChooseTyping_en.onclick = function() {
    if (currentTypingLan != "") {
        languageChooseTyping_ru.classList.toggle("languageChooseFlex__item_active");
    }
    languageChooseTyping_en.classList.toggle("languageChooseFlex__item_active");
    currentTypingLan = "English";
    if (currentNativeLan != "" && currentTypingLan != "") {
        confirmBtn.style.pointerEvents = "all";
        confirmBtn.style.opacity = "1";
    }
}

languageChooseTyping_ru.onclick = function() {
    if (currentTypingLan != "") {
        languageChooseTyping_en.classList.toggle("languageChooseFlex__item_active");
    }
    languageChooseTyping_ru.classList.toggle("languageChooseFlex__item_active");
    currentTypingLan = "Russian";
    if (currentNativeLan != "" && currentTypingLan != "") {
        confirmBtn.style.pointerEvents = "all";
        confirmBtn.style.opacity = "1";
    }
}



