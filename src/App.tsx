import { useState, useEffect } from 'react';

type Task = {
  id: number;
  text: string;
  done: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  function toggleTask(id: number) {
  setTasks(tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  ));
}

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleAdd() {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput('');
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Task Tracker</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`py-1 cursor-pointer ${task.done ? 'line-through text-gray-400' : ''}`}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;