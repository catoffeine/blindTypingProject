class Lesson {
    constructor(currentLesson, currentPartLesson) {
        // this.lessonID = lesson;
        this.lessonNumber = currentLesson;
        this.partLessonNumber = currentPartLesson;

        this.currentPart = 0;
        this.lessonArray = [];
        this.loadLesson();
        this.loadSettings();
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
    loadLesson() {
        this.lesson = Object.values(lessons[Object.keys(lessons)[this.lessonNumber].toString()])[this.partLessonNumber];
        this.lessonArray = this.lesson.text;
        this.lessonSettings = this.lesson.settings;
    }
    continueLesson() {
        this.currentPart++;
    }
    loadSettings() {
        setKeyboardBacklight(this.lessonSettings.keyboardBacklight);
        setHandsVisibility(this.lessonSettings.keyboardHands);
        setKeyboardVisibility(this.lessonSettings.showKeyboard);
    }
};
