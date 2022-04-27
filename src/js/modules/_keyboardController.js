class keyboardController {
    constructor() {
        this.keyClass = ".keyboardSection__keyboard__keyboard div";
        this.handClass = ".keyboardSection__keyboard__Hands";

        //inputs
        this.backlightInput = ".settingsKeysBacklight input";
        this.showKeyboardInput = ".settingsShowKeyboard input";
    }

    backlightSwitch() {
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

    function handsSwitch() {
        let hands = document.querySelector(handClass);
        if (mainSettings.handsVisibility) hands.style.opacity = 1;
         else hands.style.opacity = 0;
    }
    
    keyboardSwitch() {
        document.querySelector(".settingsShowKeyboard input").checked = mainSettings.showKeyboard;
        if (mainSettings.showKeyboard) {
            document.querySelector('.keyboardSection__keyboard__keyboard').style.opacity = 1;
            setHandsVisibility(true);
        } else {
            document.querySelector('.keyboardSection__keyboard__keyboard').style.opacity = 0;
            setHandsVisibility(false);
        }
    }
    
    setKeyboardBacklight(isOn) {
        mainSettings.keyboardBacklight = isOn;
        backlightSwitch();
        localStorage.setItem(mainSettingsStorageName, JSON.stringify(mainSettings));
    }
    
    setHandsVisibility(isOn) {
        if (!mainSettings.keyboardBacklight) mainSettings.handsVisibility = false;
        else mainSettings.handsVisibility = isOn;
        handsSwitch();
        localStorage.setItem(mainSettingsStorageName, JSON.stringify(mainSettings));
    }
    
    setKeyboardVisibility(isOn) {
        mainSettings.showKeyboard = isOn;
        keyboardSwitch();
        localStorage.setItem(mainSettingsStorageName, JSON.stringify(mainSettings));
    
    } 

}