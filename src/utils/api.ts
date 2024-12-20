const BASE_URL = "http://localhost:3001/api/tasks";

//get all tasks
export const fetchTasks = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
};

//get a single task by id
export const fetchTaskById = async (id:number) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch task");
    return response.json();
};

//create a new task
export const createTask = async (title: string, color: string) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title,color}),
        });
    if (!response.ok) throw new Error("Failed to create task");
    return response.json();
};

//update task
export const updatedTask = async (id:number,updatedData:{title:string, color:string, completed:boolean} )=>{
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
    if (!response.ok) throw new Error("Failed to update the task");
    return response.json();
}

//delete a task
export const deleteTask = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete the task");
  };
  
//toggle task completion
export const toggleTaskCompletion = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}/toggle`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to toggle task completion");
    return response.json();
  };