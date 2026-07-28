import MyProject from './project.js';
import CreateTask from './task.js';
import ManageProjects from './manageProject.js';


const projectDisplay=document.querySelector("#projects-view");
const taskPanel=document.querySelector("#task-panel");
const taskBox=document.querySelector("#task-manager");
const newProjectBtn=document.querySelector("#project-btn");
const projectForm=document.querySelector("#project-form");
const taskForm=document.querySelector("#task-form");
const newTaskBtn=document.querySelector("#task-btn");
const closeBtn=document.querySelectorAll(".close-btn");
const dateBtn=document.querySelector("#date-btn");
const priorityBtn=document.querySelector("#priority-btn");
const deleteBtn=document.querySelector("#clear-btn");


const manager= new ManageProjects();
let currentProject=null;

//show project modal
newProjectBtn.addEventListener('click', () => {
    document.getElementById('project-modal').showModal();

});
//show task modal
newTaskBtn.addEventListener('click', () => {

    if (currentProject==null) 
        {
        alert ('please add a project before!')
        } else 
            {
        document.getElementById('task-modal').showModal();
        } ; 

    });
//close any modal is open
closeBtn.forEach ((button) => {
    button.addEventListener('click', (e) => {
        e.target.closest('dialog').close();
        projectForm.reset();
        taskForm.reset();

})
});
dateBtn.addEventListener('click', () => {
    sortByDate();
});
priorityBtn.addEventListener('click', () => {
    sortyByPriority();
});
deleteBtn.addEventListener('click', () => {
    deleteCompleted();
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
    currentProject.addTask(task);
    displayTask();
    taskForm.reset();

});
//display project in project-panel
function displayProject(project) {
   
    const projectDiv=document.createElement("div");
    projectDiv.textContent=project.nameProject;
    projectDiv.classList.add("project-card");
    projectDisplay.appendChild(projectDiv);

    const deleteProjectBtn=document.createElement("button");
    deleteProjectBtn.classList.add("delete-btn");
    deleteProjectBtn.textContent = '🗑️';
    projectDiv.appendChild(deleteProjectBtn);


    projectDiv.addEventListener('click', () => {
        taskBox.innerHTML='';
        currentProject=project;
        displayTask();
    })
    //deletes the project from manager and DOM
    deleteProjectBtn.addEventListener ('click', (e) => {
        e.stopPropagation();
        removeProject(project,projectDiv);
        if (project === currentProject) {
        taskBox.innerHTML = '';
        currentProject = null;
        };
    })


};
//dislpally task to task panel
function displayTask() {

    const projectTasks=currentProject.getListTasks();
    document.getElementById('current-project-title').textContent = `Project: ${currentProject.nameProject}`;
    taskBox.innerHTML='';

    projectTasks.forEach((task) => 
        {
            

            const taskDiv=document.createElement("div");
            taskDiv.classList.add("task-card");
            const taskLeft=document.createElement("div");
            taskLeft.classList.add("task-left")
            const taskRight=document.createElement("div");
            taskRight.classList.add("task-right");

            taskDiv.appendChild(taskLeft);
            taskDiv.appendChild(taskRight);

            const taskTitle=document.createElement("p");
            taskTitle.textContent=task.task;
            taskTitle.classList.add("task-title");
            taskLeft.appendChild(taskTitle);

            const taskDate=document.createElement("div");
            taskDate.textContent=`Due On: ${task.dueDate}`;
            taskDate.classList.add("task-date");
            taskLeft.appendChild(taskDate);

            switch (task.priority) 
            {
            case "High":
                taskDiv.classList.add("high")
                break;
            case "Medium":
                taskDiv.classList.add("medium")
                break;
            case "Low":
                taskDiv.classList.add("low")
                break;
            };

            const completedCheck=document.createElement("input");
            completedCheck.type="checkbox";
            completedCheck.checked=task.completed;
            taskRight.appendChild(completedCheck);

            if (task.completed) {
                completedCheck.classList.add('completed');
                taskDiv.classList.add('is-completed');
            }


            const deleteTaskBtn=document.createElement("button");
            deleteTaskBtn.classList.add("delete-btn");
            deleteTaskBtn.textContent = '🗑️';
            taskRight.appendChild(deleteTaskBtn);

            completedCheck.addEventListener('change', () => {
                changeBtnStatus(task.ID);

            });

            deleteTaskBtn.addEventListener ('click', (e) => {
            e.stopPropagation();
            removeTask(task,taskDiv);
    
            });


            taskBox.appendChild(taskDiv);

        });

};
//change completed status btn
function changeBtnStatus(taskID) {
    const taskList=currentProject.getListTasks();
    const currentTask=taskList.find(item => item.ID === taskID);
    currentTask.completed=!currentTask.completed;
    displayTask();
};


//delete project from DOM and manager
function removeProject(project, projectDiv) {
    manager.deleteProject(project.ID);
    projectDiv.remove();
}

//delete task form DOM and project
function removeTask(task, taskDiv) {
    currentProject.deleteTask(task.ID);
    taskDiv.remove();
}

function sortByDate() {
    currentProject.getListTasks().sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
    displayTask();
}

function sortyByPriority() {
    const priorityOrder = {"High":3, "Medium":2, "Low":1};
    currentProject.getListTasks().sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    displayTask();
}

function deleteCompleted() {
    currentProject.listTasks=currentProject.listTasks.filter (task => task.completed===false);
    displayTask();
       
}