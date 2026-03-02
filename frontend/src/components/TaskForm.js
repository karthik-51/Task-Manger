import { useState } from "react";
import axios from "../api/axios";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("/tasks", { title });
    setTitle("");
    refresh();
  };

  return (
    <form onSubmit={submit} className="flex gap-2 mb-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
        className="border p-2 flex-1"
      />
      <button className="bg-green-500 text-white px-4">
        Add
      </button>
    </form>
  );
}