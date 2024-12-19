import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import TodoCard from "../components/TodoCard";

export default function TodoPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect if user logs out
    }

    return () => {
      setTodos([]); // Cleanup todos on component unmount
    };
  }, [user, navigate]);

  const saveTodos = (updatedTodos) => {
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const addOrEditTodo = () => {
    if (!newTodo.title.trim() || !newTodo.description.trim()) return;

    if (editIndex !== null) {
      // Edit existing Todo
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = newTodo;
      saveTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // Add new Todo
      saveTodos([
        ...todos,
        {
          ...newTodo,
          timer: { hours: 0, minutes: 0, seconds: 0 },
          reminder: new Date().toISOString(),
        },
      ]);
    }

    setNewTodo({ title: "", description: "" });
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    saveTodos(updatedTodos);
  };

  const editTodo = (index) => {
    setNewTodo(todos[index]);
    setEditIndex(index);
  };

  const quickSetupDeveloper = () => {
    const developerTemplates = [
      {
        title: "Complete React Component",
        description: "Build and test a reusable TodoCard component.",
        timer: { hours: 1, minutes: 30, seconds: 0 },
        reminder: new Date().toISOString(),
      },
      {
        title: "Optimize State Management",
        description: "Implement context for better state handling.",
        timer: { hours: 2, minutes: 0, seconds: 0 },
        reminder: new Date().toISOString(),
      },
      {
        title: "Fix Authentication Bugs",
        description: "Debug login and signup workflows.",
        timer: { hours: 0, minutes: 45, seconds: 0 },
        reminder: new Date().toISOString(),
      },
    ];
    saveTodos([...todos, ...developerTemplates]);
  };

  return (
    <div className="container mt-5">
      <h1>Todo List</h1>
      <div className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) =>
              setNewTodo({ ...newTodo, title: e.target.value })
            }
            className="form-control mb-2"
          />
          <textarea
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
            className="form-control"
          />
        </div>
        <button className="btn btn-success me-2" onClick={addOrEditTodo}>
          {editIndex !== null ? "Update Todo" : "Add Todo"}
        </button>
        <button className="btn btn-primary" onClick={quickSetupDeveloper}>
          Quick Setup: Software Developer
        </button>
      </div>
      {todos.map((todo, index) => (
        <TodoCard
          key={index}
          todo={todo}
          onEdit={() => editTodo(index)}
          onDelete={() => deleteTodo(index)}
        />
      ))}
    </div>
  );
}
