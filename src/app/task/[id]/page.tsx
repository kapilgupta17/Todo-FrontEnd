// Create/Edit Task Page
"use client";
import TaskForm from '../../../components/TaskForm';
import { useRouter } from "next/router";
import { useParams } from 'next/navigation';
import RocketImg from "../../../images/rocket.png";
import Image from "next/image";

export default function TaskPage() {
  const params = useParams();
  const taskId = Array.isArray(params?.id) ? params.id[0] : params?.id || "new"; 

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
        <main className="pt-20 flex-1 h-screen justify-between items-center space-y-10 text-white  w-2/4 mx-auto">       
              <button className="text-white text-4xl" onClick={() => history.back()}>&larr;</button>
      
              <TaskForm taskId={taskId} />
        </main>
    </div>
    </>
  );
}
