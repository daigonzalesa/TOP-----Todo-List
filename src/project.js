
export default class MyProject {
    constructor (nameProject) {
        this.nameProject = nameProject;
        this.listTasks=[];
        this.ID=crypto.randomUUID();
    }

    getListTasks() {
        return this.listTasks;
    }
    
    addTask(task) {
        this.listTasks.push(task);
    }

    deleteTask(taskId) {
        this.listTasks = this.listTasks.filter (task => task.ID !== taskId )
    }


}

