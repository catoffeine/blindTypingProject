const keyboardBacklight_input = document.querySelector(".settingsKeysBacklight input");
const keyboardVisibility_input = document.querySelector(".settingsShowKeyboard input");
let keyClass = ".keyboardSection__keyboard__keyboard div",
handClass = ".keyboardSection__keyboard__Hands";

let mainSettingsStorageName = "mainSettings";

let mainSettings = {
    keyboardBacklight: false,
    showProgressBar: false,
    showKeyboard: false,
    showSpeed: false,
    typingLayout: null,
    typingLan: null,
    nativeLan: null,
    theme: "dark",
};

function mainSettingsLocalStorageUpdate() {
    localStorage.setItem(mainSettingsStorageName, JSON.stringify(mainSettings));
}

function checkMainSettings() {
    if (localStorage.getItem(mainSettingsStorageName) == null) {
        localStorage.setItem(mainSettings.localStorageName, JSON.stringify(mainSettings));
    } else {
        mainSettings = JSON.parse(localStorage.getItem(mainSettingsStorageName));
    }
    if (mainSettings.nativeLan == null) {
        if (document.location.href.toString().toLowerCase().includes("_ru")) mainSettings.nativeLan = "RU";
        else mainSettings.nativeLan = "EN";
    }
    if (mainSettings.typingLan == null) mainSettings.typingLan = mainSettings.nativeLan;
    if (mainSettings.typingLayout == null) mainSettings.typingLayout = "QWERTY";
    mainSettingsLocalStorageUpdate();
    console.log("MainSettingsTypingLan is " + mainSettings.typingLan);
    console.log("MainSettingsNativeLan is " + mainSettings.nativeLan);
    console.log("MainSettingsTypingLayout is " + mainSettings.typingLayout); 
}

checkMainSettings();


let stopwatch = new StopWatch();
let lessonCompleted = new LessonCompletion();
lessonCompleted.getDOM();

let domLesson = document.querySelector(".mainSectionContainer__lessons__flexContainer__menu");

let keyboardControll = new KeyboardController();

let keyboardLesson = new Lesson(lessonsConfigs[mainSettings.typingLan], domLesson);
keyboardLesson.loadLesson();

keyboardControll.onStart();


function backlightSwitch() {
    document.querySelector(".settingsKeysBacklight input").checked = mainSettings.keyboardBacklight;
    let hands = document.querySelector(handClass);
    if (mainSettings.keyboardBacklight) {
        if (!document.querySelector(".keyboardSection__keyboard__keyboard").classList.contains("backlightKeyboardRow__active")) {
            document.querySelector(".keyboardSection__keyboard__keyboard").classList.toggle("backlightKeyboardRow__active");
        }
        
        document.querySelectorAll(keyClass).forEach(function(el) {
            if (el.childNodes.length != 1) return;
            let elId = el.id;
            let zone = keycodesZones[elId];
            let theme = localStorage.getItem("theme");
            if (theme == null) theme = "default";
            
            el.style.backgroundColor = keyboardBacklightConfig[theme][zone];
            
        });
        if (hands == null) {
            debug.log(0, "Hand class is null, class Settings, function backlightSwitch");
            return;
        }

        hands.style.opacity = 1;

        
    } else {
        document.querySelectorAll(keyClass).forEach(function(el) {
            if (el.childNodes.length != 1) return;
            el.style.backgroundColor = null;
        }); 
        hands.style.opacity = 0;
        if (document.querySelector(".keyboardSection__keyboard__keyboard").classList.contains("backlightKeyboardRow__active")) {
            document.querySelector(".keyboardSection__keyboard__keyboard").classList.toggle("backlightKeyboardRow__active");
        }
    }
    
}

function setKeyboardBacklight(isOn) {
    console.log(isOn);
    mainSettings.keyboardBacklight = isOn;
    backlightSwitch();
    mainSettingsLocalStorageUpdate();
}


function keyboardSwitch() {
    document.querySelector(".settingsShowKeyboard input").checked = mainSettings.showKeyboard;
    if (mainSettings.showKeyboard) {
        document.querySelector('.keyboardSection__keyboard').style.display = "flex";
        setTimeout(() => {
            document.querySelector('.keyboardSection__keyboard').style.opacity = 1;
        }, 50);
        keyboardBacklight_input.disabled = false;
    } else {
        document.querySelector('.keyboardSection__keyboard').style.opacity = 0;
        setTimeout(() => {
            document.querySelector('.keyboardSection__keyboard').style.display = "none";
        }, 500);
        // document.querySelector('.keyboardSection__keyboard__keyboard').style.opacity = 0;1
        keyboardBacklight_input.checked = false;
        keyboardBacklight_input.disabled = true;
        setKeyboardBacklight(false);
    }
}


