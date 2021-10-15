export default class Form {
  constructor(root) {
    root.innerHTML = Form.view();
    this.hour = 0;
    this.minute = 0;
    this.el = {
      form: root.querySelector(".container__dataInput"),
      textTask: root.querySelector(".header form input[type='text']"),
      submit: root.querySelector(".container__dataInput .btn"),
      picker: root.querySelector(".time-picker"),
      hr: root.querySelector(".time-picker .hour .hr"),
      min: root.querySelector(".time-picker .minute .min"),
      hr_up: root.querySelector(".time-picker .hour .hr-up"),
      hr_down: root.querySelector(".time-picker .hour .hr-down"),
      min_up: root.querySelector(".time-picker .minute .min-up"),
      min_down: root.querySelector(".time-picker .minute .min-down"),
    };
    this.el.hr_up.addEventListener("click", this.hour_up.bind(this));
    this.el.hr_down.addEventListener("click", this.hour_down.bind(this));

    this.el.min_up.addEventListener("click", this.minute_up.bind(this));
    this.el.min_down.addEventListener("click", this.minute_down.bind(this));

    this.el.hr.addEventListener("change", this.hour_change.bind(this));
    this.el.min.addEventListener("change", this.minute_change.bind(this)); 
  }

  bindAddTask(handler) {
    this.el.form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.el.textTask.value) {
        handler(this.el.textTask.value,  this.getTime());
        this.el.textTask.value =''
      }
    });
  }
  hour_change({ target }) {
    if (target.value > 99) target.value = 99;
    if (target.value < 0) target.value = "00";
    if (target.value == "") target.value = this.formatTime(this.hour);
    this.hour = target.value;
    this.setTime();
  }

  minute_change({ target }) {
    console.log(target.value)
    if (target.value > 59) target.value = 59;
    if (target.value < 0) target.value = "00";
    if (target.value == "") target.value = this.formatTime(this.minute);
    this.minute = target.value;
    this.setTime();
  }
  hour_up() {
    this.hour++;
    if (this.hour > 99) this.hour = 0;
    this.setTime();
  }
  hour_down() {
    this.hour--;
    if (this.hour < 0) this.hour = 99;
    this.setTime();
  }

  minute_up() {
    this.minute++;
    if (this.minute > 59) {
      this.minute = 0;
      this.hour++;
    }
    this.setTime();
  }
  minute_down() {
    this.minute--;
    if (this.minute <= 0) {
      this.minute = 59;
      if(this.hour > 0)this.hour--;
    }
    this.setTime();
  }
  getTime() {
    const time =  this.el.picker.dataset.time.toString().split(":");
     let h = parseInt(time[0]),
      m = parseInt(time[1]);
    return {
      hours: h,
      minutes: m,
    }; 
  }
  setTime() {
    this.el.hr.value = this.formatTime(this.hour);
    this.el.min.value = this.formatTime(this.minute);
    this.el.picker.dataset.time = this.formatTime(this.hour) + ":" + this.formatTime(this.minute);
  }
  formatTime(time) {
    return time.toString().padStart(2, "0");
  }
  static view() {
    return `
      <form action="#" class="container__dataInput">
      <input type="text" placeholder="add a new task" />
      <div class="time-picker" data-time="00:00">
        <div class="hour">
          <span class="container__arrow"> <i class="arrow up hr-up"></i></span>
          <input type="number" class="hr" value="00" />
          <span class="container__arrow">
            <i class="arrow down hr-down"></i
          ></span>
        </div>
        <span>:</span>
        <div class="minute">
          <span class="container__arrow"> <i class="arrow up min-up"></i></span>
          <input type="number" class="min" value="00" />
          <span class="container__arrow">
            <i class="arrow down min-down"></i
          ></span>
        </div>
      </div>
      <button type="submit" class="btn">ADD</button>
      </form>
          `;
  }
}
