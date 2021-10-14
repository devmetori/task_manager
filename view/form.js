export default class Form {
    constructor(root) {
      root.innerHTML = Form.view();
      this.hour = 0;
      this.minute = 0;
      this.el = {
        picker: root.querySelector(".time-picker"),
        hr: root.querySelector(".time-picker .hour .hr"),
        min: root.querySelector(".time-picker .minute .min"),
        hr_up: root.querySelector(".time-picker .hour .hr-up"),
        hr_down: root.querySelector(".time-picker .hour .hr-down"),
        min_up: root.querySelector(".time-picker .minute .min-up"),
        min_down: root.querySelector(".time-picker .minute .min-down"),
      };
    
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
  