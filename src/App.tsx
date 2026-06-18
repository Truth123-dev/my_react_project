import { useState } from "react";
import TodoForm from "./components/TodoForm";
import SearchBar from "./components/SearchBar";
import StatsCard from "./components/StatsCard";
import ThemeToggle from "./components/ThemeToggle";

import type { Todo } from "./types/Todo";
import useLocalStorage from "./hooks/useLocalStorage";

import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("All");

 

  // Add Todo
  const addTodo = (title: string, priority: string, dueDate: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      priority,
      completed: false,
      dueDate: new Date(dueDate),
    };

    setTodos([...todos, newTodo]);
    toast.success("Todo added successfully!");
  };

  // Add Edit State
  const [ editId , setEditId ] = useState<number | null>(null);
  const [ editText , setEditText ] = useState ("");

  const startEdit = (id: number, title: string) => {
    setEditId(id);
    setEditText(title);
  };

  const updateTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: editText,
            }
          : todo,
      ),
    );
    setEditId(null);
    setEditText("");
    toast.success("Todo updated");
  };


  




  // Delete Todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));

    toast.error("Todo deleted successfully!");
  };

  // Complete Todo
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      ),
    );
  };

  // Filter Todos
  const filteredTodos = todos.filter((todo) => {
    const searchMatch = todo.title.toLowerCase().includes(search.toLowerCase());

    if (filter === "completed") {
      return searchMatch && todo.completed;
    }

    if (filter === "pending") {
      return searchMatch && !todo.completed;
    }

    return searchMatch;
  });

  const completed = todos.filter((todo) => todo.completed).length;

  const pending = todos.length - completed;

  return (
    <div
      className={`min-h-screen p-5 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <div className="max-w-3xl mx-auto space-y-3">
        <ThemeToggle
          darkMode={darkMode}
          toggleTheme={() => setDarkMode(!darkMode)}
        />

        <h1 className="text-4xl font-bold text-center">
          Proffessional Word Todo App
        </h1>

        <StatsCard
          total={todos.length}
          completed={completed}
          pending={pending}
        />

        <SearchBar search={search} setSearch={setSearch} />

        <TodoForm addTodo={addTodo} />

        {/* Filter button */}
        <div className="flex gap-3">
          <button
            onClick={() => setFilter("completed")}
            className="bg-green-500 text-white 
                   px-3 py-2"
          >
            Completed
          </button>

          <button
            onClick={() => setFilter("pending")}
            className="bg-red-500 text-white 
                   px-3 py-2"
          >
            Pending
          </button>
        </div>

        {/* Todo LIST */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center text-gray-500">No Todo Found</div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white text-black rounded
                                p-4 shadow flex justify-between
                                 items-center"
              >
                <div>
                  {editId === todo.id ? (
                    <div className="flex gap-2 items-center">
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="border p-2 rounded"
                      />
                      <button
                        onClick={() => updateTodo(todo.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-300 px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3
                        className={`font-bold ${
                          todo.completed ? "line-through" : ""
                        }`}
                      >
                        {todo.title}
                      </h3>

                      <p>
                        Due: {String(todo.dueDate)}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className="bg-green-500 text-white
                                    p-2 rounded"
                  >
                    <FaCheck />
                  </button>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 text-white
                                    p-2 rounded"
                  >
                    <FaTrash />
                  </button>

                  <button
                    onClick={() => startEdit(todo.id, todo.title)}
                    className="bg-yellow-500 text-white p-2 rounded"
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default App;
