import Controller from "./controller/controller.js";
import View from "./view/app_view.js";
import Task from "./model/task.js";
import form from "./view/form.js";
import Timer from "./view/timer.js";


const app = new Controller(new Task(), new View(form,Timer));