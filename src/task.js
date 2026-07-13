export default class CreateTask {
    constructor (task, description, dueDate, priority) {
        this.task = task;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.ID=crypto.randomUUID();
    }
}
