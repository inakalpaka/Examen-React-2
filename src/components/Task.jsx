import React from 'react';
import axios from 'axios';
import TaskControls from './TaskControls';

const Task = ({ task, handleEdit, handleDelete, handleComplete }) => {
  return (
    <div>
      <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}
      </h3>
      <TaskControls
        task={task}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleComplete={handleComplete}
      />
    </div>
  );
};

export default Task;
