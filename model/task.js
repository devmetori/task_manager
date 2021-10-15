export default class Task {
    constructor() {
      this.todos = [];
     
    }
    bindDataChanges(callback) {
      this.emit = callback;
    }
  
    notify(todos) {
      this.emit(todos);
    }
    add(text, time) {
      const todo = {
        id:
          this.todos.length > 0
            ? this.todos.reduce((prev, current) =>
                prev.id > current.id ? prev : current
              ).id + 1
            : 1,
  
        title: text,
        time: time,
        progress: 0,
        completed: false,
      };
      this.todos.unshift(todo);  
      this.notify(this.todos);
    }
    update(data){
      const todos = this.todos.map((todo) =>
      todo.id === data.id
        ? {
            id: todo.id,
            title: "title" in data ? data.title : todo.title,
            time: todo.time,
            progress: todo.progress,
            completed: "completed" in data ? data.completed : todo.completed,
          }
        : todo
    );
    this.todos.splice(0, this.todos.length, ...todos);
    this.notify(this.todos);
    }
    delete(id){
      const index = this.todos.findIndex((todo) => todo.id == id);
      if (index != -1) this.todos.splice(index, 1);
      this.notify(this.todos);
    }
  }