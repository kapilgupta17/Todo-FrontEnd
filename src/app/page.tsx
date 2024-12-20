"use client";

import TaskCard from "@/components/TaskCard";
import { useState,useEffect } from "react";
import { fetchTasks } from "@/utils/api";
import { Task } from "@/utils/types";
import Image from "next/image";
import ClipboardImage from "../images/Clipboard.png";
import RocketImg from "../images/rocket.png";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch all tasks from backend
    fetchTasks().then((data) => setTasks(data));
  }, []);

  
  const completedCount = tasks.filter((task) => task.completed).length;
  
  return (
    <>
    
    <header className="text-center bg-black h-[20vh] flex justify-center items-center px-10">
      <Image src={RocketImg} alt="Rocket" className="pr-1 w-6 h-7" />
      <h1 className="text-4xl font-bold">
        <span className="text-[#4EA8DE]">Todo</span> 
        <span className="text-[#5E60CE]">App</span>
      </h1>
    </header>
    <div className="h-screen mt-0 ">
        <main className="flex-1 h-screen justify-between items-center space-y-20 bg-[#1a1a1a] text-white  w-3/5 mx-auto">

              <button className="bg-[#1E6F9F] text-white w-4/5 px-4 py-4 rounded mt-4 mx-auto block mt-0" onClick={() => (window.location.href = "/task/new")}>
                  Create Task +
              </button>

              <section>
              <div className="flex justify-between w-full mb-4">
                    <div>
                      <span className="text-[#4EA8DE]">Tasks  </span>
                      <span className="bg-gray-800 text-white rounded-full w-6 h-6 inline-flex items-center justify-center">{tasks.length}</span>
                    </div>
                    <div>
                      <span className="text-[#5E60CE]">Completed  </span>
                      <span className="bg-gray-800 text-white rounded-lg w-12 h-6  inline-flex items-center justify-center">{completedCount} of {tasks.length}</span>
                    </div>
              </div>

                {tasks.length ? (
                  tasks.map((task) => (
                    <TaskCard key={task.id} task={task} setTasks={setTasks} />
                  ))
                ) : (
                  <>
                  <div className="mt-6 pt-40 rounded-t-xl border-t border-gray-400 flex flex-col items-center justify-center">
                          <Image src={ClipboardImage} alt="Clipboard" className="mb-4" />
                          <p className="text-center text-[#808080]">
                                <strong>You don't have any tasks registered yet.</strong><br /><br />
                                      Create tasks and organize your to-do items.
                          </p>
                  </div>
                  </>                  
                )}

              </section>

              </main>
    </div>
    
    </>
    
   
  );
}
