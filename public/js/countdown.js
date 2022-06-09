class CountDown {
    constructor(expiredDate, onRender, onComplete) {
        this.expiredDate = expiredDate;
        this.onRender = onRender;
        this.onComplete = onComplete;

        this.setExpiredDate();
    }

    setExpiredDate() {
        this.setTimeRemaining();
        this.timeRemaining <= 0 ?
            this.complete() :
            this.start();
    }

    setTimeRemaining() {
        // get the current time
        const currentTime = Date.now();

        // calculate the remaining time
        this.timeRemaining = this.expiredDate - currentTime;
    }

    complete() {
        if (typeof this.onComplete === "function") {
            this.onComplete();
        }
    }
    
    getTime() {
        return {
            minutes: Math.floor(this.timeRemaining / 1000 / 60) % 60,
            seconds: Math.floor(this.timeRemaining / 1000) % 60
        };
    }

    update() {
        if (typeof this.onRender === "function") {
            this.onRender(this.getTime());
        }
    }

    start() {
        // update the countdown
        this.update();

        //  setup a timer
        const intervalId = setInterval(() => {
            // update the timer  
            this.setTimeRemaining();

            if (this.timeRemaining < 0) {
                // call the callback
                this.complete();

                // clear the interval if expired
                clearInterval(intervalId);
            } else {
                this.update();
            }

        }, 1000);
    }
}