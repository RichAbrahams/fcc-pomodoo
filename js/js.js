document.addEventListener('DOMContentLoaded', function() {

  var countdown = "";
  var gong = 'https://drive.google.com/uc?export=download&id=0B6HE04GYlRT6Q1hOdWJVTWkzSUU';
  var gogong = new Audio(gong);

  var Timer = function() {
    this.TimerOn = false;
    this.work = 60;
    this.rest = 60;
    this.counter = 60;
    this.phase = false;
    this.inc = function(timer) {
      this[timer] + 300 <= 3600 ? this[timer] += 60 : this[timer] = 3600;
    };
    this.dec = function(timer) {
      this[timer] - 60 >= 60 ? this[timer] -= 60 : this[timer] = 60;
    };
    this.minutes = function(timer) {
      return Math.floor(this[timer] / 60);
    };
    this.seconds = function(timer) {
      return this[timer] - (this.minutes(timer) * 60);
    };
    this.renderTime = function(timer) {
      return this.formatTime(String(this.minutes(timer))) + ':' + this.formatTime(String(this.seconds(timer)));
    };
    this.formatTime = function(timeInput) {
      if (timeInput.length < 2) {
        timeOutput = '0' + timeInput;
      } else {
        timeOutput = timeInput;
      }
      return timeOutput;
    };
    this.toggleTimer = function() {
      this.TimerOn = !this.TimerOn;
    };
    this.togglePhase = function() {
      this.phase = !this.phase;
    };
  };

  function flipDisplay() {
    MainTimer.togglePhase();
    if (MainTimer.phase) {
      MainTimer.counter = MainTimer.rest;
    } else {
      MainTimer.counter = MainTimer.work;
    }
    document.querySelector('.active').removeAttribute("style");
    document.querySelector('.greenTomatoCont').classList.toggle('active');
    document.querySelector('.redTomatoCont').classList.toggle('active');
    document.querySelector('.active').style.transition = "height " + (MainTimer.counter / 100) * 134 + "s linear";
    document.querySelector('.active').style.height = "0px";
  }

  function startCountdown() {
    countdown = setInterval(function() {
      if (MainTimer.counter >= 0) {
        document.querySelector('.mainTimerText').innerHTML = MainTimer.renderTime('counter');
        MainTimer.counter--;
        if (MainTimer.counter < 5) {
          gogong.play();
        }
      } else {
        flipDisplay();
      }
    }, 1000);
  }

  MainTimer = new Timer();

  workPlus.addEventListener('click', function() {
    MainTimer.inc('work');
    document.querySelector('.workTimerText').innerHTML = MainTimer.renderTime('work');
  });
  workMinus.addEventListener('click', function() {
    MainTimer.dec('work');
    document.querySelector('.workTimerText').innerHTML = MainTimer.renderTime('work');
  });
  restPlus.addEventListener('click', function() {
    MainTimer.inc('rest');
    document.querySelector('.restTimerText').innerHTML = MainTimer.renderTime('rest');
  });
  restMinus.addEventListener('click', function() {
    MainTimer.dec('rest');
    document.querySelector('.restTimerText').innerHTML = MainTimer.renderTime('rest');
  });

  document.querySelector('.start').addEventListener('click', function() {
    if (MainTimer.TimerOn === false) {
      MainTimer.toggleTimer();
      MainTimer.counter = MainTimer.work;
      document.querySelector('.timerOuter').classList.remove('timerOuterBefore');
      document.querySelector('.timerOuter').classList.add('timerOuterAfter');
      document.querySelector('.active').style.transition = "height " + (MainTimer.counter / 100) * 134 + "s linear";
      document.querySelector('.active').style.height = "0px";
      startCountdown();
    } else {
      clearInterval(countdown);
      MainTimer.toggleTimer();
      MainTimer.counter = MainTimer.work;
      document.querySelector('.timerOuter').classList.remove('timerOuterAfter');
      document.querySelector('.timerOuter').classList.add('timerOuterBefore');

      document.querySelector('.mainTimerText').innerHTML = "Start";
      document.querySelector('.active').removeAttribute("style");
      document.querySelector('.redTomatoCont').classList.remove('active');
      document.querySelector('.greenTomatoCont').classList.add('active');
    }
  });

}, false);
