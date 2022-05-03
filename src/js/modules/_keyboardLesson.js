// const { Chart } = require("chart.js");

class Lesson {
    constructor(lessonsConfig, domElementToRender = document.querySelector(".mainSectionContainer__lessons__flexContainer__menu")) {
        this.language = mainSettings.typingLan;
        this.lessonNumber = localStorage.getItem("currentLesson") || 0;
        this.partLessonNumber = localStorage.getItem("currentLessonPart") || 0;
        this.domElement = domElementToRender;
        this.progressBarDOM = document.querySelector(".keyboardSection__progressBar");

        this.changeLessonConfig(lessonsConfig);
        this.renderDOMLessons();
        
        this.currentPart = 0;
        this.lessonArray = [];
        
        // this.loadLesson();
        
    }
    getLanguage() {
        return this.language;
    }
    setLanguage(newLanguage) {
        this.language = newLanguage;
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
    showPrevNextButtons() {
        
        if (this.partLessonNumber == this.getCountOfSubLessons() && this.lessonNumber == this.getCountOfLessons()) {
            document.querySelector(".result__controll__next").style.display = "none";
        } else {
            document.querySelector(".result__controll__next").style.display = "block";
        }

        if (this.partLessonNumber == 0 && this.lessonNumber == 0) {
            document.querySelector(".result__controll__previous").style.display = "none";
        } else {
            document.querySelector(".result__controll__previous").style.display = "block";
        }
        
    }
    loadLesson() {
        this.progressBarDOM.style.width = "0%";
        this.currentPart = 0;
        keyboardControll.resetCharacters();
        keyboardControll.setStartedToType(false);
        stopwatch.timerStop();
        stopwatch.timerReset();
        this.stringDOM = document.querySelector(".showingText__text");
        this.stringPrepareDOM = document.querySelector(".showingText__text__prepare");
        this.activeWord = document.querySelector(".showingText__activeWord");
        document.querySelector(".showingText__written").innerHTML = "";

        this.lesson = Object.values(this.lessonsConfig[Object.keys(this.lessonsConfig)[this.lessonNumber].toString()])[this.partLessonNumber];
        this.lessonArray = this.lesson.text;
        this.lessonSettings = this.lesson.settings;
        this.loadSettings();
        this.loadStringLesson();
        
        this.showPrevNextButtons();
        
        lessonCompleted.showKeyboardContainer()
        keyboardControll.getDOM();
        keyboardControll.getNextActiveWord();
    }
    progressBarUpdate() {
        this.progressBarDOM.style.width = ((keyboardControll.getAllText().length / this.getLessonText().length) * 95).toFixed(2) + "%";
    }
    getLessonText() {
        let result = "";
        this.lessonArray.forEach(item => {
            result += item;
        })
        return result.split(/\s+/).join("");
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
            this.endOfTheLesson();
            return "";
        }
        return this.lessonArray[this.currentPart];
    }
    getStringToPrepare() {
        debug.log(2, "this.lessonArray[" + +(+this.currentPart + 1) + "] is " + this.lessonArray[this.currentPart + 1]);
        if (this.currentPart + 1 >= this.lessonArray.length) return "";
        return this.lessonArray[this.currentPart + 1];
    }

    endOfTheLesson() {
        // lessonCompleted.chartDestroy()
        lessonCompleted.endOfTheLesson();
    }

    getCountOfWords() {
        let result = 0;
        this.lessonArray.forEach((item) => {
            result += item.split(' ').length;
        })
        return result;
    }
    // getNextActiveWord() {
    //     let strArray = this.getString().split(' ');
    //     // if (showingText_textArray.length == 0) {
    //     //     showingText_writtenHidden.innerHTML += showingText_written.innerHTML;
    //     //     showingText_written.innerHTML = "";
    //     //     keyboardLesson.continueLesson();
    //     //     showingText_textArray = showingText_text.innerText.split(" ");
    //     // }
    //     this.activeWord.innerHTML = strArray[0] + " ";
    //     this.activeWord.shift();
    //     this.activeWord.innerHTML = strArray.join(" ");
    //     return this.activeWord;
    //     // hightlightHandFinger(showingText_active.innerText[0]);
    //     // if (showingText_written.innerText != '') keyboardInputText.placeholder = '';
    // }
    
