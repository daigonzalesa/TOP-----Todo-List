import myProject from './project.js';
import CreateTask from './task.js';
import manageProjects from './manageProject.js';

const chores= new myProject("myChores");
console.log(chores);

const proofTask = new CreateTask("clean my room", "clean plis", "09/23/2026", "High", false);
console.log(proofTask);

const proofTask2= new CreateTask("do groceries", "in sprouts", "08/5/2026", "high");
console.log(proofTask2)

chores.addTask(proofTask);
chores.addTask(proofTask2);

console.log(chores.getListTasks());

console.log(chores.nameProject);

const manager= new manageProjects();

manager.addProject(chores);
console.log(manager.getListProjects());



