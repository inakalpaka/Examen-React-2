import React from 'react';
import axios from 'axios';

const TaskControls = ({ task, handleEdit, handleDelete, handleComplete }) => {
  return (
    <div>
      <button onClick={() => handleComplete(task.id)}>
        {task.completed ? 'Desmarcar' : 'Completar'}
      </button>
      <button onClick={() => handleEdit(task.id)}>Editar</button>
      <button onClick={() => handleDelete(task.id)}>Eliminar</button>
    </div>
  );
};

export default TaskControls;
