import { useState, type FormEvent } from "react";

interface Props {
  addTodo: (title: string, priority: string, dueDate: string) => void;
}

function TodoForm({ addTodo }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo(title, priority, dueDate);
    setTitle("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Enter Todo...."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-3 rounded"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full border p-3 rounded"
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full border p-3 rounded"
      />

      <button
        className="w-full bg-blue-600 text-white 
              p-3 rounded"
      >
        Add Todo
      </button>
    </form>
  );
}
export default TodoForm;
