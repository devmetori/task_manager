export default class Timer {
    constructor(picker, root) {
      root.innerHTML = Timer.view();
      this.timePicker = picker;
      this.el = {
        hours: root.querySelector(".timer__part--hours"),
        minutes: root.querySelector(".timer__part--minutes"),
        seconds: root.querySelector(".timer__part--seconds"),
        control: root.querySelector(".timer__btn--control"),
        reset: root.querySelector(".timer__btn--reset"),
      };

    }


    static view() {
      return `
      <div class="display">
      <span class="timer__part timer__part--hours">00</span>
      <span class="timer__part">:</span>
      <span class="timer__part timer__part--minutes">00</span>
      <span class="timer__part">:</span>
      <span class="timer__part timer__part--seconds">00</span>
    </div>
    <button type="button" class="timer__btn timer__btn--control timer__btn--start">
    <span class="material-icons">play_arrow</span>
  </button>
              `;
    }
  }
  
  