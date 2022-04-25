class Debugger {
    constructor(debug = false, debugLevel = 0) {
        this.debug = debug;
        this.debugLevel = debugLevel;
    }
    log(level, message) {
        if (!this.debug) return;
        if (level === this.debugLevel) console.log(message);
    }
    setDebug(isOn) {
        this.debug == isOn;
    }
};
const debug = new Debugger(true, 0);