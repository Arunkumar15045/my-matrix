import React from "react";
import TaskCard from "./TaskCard";

export default function TaskColumn({ title, tasks, onDrop, onDragStart, onDelete }) {
  const colors = {
    todo: "#9EC8FF",
    inProgress: "#FFD37B",
    done: "#A9ECA2",
  };

  return (
    <div
      className="column"
      style={{ background: colors[title] }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, title)}
    >
      <h2>{title.toUpperCase()}</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          column={title}
          onDragStart={onDragStart}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
