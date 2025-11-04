import React, { useState } from "react";
import TaskColumn from "./Component/TaskColumn";
import AddTaskForm from "./Component/AddTaskForm";
import "./index.css";

export default function App() {
  const [columns, setColumns] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const addTask = (task) => {
    setColumns((prev) => ({
      ...prev,
      todo: [...prev.todo, { id: Date.now(), text: task }],
    }));
  };

  const deleteTask = (col, id) => {
    setColumns((prev) => ({
      ...prev,
      [col]: prev[col].filter((t) => t.id !== id),
    }));
  };

  const onDragStart = (e, from, taskId) => {
    e.dataTransfer.setData("from", from);
    e.dataTransfer.setData("taskId", taskId);
  };

  const onDrop = (e, to) => {
    e.preventDefault();
    const from = e.dataTransfer.getData("from");
    const taskId = Number(e.dataTransfer.getData("taskId"));
    if (from === to) return;

    const taskToMove = columns[from].find((t) => t.id === taskId);
    setColumns((prev) => ({
      ...prev,
      [from]: prev[from].filter((t) => t.id !== taskId),
      [to]: [...prev[to], taskToMove],
    }));
  };

  return (
    <div className="app">
      <h1>🧠 Arun Todo List</h1>
      <AddTaskForm onAdd={addTask} />

      <div className="board">
        {Object.keys(columns).map((col) => (
          <TaskColumn
            key={col}
            title={col}
            tasks={columns[col]}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}
