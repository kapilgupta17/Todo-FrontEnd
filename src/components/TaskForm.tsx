// TaskForm Component - Form for creating/editing tasks

import { useState, useEffect } from "react";
import { createTask, fetchTaskById, updatedTask } from "../utils/api";

interface TaskFormProps {
    taskId: string;
}

export default function TaskForm({ taskId }: TaskFormProps) {

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (taskId !== "new") {

        fetchTaskById(Number(taskId)).then((task) => {
        setTitle(task.title);
        setColor(task.color);
      });
    }
  }, [taskId]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskId === "new") {
      await createTask(title, color );
    } else {
      await updatedTask(Number(taskId), { title, color ,completed:false});
    }
    window.location.href = "/";
  };

  return (<>
    

    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
      <label className="text-[#1E6F9F] font-bold">Title</label>
      <input type="text" placeholder="Ex. Brush your teeth" value={title} onChange={(e) => setTitle(e.target.value)} 
      className="w-full p-3 mt-3 rounded bg-[#262626]" required/>
      </div>

      <div>
      <label className="text-[#1E6F9F] font-bold">Color</label>
      <div className="flex space-x-4 mt-2">
        {[
            { color: "red", bgColor: "bg-red-500" },
            { color: "orange", bgColor: "bg-orange-500" },
            { color: "yellow", bgColor: "bg-yellow-500" },
            { color: "green", bgColor: "bg-green-500" },
            { color: "blue", bgColor: "bg-blue-500" },
            { color: "purple", bgColor: "bg-purple-500" },
            { color: "pink", bgColor: "bg-pink-500" },
            { color: "brown", bgColor: "bg-brown-500" },
          ].map(({ color, bgColor }) => (
            <div key={color} className={`${bgColor} w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 
            lg:h-14 rounded-full cursor-pointer`}onClick={() => setColor(color)}/>
            )
        )}
      </div>
      </div>

      <button className=" bg-[#1E6F9F] text-white w-full px-4 py-4 rounded mt-6 mx-auto block" type="submit">
        {taskId === "new" ? "Add Task +" : "Save ✓"}
      </button>

    </form>
    </>
  );
}
