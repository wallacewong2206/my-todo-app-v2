import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';

export default function TodoCard({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo);
  const [timer, setTimer] = useState(
    todo.timer || { hours: 0, minutes: 0, seconds: 0 }
  );
  const [isRunning, setIsRunning] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state
  const intervalRef = useRef(null);

  const handleTimerChange = (e) => {
    const { name, value } = e.target;
    setTimer((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        const totalSeconds =
          prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setShowModal(true); // Show modal
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        };
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimer(todo.timer || { hours: 0, minutes: 0, seconds: 0 });
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleSave = () => {
    onUpdate({ ...updatedTodo, timer });
    setIsEditing(false);
  };

  const toggleCompleted = () => {
    onUpdate({ ...todo, completed: !todo.completed });
  };

  return (
    <>
      <Card
        className="mb-3"
        style={{
          maxWidth: '600px',
          width: '100%',
          borderColor: todo.completed ? 'green' : 'red',
        }}
      >
        <Card.Body>
          {isEditing ? (
            <>
              <input
                type="text"
                className="form-control mb-2"
                value={updatedTodo.title}
                onChange={(e) =>
                  setUpdatedTodo({ ...updatedTodo, title: e.target.value })
                }
                placeholder="Title"
              />
              <textarea
                className="form-control mb-2"
                value={updatedTodo.description}
                onChange={(e) =>
                  setUpdatedTodo({
                    ...updatedTodo,
                    description: e.target.value,
                  })
                }
                placeholder="Description"
              ></textarea>
              <Button onClick={handleSave} className="me-2">
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <>
              <Card.Title>{todo.title}</Card.Title>
              <Card.Text>{todo.description}</Card.Text>
              <p>Reminder: {new Date(todo.reminder).toLocaleString()}</p>
              <div className="mb-3">
                <label>Timer: Hours: Minutes: Seconds</label>
                <div className="d-flex">
                  <input
                    type="number"
                    name="hours"
                    value={timer.hours}
                    onChange={handleTimerChange}
                    className="form-control me-1"
                    placeholder="HH"
                    style={{ maxWidth: '80px' }}
                  />
                  <input
                    type="number"
                    name="minutes"
                    value={timer.minutes}
                    onChange={handleTimerChange}
                    className="form-control me-1"
                    placeholder="MM"
                    style={{ maxWidth: '80px' }}
                  />
                  <input
                    type="number"
                    name="seconds"
                    value={timer.seconds}
                    onChange={handleTimerChange}
                    className="form-control"
                    placeholder="SS"
                    style={{ maxWidth: '80px' }}
                  />
                </div>
              </div>
              <Button
                onClick={startTimer}
                className="me-2"
                disabled={isRunning}
              >
                Start
              </Button>
              <Button
                onClick={pauseTimer}
                className="me-2"
                disabled={!isRunning}
              >
                Pause
              </Button>
              <Button onClick={resetTimer} className="me-2">
                Reset
              </Button>
              <Button onClick={() => setIsEditing(true)} className="me-2">
                Edit
              </Button>
              <Button onClick={onDelete} variant="danger" className="me-2">
                Delete
              </Button>
              <Button
                onClick={toggleCompleted}
                variant={todo.completed ? 'success' : 'outline-success'}
              >
                {todo.completed ? 'Incomplete' : 'Complete'}
              </Button>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Timer Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Timer Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>The timer has ended!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
