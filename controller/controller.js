export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.form.bindAddTask(this.handlerAddTask);
    this.model.bindDataChanges(this.updateViewList);
    this.view.bindViewChanges({
      delete: this.handlerDeleteTasks,
      update: this.handlerUpdateTask,
    });
  }
  handlerAddTask = (text, time) => {
    this.model.add(text, time);
  };
  handlerDeleteTasks = (id) => {
    this.model.delete(id);
  };
  handlerUpdateTask = (data) => {
    this.model.update(data);
  };

  updateViewList = (todos) => {
    this.view.displayTodos(this.view.List.todo, todos);
  };
  data() {
    console.log("this is colled now");
  }
}
