export default function TaskList({ tasks }) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white p-3 shadow rounded"
        >
          {task.title}
        </div>
      ))}
    </div>
  );
}