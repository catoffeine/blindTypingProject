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
    theme: "dark",
};
if (localStorage.getItem(mainSettingsStorageName) == null) {
    localStorage.setItem(mainSettings.localStorageName, JSON.stringify(mainSettings));
} else {
    mainSettings = JSON.parse(localStorage.getItem(mainSettingsStorageName));
}

function backlightSwitch() {
    document.querySelector(".settingsKeysBacklight input").checked = mainSettings.keyboardBacklight;
    let hands = document.querySelector(handClass);
    if (mainSettings.keyboardBacklight) {
        document.querySelectorAll(keyClass).forEach(function(el) {
            if (el.childNodes.length != 1) return;
            let elId = el.id;
            let zone = keycodesZones[elId];
            let theme = mainSettings.theme;
            if (theme == null) {
                debug.log(0, "Theme error in Settings class, function BacklightSwitch");
                return;
            }
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
    }
    
}

function setKeyboardBacklight(isOn) {
    console.log(isOn);
    mainSettings.keyboardBacklight = isOn;
    backlightSwitch();
    localStorage.setItem(mainSettingsStorageName, JSON.stringify(mainSettings));
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
    localStorage.setItem(mainSettingsStorageName, JSON.stringify(mainSettings));

} 

function mainSettingsUpdate() {
    setKeyboardBacklight(mainSettings.keyboardBacklight);
    setKeyboardVisibility(mainSettings.showKeyboard);
}

//INPUTS CHANGE
keyboardBacklight_input.addEventListener("change", function() {
    setKeyboardBacklight(this.checked);
    hightlightHandFinger(document.querySelector(".showingText__activeWord").innerText[0]);
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

let nativeLangArray = ["RU", "EN"];
let touchLangArray = ["RU", "EN"];
let valSoundArray = ["a", "b", "c"];
let ULObjects = document.querySelectorAll(".mainSectionContainer__settings__container__item__dropList__button__select ul");
let ULNamedObjects = {};
let BtnObjects = document.querySelectorAll(".mainSectionContainer__settings__container__item__dropList__button__select button");
let SelectObjects = document.querySelectorAll(".mainSectionContainer__settings__container__item__dropList__button__select");
let URLObjects = {
    "language": "images/lanChoosing/",
}

// /images/lanChoosing/
function ulHandler(value, objects, type, element, listType) {
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
    
    let newItem = '<li value="' + value + '"><img src="'+ imageSrc +'" onError=\"this.src=\"\"\"/></li>';
    element.innerHTML += newItem;
    // let ulitems = element.lastElementChild;
    let ulitems = element.children;
    // let li = ulitems[ulitems.length - 1];
    // console.dir(ulitems);
    // console.log(value);
    let btn = element.parentNode.children[0];
    // li.addEventListener("click", function() {
    //     btn.innerHTML = li.innerHTML;
    //     btn.value = li.value;
    //     console.log(li.value);
    // });
    for (let item of ulitems) {
        item.addEventListener("click", function() {
            btn.innerHTML = item.innerHTML;
            btn.value = item.value;
            console.log(item.value);

        });
        console.log("hi");
    };
}

ULObjects.forEach(function(item) {
    ULNamedObjects[item.id] = item;
});

// valSoundArray.forEach(value => ulHandler(value, URLObjects, "keySound", ULObjects[0]));
nativeLangArray.forEach(value => ulHandler(value, URLObjects, "language", ULNamedObjects.nativeLan, "nativeLan"));
touchLangArray.forEach(value => ulHandler(value, URLObjects, "language", ULNamedObjects.touchLan, "touchLan"));

// for (let i = 0; i < SelectObjects.length; ++i) {
//     SelectObjects[i].onclick = function() {
//         SelectObjects[i].classList.toggle("mainSectionContainer__settings__container__item__dropList__button__select__active");
//     }
// }

SelectObjects.forEach((item) => item.onclick = function() {
    item.classList.toggle("mainSectionContainer__settings__container__item__dropList__button__select__active");
});