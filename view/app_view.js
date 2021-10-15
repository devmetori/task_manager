export default class View {
  constructor(Form, Timer) {
    this.app = this.getElement("#app");
    this.app.innerHTML = View.containers();
    this.form = new Form(this.app.querySelector(".header"));
    this.el = {
      form: this.app.querySelector(".container__dataInput"),
      listTodo: this.app.querySelector(".container__todo--list"),
      listDoing: this.app.querySelector(".container__doing--list"),
      listDone: this.app.querySelector(".container__done--list"),
      timerContainer: this.app.querySelector(".container__doing--timer"),
      btn_startTimer: this.app.querySelector(
        ".container__doing--head .startTimer"
      ),
    };
    this.timer = new Timer(this.el.timerContainer);
    this.AddListener(this.el.listTodo, {
      focusin: this.bindUpdateTodo.bind(this),
      focusout: this.bindUpdateTodo.bind(this),
      click: this.bindDeleteTodo.bind(this),
      change: this.bindChangeState.bind(this),
    });
  }
  bindViewChanges(callbacks){
    this.emitter = callbacks;
  }
  bindUpdateTodo({ target, type }) {
    const id = parseInt(target.parentElement.id);
    if (type === "focusin" && target.className == "editable") {
      this.text = target.innerText;
    }
    if (type === "focusout" && target.className == "editable") {
      if (this.text === target.innerText) return;
     this.emitter.update( { id: id, title: target.innerText })
    }
  
  }
  bindDeleteTodo({target}) {
    const id = parseInt(target.parentElement.id);
    if (target.className != "delete") return;
    this.emitter.delete(id)
  }
  bindChangeState(event) {
    event.preventDefault();
    const id = parseInt(event.target.parentElement.id);
    if(id) this.emitter.update( { id: id, completed: event.target.checked })

  }
  get List() {
    return {
      todo: this.el.listTodo,
      doing: this.el.listDoing,
      done: this.el.listDone,
    };
  }

  displayTodos(list, todos) {
    if (list === "undefined" || !Array.isArray(todos)) return;
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    if (todos.length === 0) {
      list.append(
        this.createElement(
          "p",
          { class: "message_not_task" },
          "You don't have any task, add some  if you want"
        )
      );
      return;
    }
    const fragment = document.createDocumentFragment();
    todos.forEach((todo) => {
      const li = this.createElement(
        "li",
        { id: todo.id, draggable: true, class: "items" },
        ""
      );
      const checkbox = this.createElement("input", { type: "checkbox" }, "");
      checkbox.checked = todo.completed;
      const span = this.createElement(
        "span",
        { contentEditable: false, class: "editable" },
        ""
      );
      todo.completed
        ? span.setAttribute("contentEditable", false)
        : span.setAttribute("contentEditable", true);
      todo.completed
        ? span.append(this.createElement("s", {}, todo.title))
        : (span.textContent = todo.title);
      const deleteButton = this.createElement(
        "span",
        { class: "delete" },
        "\u00D7"
      );
      li.append(checkbox, span, deleteButton);
      fragment.append(li);
    });
    list.append(fragment);
  }
  createElement(type, attributes, ...children) {
    const el = document.createElement(type);
    for (let key in attributes) {
      el.setAttribute(key, attributes[key]);
    }
    children.forEach((child) => {
      if (typeof child === "string") {
        el.appendChild(document.createTextNode(child));
      } else {
        el.appendChild(child);
      }
    });
    return el;
  }
  AddListener(el, obj) {
    Object.entries(obj).forEach(([event, fun]) => {
      el.addEventListener(event, fun, false);
    });
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
