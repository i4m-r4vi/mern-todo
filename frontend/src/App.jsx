import React, { useEffect, useState } from "react";
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/tasks`;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data.tasks);
  };

  const addTask = async () => {
    if (!text.trim()) return;
    await axios.post(API, { text });
    setText("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex h-screen">
      
      {/* LEFT PANEL */}
      <div className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        
        <div className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl w-[90vw] md:w-[50vw] shadow-xl">
          
          <div className="text-2xl mb-4 font-bold">TODO List✨</div>

          {/* INPUT */}
          <div className="flex gap-2 mb-4">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white outline-none"
            />
            <button
              onClick={addTask}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            >
              Add
            </button>
          </div>

          {/* TASK LIST */}
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="flex justify-between items-center bg-gray-200 px-3 py-2 rounded-lg"
              >
                <span className="text-gray-700">{task.text}</span>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-pink-500 hover:scale-110 transition"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          {tasks.length === 0 && (
            <p className="text-center text-gray-400 mt-3">
              No tasks yet 🚀
            </p>
          )}
        </div>
      </div>

      {/* RIGHT EMPTY AREA */}
      <div className="flex-1" />
    </div>
  );
}