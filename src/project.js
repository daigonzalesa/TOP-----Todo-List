
export default class myProject {
    constructor (nameProject) {
        this.nameProject = nameProject;
        this.listTasks=[];
        this.ID=crypto.randomUUID();
    }

    getListTasks() {
        return this.listTasks;
    }
    
    addTask(Task) {
        this.listTasks.push(Task);
    }

    deleteTask(taskId) {
        this.listTasks = this.listTasks.filter (task => task.ID !== taskId )
    }

}

