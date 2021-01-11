export const timer = {

  countdown: 3 * 60,
  interval: null,

  resetTimer: function() {
    this.countdown = 3 * 60;
  },

  startTimer: function() {
    this.interval = setInterval(function() {
      this.countdown--;
  
    })
  },

  stopTimer: function() {
    clearInterval(this.interval);
  },

  getTimerString: function() {
    return `${Math.floor(this.countdown/ 60)} : ${this.countdown % 60}`;
  }

}