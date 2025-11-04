import React from "react";

export default function TaskCard({ task, column, onDragStart, onDelete }) {
  return (
    <div
      className="task"
      draggable
      onDragStart={(e) => onDragStart(e, column, task.id)}
    >
      <span>{task.text}</span>
      <button onClick={() => onDelete(column, task.id)}>❌</button>
    </div>
  );
}
