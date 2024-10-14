import React, { useRef } from 'react';
import axios from 'axios';

const TaskForm = ({ addTask }) => {
  const taskTitleRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault(); // evitar que la pagina se recargue cuando el formulario se envia
    const title = taskTitleRef.current.value;
    if (title) {
      addTask(title);
      taskTitleRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={taskTitleRef} type="text" placeholder="Nueva tarea" />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default TaskForm;
