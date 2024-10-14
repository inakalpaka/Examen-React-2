import React from 'react';
import axios from 'axios';
import Task from './Task';

const TaskList = ({ tasks, handleEdit, handleDelete, handleComplete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleComplete={handleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
