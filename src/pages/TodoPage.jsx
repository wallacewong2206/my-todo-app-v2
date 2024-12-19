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

  const updateTodo = (index, updatedTodo) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    saveTodos(updatedTodos);
  };

  const quickSetupDeveloper = () => {
    const developerTemplates = [
      {
        title: "Complete React Component",
        description: "Build and test a reusable TodoCard component.",
        timer: { hours: 1, minutes: 30, seconds: 0 },
      },
      {
        title: "Optimize State Management",
        description: "Implement context for better state handling.",
        timer: { hours: 2, minutes: 0, seconds: 0 },
      },
      {
        title: "Fix Authentication Bugs",
        description: "Debug login and signup workflows.",
        timer: { hours: 0, minutes: 45, seconds: 0 },
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
          onClick={() =>
            addTodo({
              title: "New Todo",
              description: "Describe your task here",
              timer: { hours: 0, minutes: 0, seconds: 0 },
            })
          }
        >
          Add Todo
        </button>
        <button className="btn btn-primary" onClick={quickSetupDeveloper}>
          Software Developer Random Task
        </button>
      </div>
      {todos.map((todo, index) => (
        <TodoCard
          key={index}
          todo={todo}
          onDelete={() => deleteTodo(index)}
          onUpdate={(updatedTodo) => updateTodo(index, updatedTodo)}
        />
      ))}
    </div>
  );
}
