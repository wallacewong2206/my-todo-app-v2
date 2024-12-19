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

  const addTodo = (newTodo) => saveTodos([...todos, newTodo]);

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    saveTodos(updatedTodos);
  };

  const quickSetupDeveloper = () => {
    const developerTemplates = [
      {
        task: "Complete React Component",
        description: "Build and test a reusable TodoCard component.",
        timer: { hours: 1, minutes: 30, seconds: 0 },
        reminder: new Date().toISOString(),
      },
      {
        task: "Optimize State Management",
        description: "Implement context for better state handling.",
        timer: { hours: 2, minutes: 0, seconds: 0 },
        reminder: new Date().toISOString(),
      },
      {
        task: "Fix Authentication Bugs",
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-success"
          onClick={() => addTodo({ task: "New Todo", description: "", timer: { hours: 0, minutes: 0, seconds: 0 }, reminder: new Date().toISOString() })}
        >
          Add Todo
        </button>
        <button className="btn btn-primary" onClick={quickSetupDeveloper}>
          Quick Setup: Software Developer
        </button>
      </div>
      {todos.map((todo, index) => (
        <TodoCard
          key={index}
          todo={todo}
          onDelete={() => deleteTodo(index)}
        />
      ))}
    </div>
  );
}
