import { toggleTaskCompletion, deleteTask, updatedTask } from "@/utils/api";
import { Task } from "@/utils/types";
import { useState } from "react";
import { TrashIcon,PencilIcon } from "@heroicons/react/16/solid";

interface TaskCardProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskCard({ task, setTasks }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedColor, setUpdatedColor] = useState(task.color);
 

  // Toggle task completion
  const handleToggle = async () => {
    try {
      await toggleTaskCompletion(task.id);
      setTasks((prevTasks) =>
        prevTasks.map((t) => t.id === task.id ? { ...t, completed: !t.completed } : t)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a task
  const handleDelete = async () => {
    try {
      if (confirm("Are you sure you want to delete it?")) {
        await deleteTask(task.id);
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Start editing mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedTitle(task.title); // Reset title to original
    setUpdatedColor(task.color); // Reset color to original
   
  };

  // Save updated task
  const handleSave = async () => {
    try {
      const updatedData = { title: updatedTitle, color: updatedColor, completed: false};
      await updatedTask(task.id, updatedData); // Call the API to update
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? { ...t, title: updatedTitle, color: updatedColor, completed: false } : t)
      );
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 flex justify-between items-center bg-[#262626] rounded mb-2">
      <div className="flex items-center">
        
        <input type="checkbox" checked={task.completed} onChange={handleToggle}
          className={`w-6 h-6 rounded-full border-2 border-[#4EA8DE] bg-transparent cursor-pointer appearance-none 
            checked:bg-[#5E60CE] checked:border-[#5E60CE] checked:after:content-['✓'] 
            checked:after:text-white checked:after:block checked:after:text-center m-2`}
        />
  
        {/* Task Title */}
        {isEditing ? (
          <>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="mr-2 p-2 rounded text-black sm:w-auto"
            />
            <div className="flex flex-wrap space-x-2">
              {["red","orange", "yellow", "green", "blue", "purple","pink"].map((color) => (
                <div
                  key={color}
                  className={`w-8 h-8 rounded-full bg-${color}-500 cursor-pointer`}
                  onClick={() => setUpdatedColor(color)}
                />
              ))}
            </div>

            <div className="flex flex-wrap space-x-2 mt-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full sm:w-auto ml-2" onClick={handleSave}>
                        Save
                    </button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2 w-full sm:w-auto" onClick={handleCancel}>
                        Cancel
                    </button>
            </div>
          </>
        ) : (
          <>
            {/* Title with line-through when completed */}
            <span className={`ml-4 text-white ${task.completed ? "line-through text-gray-500" : ""}`}> {task.title}</span>
            <button className="text-[#4EA8DE] ml-2" onClick={handleEdit}>
              <PencilIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
  
      {/* Delete Button */}
      <button className="text-gray-500" onClick={handleDelete}>
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
  
}
