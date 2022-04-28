class Lesson {
    constructor(currentLesson, currentPartLesson, lessonsConfig, domElementToRender = document.querySelector(".mainSectionContainer__lessons__flexContainer__menu")) {
        this.domElement = domElementToRender;
        this.changeLessonConfig(lessonsConfig);
        this.renderDOMLessons();
        // this.lessonID = lesson;
        this.lessonNumber = currentLesson;
        this.partLessonNumber = currentPartLesson;
        this.stringDOM = document.querySelector(".showingText__text");
        this.stringPrepareDOM = document.querySelector(".showingText__text__prepare");
        

        this.currentPart = 0;
        this.lessonArray = [];
        
        this.loadLesson();
        
    }
    showLesson() {
        console.log("_____________");
        console.log(this.lessonNumber);
        console.log(this.partLessonNumber);
        console.log(this.lesson);
        console.log(this.lessonArray);
        console.log(this.lessonSettings);
        console.log("_____________");
    }
    changeLessonConfig(newLessonsConfig) {
        this.lessonsConfig = newLessonsConfig;
    }
    loadLesson() {
        this.lesson = Object.values(this.lessonsConfig[Object.keys(this.lessonsConfig)[this.lessonNumber].toString()])[this.partLessonNumber];
        this.lessonArray = this.lesson.text;
        this.lessonSettings = this.lesson.settings;
        this.loadSettings();
        this.loadStringLesson();
    }
    loadStringLesson() {
        this.stringDOM.innerHTML = this.getString();
        this.stringPrepareDOM.innerHTML = this.getStringToPrepare();
    }
    continueLesson() {
        this.currentPart++;
        this.loadStringLesson();
    }
    loadSettings() {
        Object.keys(this.lessonSettings).forEach(item => {
            mainSettings[item] = this.lessonSettings[item];
        });
        mainSettingsUpdate();
    }
    getString() {
        if (this.currentPart >= this.lessonArray.length) {
            console.log("Lesson has been ended");
            return "End of the lesson";
        }
        return this.lessonArray[this.currentPart];
    }
    getStringToPrepare() {
        debug.log(2, "this.lessonArray[" + +(+this.currentPart + 1) + "] is " + this.lessonArray[this.currentPart + 1]);
        if (this.currentPart + 1 >= this.lessonArray.length) return "";
        return this.lessonArray[this.currentPart + 1];
    }
    renderDOMLessons() {
        let domString = '<div class="mainSectionContainer__lessons__flexContainer__menu__dropDownItem">';
        Object.keys(this.lessonsConfig).forEach(item => {
            domString += '<div class=" mainSectionContainer__lessons__flexContainer__menu__item" data-tilt><i class="fal fa-angle-right"></i>';
            domString += this.lessonsConfig[item].lessonName;
            domString += '</div>';

            domString += '<div class="mainSectionContainer__lessons__flexContainer__submenu">';

            Object.keys(this.lessonsConfig[item]).forEach(subItem => {
                if (subItem == 'lessonName') return;
                // console.log(this.lessonsConfig[item]);
                let subLesson_name = this.lessonsConfig[item][subItem].subLessonName;
                domString += '<div class="mainSectionContainer__lessons__flexContainer__menu__subitem" data-tilt><div id="';
                domString += subLesson_name;
                domString += '" class="mainSectionContainer__lessons__flexContainer__menu__subitem__text">';
                domString += subLesson_name;
                domString += '</div></div>';
            });

            domString += '</div></div>';
        });
        this.domElement.innerHTML = domString;
    }
};

{/*
 <div class="mainSectionContainer__lessons__flexContainer__menu__dropDownItem">
    <div class=" mainSectionContainer__lessons__flexContainer__menu__item" data-tilt><i class="fal fa-angle-right"></i>Lesson 1. Middle row</div>
    <div class="mainSectionContainer__lessons__flexContainer__submenu">
        <div class="mainSectionContainer__lessons__flexContainer__menu__subitem" data-tilt><div id="middleRow" class="mainSectionContainer__lessons__flexContainer__menu__subitem__text">Middle row</div></div>
        <div class="mainSectionContainer__lessons__flexContainer__menu__subitem" data-tilt><div id="newKeys1" class="mainSectionContainer__lessons__flexContainer__menu__subitem__text">New Keys 1</div></div>
        <div class="mainSectionContainer__lessons__flexContainer__menu__subitem" data-tilt><div id="newKeys2" class="mainSectionContainer__lessons__flexContainer__menu__subitem__text">New Keys 2</div></div>
        <div class="mainSectionContainer__lessons__flexContainer__menu__subitem" data-tilt><div id="newKeys3" class="mainSectionContainer__lessons__flexContainer__menu__subitem__text">New Keys 3</div></div>
        <div class="mainSectionContainer__lessons__flexContainer__menu__subitem" data-tilt><div id="keyTest1" class="mainSectionContainer__lessons__flexContainer__menu__subitem__text">Key practice</div></div>
        <div class="mainSectionContainer__lessons__flexContainer__menu__subitem" data-tilt><div id="wordTest1" class="mainSectionContainer__lessons__flexContainer__menu__subitem__text">Word practice</div></div>
    </div>
</div> 
*/}