    renderDOMLessons() {
        let domString = '';
        Object.keys(this.lessonsConfig).forEach(item => {
            domString += '<div class="mainSectionContainer__lessons__flexContainer__menu__dropDownItem">';
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

            domString += '</div></div></div>';
        });
        this.domElement.innerHTML = domString;
        this.DOMLessonsOnclickAdd();
        this.DOMLessonsAnimationTilt();
    }
    DOMLessonsOnclickAdd() {
        let lessonsDropDownItems = document.querySelectorAll(".mainSectionContainer__lessons__flexContainer__menu__item");

        for (let i = 0; i < lessonsDropDownItems.length; ++i) {
            lessonsDropDownItems[i].onclick = function() {
                lessonsDropDownItems[i].parentElement.classList.toggle("mainSectionContainer__lessons__flexContainer__menu__item_active");
                let blockHeightSubmenu = lessonsDropDownItems[i].parentElement.querySelectorAll(".mainSectionContainer__lessons__flexContainer__menu__subitem").length * 50;

                if (lessonsDropDownItems[i].parentElement.querySelector(".mainSectionContainer__lessons__flexContainer__menu__item_active .mainSectionContainer__lessons__flexContainer__submenu") != null) {
                    lessonsDropDownItems[i].parentElement.querySelector(".mainSectionContainer__lessons__flexContainer__menu__item_active .mainSectionContainer__lessons__flexContainer__submenu")
                    .style.height = blockHeightSubmenu + "px";
                } else {
                    lessonsDropDownItems[i].parentElement.querySelector(".mainSectionContainer__lessons__flexContainer__submenu")
                    .style.height = 0 + "px";
                }        
            }
        }
        lessonsDropDownItems[this.lessonNumber].onclick();

        let lessonObj = this;

        document.querySelectorAll(".mainSectionContainer__lessons__flexContainer__submenu").forEach((item, itemInd) => {
            let itemIndex = itemInd;
            item.querySelectorAll(".mainSectionContainer__lessons__flexContainer__menu__subitem__text").forEach((subItem, subitemInd) => {
                subItem.addEventListener("click", function() {
                    lessonObj.partLessonNumber = subitemInd;
                    lessonObj.lessonNumber = itemIndex;
                    lessonObj.switchLesson();
                    lessonCompleted.showKeyboardContainer();
                    
                    debug.log(2, "currentPartLesson is " + lessonObj.partLessonNumber);
                    debug.log(2, "currentLesson is " + lessonObj.lessonNumber);
                });
            });
        });
        this.switchLesson();
    }
    DOMLessonsAnimationTilt() {
        $('.mainSectionContainer__lessons__flexContainer__menu__item').tilt({
            glare: true,
            maxGlare: 0.05,
            scale: 1.05,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            maxTilt: 15,
        })
        
        $('.mainSectionContainer__lessons__flexContainer__menu__subitem').tilt({
            glare: true,
            maxGlare: 0.05,
            easing: "cubic-bezier(.03,.98,.52,.99)",
        })
    }
    switchLesson() {
        localStorage.setItem("currentLesson", this.lessonNumber);
        localStorage.setItem("currentLessonPart", this.partLessonNumber);
        console.log(this.lessonNumber + ' ' + this.partLessonNumber);
        document.querySelectorAll(".mainSectionContainer__lessons__flexContainer__menu__subitem__active").forEach((el) => {
            el.classList.toggle("mainSectionContainer__lessons__flexContainer__menu__subitem__active");
        });
        
        let currentLesson_subItem = document.querySelectorAll(".mainSectionContainer__lessons__flexContainer__submenu")[this.lessonNumber].querySelectorAll(".mainSectionContainer__lessons__flexContainer__menu__subitem__text")[this.partLessonNumber];
        currentLesson_subItem.classList.toggle("mainSectionContainer__lessons__flexContainer__menu__subitem__active");
        this.loadLesson();
    }
    loadPreviousLesson() {

        if (this.partLessonNumber > 0) {
            this.partLessonNumber--;
        } else {
            if (this.lessonNumber > 0) {
                this.lessonNumber--;
                this.partLessonNumber = this.getCountOfSubLessons();
            } else {
                return;
            }
        }
        this.switchLesson();
    }
    getCountOfSubLessons() {
        return Object.values(this.lessonsConfig[Object.keys(this.lessonsConfig)[this.lessonNumber].toString()]).length - 2;
    }
    getCountOfLessons() {
        return Object.keys(this.lessonsConfig).length - 1;
    }
    loadNextLesson() {
        let countOfSubLessons = this.getCountOfSubLessons();
        let countOfLessons = this.getCountOfLessons();
        if (this.partLessonNumber < countOfSubLessons) {
            this.partLessonNumber++;
        } else {
            if (this.lessonNumber < countOfLessons) {
                this.lessonNumber++;
                this.partLessonNumber = 0;
            } else {
                return;
            }
        }
        this.switchLesson();
    }

