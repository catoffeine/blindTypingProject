class Lesson {
    constructor(currentLesson, currentPartLesson) {
        // this.lessonID = lesson;
        this.lesson = currentLesson;
        this.partLesson = currentPartLesson;

        this.currentPart = 0;
        this.lessonArray = [];
        this.loadLesson();
    }
    showLesson() {
        console.log(this.lesson);
        console.log(this.partLesson);
        console.log(this.lessonArray);
    }
    loadLesson() {
        // console.log(this.lesson);
        // console.log(Object.keys(lessons[(Object.keys(lessons)[this.lesson]).toString()]));
        this.lessonArray = Object.keys(lessons[Object.keys(lessons)[this.lesson].toString()])[this.partLesson];
    }
};
