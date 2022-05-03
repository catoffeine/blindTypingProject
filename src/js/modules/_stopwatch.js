class StopWatch {
    constructor() {
        this.hours = 0;
        this.min = 0;
        this.sec = 0;
        this.stoptime = true;
        this.timerData = "";
    }
    timerStart() {
        if (this.stoptime) {
            this.stoptime = false;
            // let timerCycleFunc = this.timerCycle();
            this.timerCycle();
            // setTimeout("timerCycleFunc", 1000);
        }
        console.log("timerStart");
    }

    timerStop() {
        if (!this.stoptime) {
            this.stoptime = true;
        }
        console.log("timerStop");
    }

    timerReset() {
        this.hours = 0;
        this.min = 0;
        this.sec = 0;
    }

    timerCycle() {
        if (this.stoptime) return;

        this.sec = parseInt(this.sec);
        this.min = parseInt(this.min);
        this.hours = parseInt(this.hours);
    
        this.sec++;
    
        if (this.sec == 60) {
          this.min++;
          this.sec = 0;
        }
        if (this.min == 60) {
          this.hours++;
          this.min = 0;
          this.sec = 0;
        }
    
        if (this.sec < 10 || this.sec == 0) {
          this.sec = '0' + this.sec;
        }
        if (this.min < 10 || this.min == 0) {
          this.min = '0' + this.min;
        }

        if (this.hours == 0) {
            this.timerData = this.min + ':' + this.sec;
        } else {
            this.timerData = this.hours + ':' + this.min + ':' + this.sec;
        }
        setTimeout(() => {
            this.timerCycle();
        }, 1000);
        
    }
    getTimerSeconds() {
        return +this.hours * 60 * 60 + +this.min * 60 + +this.sec;
    }
    getTimerData() {
        return this.timerData;
    }
};