    restartLesson() {
        this.switchLesson();
    }
};

class LessonCompletion {
    constructor() {
        this.newChart = null;
    }

    getDOM() {
        this.keyboardSectionDOM = document.querySelector(".mainSectionContainer__keyboard");
        this.lessonResultDOM = document.querySelector(".mainSectionContainer__result");
        this.timeDOM = document.querySelector(".result__info__time span");
        this.cpsDOM = document.querySelector(".result__info__cps span");
        this.wpsDOM = document.querySelector(".result__info__wps span");
        this.accuracyDOM = document.querySelector(".result__info__accuracyColored");
        this.diagramDOM = document.querySelector(".result__diagram");
    }

    showResultContainer() {
        this.keyboardSectionDOM.style.display = "none";
        this.lessonResultDOM.style.display = "block";
    }

    showKeyboardContainer() {
        this.keyboardSectionDOM.style.display = "block";
        this.lessonResultDOM.style.display = "none";
    }

    endOfTheLesson() {
        console.log(keyboardControll.getRightCharacters());
        console.log(keyboardControll.getWrongCharacters());
        stopwatch.timerStop();
        this.getDOM();
        this.chartDestroy();
        this.resultContainerInsertData();
        this.showResultContainer();
        console.log("hi from Lesson Completion");
    }

    resultContainerInsertData() {
        this.timeDOM.innerHTML = stopwatch.getTimerData();
        this.cpsDOM.innerHTML = this.getCpm();
        this.wpsDOM.innerHTML = this.getWpm();
        let accuracy = this.getAccuracy();
        let accuracy_color;
        if (accuracy > 75) accuracy_color = "rgba(125, 168, 71, 1)";
        else if (accuracy >= 50) accuracy_color = "rgba(217, 124, 72, 1)";
        else accuracy_color = "rgba(219, 90, 90, 1)";
        document.querySelector(".result__info__accuracyColored").style.color = accuracy_color;
        this.accuracyDOM.innerHTML = this.getAccuracy() + "%";
        stopwatch.timerReset();
        this.chartRender();
    }

    getCpm() {
        return Math.trunc(keyboardControll.getAllText().length / (+stopwatch.getTimerSeconds() / 60)).toString();
    }

    getWpm() {
        return Math.trunc(keyboardLesson.getCountOfWords() / (+stopwatch.getTimerSeconds() / 60)).toString();
    }

    getChartData() {
        return {
            labels: this.getChartLabels(),
            datasets: [{
                label: "Ratio wrong to right typed characters",
                data: [keyboardControll.getRightCharacters().length, keyboardControll.getWrongCharacters().length],
                backgroundColor: ["rgba(98, 211, 116, 0.8)", "rgba(201, 96, 96, 0.8)"],
                borderColor: ["white"],
                borderWidth: 1,
            }]
        };
    }
    

    chartDestroy() {
        this.diagramDOM.innerHTML = "";
        if (this.newChart != null && this.newChart != undefined) this.newChart = null;
    }

    chartRender() {
        console.log("chartRender called");
        let canvas = document.createElement("canvas");
        canvas.id = "lessonResultChart";
        this.diagramDOM.appendChild(canvas);
        const ctx = document.getElementById(canvas.id).getContext('2d');
        this.newChart = new Chart(ctx, {type: "doughnut", data: this.getChartData()});
        
    }

    getChartLabels() {
        if (mainSettings.nativeLan == "RU") return ["Правильные буквы", "Ошибки"];
        else return ["Right characters", "Wrong characters"];
    }

    getChartFontColor() {
        let theme = localStorage.getItem("theme");
        console.log("currernt theme is " + theme);
        if (theme == 'dark') {
            return ["white"];
        } else {
            return ["#747474"];
        }
    }

    
    getAccuracy() {
        return Math.trunc((keyboardControll.getRightCharacters().length / keyboardControll.getAllText().length) * 100).toString();
    }
};

/*{
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
}*/
