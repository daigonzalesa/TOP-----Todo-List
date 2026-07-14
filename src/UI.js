import MyProject from './project.js';
import CreateTask from './task.js';
import ManageProjects from './manageProject.js';


const projectPanel=document.querySelector("#project-panel");
const taskPanel=document.querySelector("#task-panel");
const newProjectBtn=document.querySelector("#project-btn");
const createProjectBtn=document.querySelector("#submit-project-btn");
const createTaskBtn=document.querySelector("#submit-task-btn");
const projectForm=document.querySelector("#project-form");
const taskForm=document.querySelector("#task-form");
const newTaskBtn=document.querySelector("#task-btn");
const closeBtn=document.querySelectorAll(".close-btn");

const manager= new ManageProjects();
let currentProject=null;

//show project modal
newProjectBtn.addEventListener('click', () => {
    document.getElementById('project-modal').showModal();

});
//show task modal
newTaskBtn.addEventListener('click', () => {
    document.getElementById('task-modal').showModal();

});
//close any modal is open
closeBtn.forEach ((button) => {
    button.addEventListener('click', (e) => {
        e.target.closest('dialog').close();
        projectForm.reset();

})
});
//creates new project and add its to manager list
projectForm.addEventListener('submit',() => {

    const projectName=document.getElementById("project-name").value;
    const project=new MyProject(projectName);
    manager.addProject(project);
    displayProject(project);

    projectForm.reset();
});
//creates new Task and add it to respective project
taskForm.addEventListener('submit', () => {
    
    const taskTitle=document.getElementById("task-name").value;
    const taskDespcription=document.getElementById("task-description").value;
    const dueDate=document.getElementById("date").value;
    const priority=document.getElementById("priority").value;

    const task=new CreateTask(taskTitle,taskDespcription,dueDate,priority);  
    /*currentProject.addTask(task);*/
    displayTask(task);

});
//display project in project-panel
function displayProject(project) {
   
    const projectDiv=document.createElement("button");
    projectDiv.textContent=project.nameProject;
    projectDiv.classList.add("project-card");
    projectPanel.appendChild(projectDiv);

    projectDiv.addEventListener('click', () => {
        currentProject=project;
    })

};
//dislpally task to task panel
function displayTask(task) {
    const taskDiv=document.createElement("div");
    taskDiv.textContent=task.task;

    taskPanel.appendChild(taskDiv);

}
