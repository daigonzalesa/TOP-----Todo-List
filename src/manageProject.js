export default class ManageProjects  {
    constructor () {
        this.listProjects=[];
    }
    
    getListProjects() {
        return this.listProjects;
    }
    
    addProject(newProject) {
        this.listProjects.push(newProject);
    }

     deleteProject(projectId) {
        this.listProjects = this.listProjects.filter (project => project.ID !== projectId )
    }
}   
