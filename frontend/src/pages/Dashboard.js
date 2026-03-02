import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Pagination from "../components/Pagination";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTasks = async () => {
    const res = await axios.get(`/tasks?page=${page}`);
    setTasks(res.data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <TaskForm refresh={fetchTasks} />
        <TaskList tasks={tasks} />
        <Pagination page={page} setPage={setPage} />
      </div>
    </>
  );
}