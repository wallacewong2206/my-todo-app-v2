import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

export default function TodoCard({ todo, onEdit, onDelete }) {
  const [timer, setTimer] = useState(todo.timer || { hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  let intervalRef = null;

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
    intervalRef = setInterval(() => {
      setTimer((prev) => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) {
          clearInterval(intervalRef);
          setIsRunning(false);
          alert("Timer has ended!");
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
    clearInterval(intervalRef);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef);
    setIsRunning(false);
    setTimer(todo.timer || { hours: 0, minutes: 0, seconds: 0 });
  };

  useEffect(() => {
    return () => clearInterval(intervalRef); // Cleanup interval on unmount
  }, []);

  return (
    <Card className="mb-3" style={{ maxWidth: "500px" }}>
      <Card.Body>
        <Card.Title>{todo.title}</Card.Title>
        <Card.Text>{todo.description}</Card.Text>
        <div className="mb-3">
          <label>Timer: Hour : Minute : Second</label>
          <div className="d-flex">
            <input
              type="number"
              name="hours"
              value={timer.hours}
              onChange={handleTimerChange}
              className="form-control me-1"
              placeholder="HH"
              style={{ maxWidth: "80px" }}
            />
            <input
              type="number"
              name="minutes"
              value={timer.minutes}
              onChange={handleTimerChange}
              className="form-control me-1"
              placeholder="MM"
              style={{ maxWidth: "80px" }}
            />
            <input
              type="number"
              name="seconds"
              value={timer.seconds}
              onChange={handleTimerChange}
              className="form-control"
              placeholder="SS"
              style={{ maxWidth: "80px" }}
            />
          </div>
        </div>
        <Button onClick={startTimer} className="me-2" disabled={isRunning}>
          Start
        </Button>
        <Button onClick={pauseTimer} className="me-2" disabled={!isRunning}>
          Pause
        </Button>
        <Button onClick={resetTimer} className="me-2">
          Reset
        </Button>
        <Button onClick={onEdit} variant="warning" className="me-2">
          Edit
        </Button>
        <Button onClick={onDelete} variant="danger">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}
