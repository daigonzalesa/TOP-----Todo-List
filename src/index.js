import CreateProject from './project.js';
import CreateTask from './task.js';

const chores= new CreateProject("myChores");
console.log(chores);

const proofTask = new CreateTask("clean my room", "clean plis", "09/23/2026", "High", false);
console.log(proofTask);