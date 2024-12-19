import React, { useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import TodoCard from "../components/TodoCard";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState({ title: "", description: "" });

  const addTodo = () => {
    if (!task.title.trim()) return;
    const newTodo = {
      ...task,
      timer: { hours: 0, minutes: 0, seconds: 0 },
    };
    setTodos([...todos, newTodo]);
    setTask({ title: "", description: "" });
  };

  const updateTodo = (index, updatedTask) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTask;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-5">
      <h1>Todo List</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </Form.Group>
        <Button onClick={addTodo}>Add Todo</Button>
      </Form>
      <ListGroup className="mt-3">
        {todos.map((todo, index) => (
          <TodoCard
            key={index}
            todo={todo}
            onEdit={() => updateTodo(index, task)}
            onDelete={() => deleteTodo(index)}
          />
        ))}
      </ListGroup>
    </div>
  );
}
