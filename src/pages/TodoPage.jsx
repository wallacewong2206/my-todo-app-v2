import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import TodoCard from '../components/TodoCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TodoPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    url: '',
    reminder: new Date(),
    timer: { hours: 0, minutes: 0, seconds: 0 },
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const saveTodos = (updatedTodos) => {
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const addTodo = () => {
    if (!newTodo.title.trim()) {
      alert('Title is required!');
      return;
    }
    saveTodos([
      { ...newTodo, timer: { hours: 0, minutes: 0, seconds: 0 } },
      ...todos,
    ]);
    setNewTodo({
      title: '',
      description: '',
      url: '',
      reminder: new Date(),
      timer: { hours: 0, minutes: 0, seconds: 0 },
    });
  };

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
        title: 'Optimize State Management',
        description: 'Implement React Context API.',
        url: 'https://reactjs.org/docs/context.html',
        reminder: new Date().toISOString(),
        timer: { hours: 1, minutes: 30, seconds: 0 },
      },
      {
        title: 'Debug Authentication',
        description: 'Fix the login and signup workflows.',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication',
        reminder: new Date().toISOString(),
        timer: { hours: 0, minutes: 45, seconds: 0 },
      },
      {
        title: 'Code Review',
        description: 'Review pull requests on GitHub.',
        url: 'https://docs.github.com/en/pull-requests',
        reminder: new Date().toISOString(),
        timer: { hours: 2, minutes: 0, seconds: 0 },
      },
    ];
    saveTodos([...developerTemplates, ...todos]);
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center justify-content-center">
      <h1 className="text-center mb-4">Todo List</h1>
      <div className="d-flex flex-column align-items-center mb-4">
        <div className="w-100">
          <input
            type="text"
            placeholder="Title"
            className="form-control mb-2"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            style={{ maxWidth: '600px' }}
          />
          <textarea
            placeholder="Description"
            className="form-control mb-2"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
            style={{ maxWidth: '600px' }}
          ></textarea>
          <input
            type="url"
            placeholder="URL (optional)"
            className="form-control mb-2"
            value={newTodo.url}
            onChange={(e) => setNewTodo({ ...newTodo, url: e.target.value })}
            style={{ maxWidth: '600px' }}
          />
          <DatePicker
            selected={newTodo.reminder}
            onChange={(date) => setNewTodo({ ...newTodo, reminder: date })}
            showTimeSelect
            dateFormat="Pp"
            className="form-control mb-2"
            style={{ maxWidth: '600px' }}
          />
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-success me-3" onClick={addTodo}>
              Add Todo
            </button>
            <button className="btn btn-primary" onClick={quickSetupDeveloper}>
              Software Developer Random Task
            </button>
          </div>
        </div>
      </div>
      <div className="row g-4">
        {todos.map((todo, index) => (
          <div className="col-md-6 d-flex justify-content-center" key={index}>
            <TodoCard
              todo={todo}
              onDelete={() => deleteTodo(index)}
              onUpdate={(updatedTodo) => updateTodo(index, updatedTodo)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoPage;
