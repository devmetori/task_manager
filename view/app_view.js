export default class View {
  constructor(Form, Timer) {
    this.app = this.getElement("#app");
    this.app.innerHTML = View.containers();
    this.timePicker = new Form(this.app.querySelector(".header"));
    this.el = {
      header: this.app.querySelector(".header"),
      form: this.app.querySelector(".container__dataInput"),
      textTask: this.app.querySelector(
        ".container__dataInput input[type='text']"
      ),
      submit: this.app.querySelector(".container__dataInput .btn"),
      listTodo: this.app.querySelector(".container__todo--list"),
      listDoing: this.app.querySelector(".container__doing--list"),
      listDone: this.app.querySelector(".container__done--list"),
      timerContainer: this.app.querySelector(".container__doing--timer"),
      btn_startTimer: this.app.querySelector(
        ".container__doing--head .startTimer"
      ),
    };
    this.timer = new Timer(this.timePicker, this.el.timerContainer);
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }
  static containers() {
    return `
        <div class="header"></div>
        <div class="container">
          <div class="container__todo">
            <div class="container__todo--head">
              <h1 class="title">TO DO</h1>
            </div>
            <ul class="container__todo--list"></ul>
          </div>
          <div class="container__doing">
            <div class="container__doing--head">
              <h1 class="title">DOING</h1>
              <button class="startTimer">START TIMER</button>
            </div>
            <ul class="container__doing--list"></ul>
            <div class="container__doing--timer">
             
            </div>
          </div>
          <div class="container__done">
            <div class="container__done--head"><h1 class="title">DONE</h1></div>
            <ul class="container__done--list"></ul>
          </div>
        </div>
        `;
  }
}