function setKeyboardVisibility(isOn) {
    mainSettings.showKeyboard = isOn;
    keyboardSwitch();
    mainSettingsLocalStorageUpdate();
} 

function setKeyboardTypingLan() {
    changeTypingLan(mainSettings.typingLayout + '/' + mainSettings.typingLan);

    if (keyboardLesson.getLanguage() == mainSettings.typingLan) return;
    keyboardLesson.setLanguage(mainSettings.typingLan);

    
    keyboardLesson.changeLessonConfig(lessonsConfigs[mainSettings.typingLan]);
    keyboardLesson.renderDOMLessons();
    keyboardLesson.loadLesson();
    mainSettingsLocalStorageUpdate();
}

function mainSettingsUpdate() {
    setKeyboardBacklight(mainSettings.keyboardBacklight);
    setKeyboardVisibility(mainSettings.showKeyboard);
}



//INPUTS CHANGE
keyboardBacklight_input.addEventListener("change", function() {
    setKeyboardBacklight(this.checked);
    keyboardControll.hightlightHandFinger(document.querySelector(".showingText__activeWord").innerText[0]);
});

keyboardVisibility_input.addEventListener("change", function() {
    setKeyboardVisibility(this.checked);
});
//INPUTS CHANGE


let hamburgerSettingsBtn = document.querySelector(".mainSectionContainer__settings__hamburgerButton");
let closeBtnSettings = document.querySelector(".mainSectionContainer__settings__closeBtn");

hamburgerSettingsBtn.onclick = function() {
    document.querySelector(".mainSectionContainer__settings").classList.toggle("mainSectionContainer__settings__hamburgerButton__active");
}

closeBtnSettings.onclick = function() {
    document.querySelector(".mainSectionContainer__settings").classList.toggle("mainSectionContainer__settings__hamburgerButton__active");
}

// function changeLanTyping() {

// }

let touchLangArray = ["RU", "EN"];
let valSoundArray = ["a", "b", "c"];
let ULObjects = document.querySelectorAll(".mainSectionContainer__settings__container__item__dropList__button__select ul");
let ULNamedObjects = {};
let BtnObjects = document.querySelectorAll(".mainSectionContainer__settings__container__item__dropList__button__select button");
let SelectObjects = document.querySelectorAll(".mainSectionContainer__settings__container__item__dropList__button__select");
let URLObjects = {
    "language": "images/lanChoosing/",
}

function ulHandler(value, objects, type, element) {
    let imageSrc = objects[type] + value.toUpperCase();
    switch(type) {
        case 'language': {
            imageSrc += "Lan.svg";
            break;
        }
        case 'keySound': {
            imageSrc += "KeySound.svg";
            break;
        }
    }
    
    let newItem = '<li id="' + value + '"><img src="'+ imageSrc +'" onError=\"this.src=\"\"\"/></li>';
    element.innerHTML += newItem;
    let ulitems = element.children;

    // let li = ulitems[ulitems.length - 1];
    // console.dir(ulitems);
    // console.log(value);
    let btn = element.parentNode.children[0];
    if (type == 'language') {
        let lan = mainSettings.typingLan;
        btn.value = lan;
        btn.querySelector('img').src = objects[type] + lan + "Lan.svg";
    }
    
    // li.addEventListener("click", function() {
    //     btn.innerHTML = li.innerHTML;
    //     btn.value = li.value;
    //     console.log(li.value);
    // });
    for (let item of ulitems) {
        item.addEventListener("click", function() {
            btn.innerHTML = item.innerHTML;
            btn.value = this.id;
            if (type == 'language') {
                mainSettings.typingLan = this.id;
                setKeyboardTypingLan();
            }
        });
    };

}

ULObjects.forEach(function(item) {
    ULNamedObjects[item.id] = item;
});

// valSoundArray.forEach(value => ulHandler(value, URLObjects, "keySound", ULObjects[0]));
touchLangArray.forEach(value => ulHandler(value, URLObjects, "language", ULNamedObjects.touchLan));

// for (let i = 0; i < SelectObjects.length; ++i) {
//     SelectObjects[i].onclick = function() {
//         SelectObjects[i].classList.toggle("mainSectionContainer__settings__container__item__dropList__button__select__active");
//     }
// }

SelectObjects.forEach((item) => item.onclick = function() {
    item.classList.toggle("mainSectionContainer__settings__container__item__dropList__button__select__active");
});


document.querySelector(".result__controll__previous").onclick = function() {
    keyboardLesson.loadPreviousLesson();
}

document.querySelector(".result__controll__next").onclick = function() {
    keyboardLesson.loadNextLesson();
}

document.querySelector(".result__controll__restart").onclick = function() {
    keyboardLesson.restartLesson();
}


