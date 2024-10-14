import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error', error));
    }, []);

    const addTask = (title) => {
        const newTask = { title, completed: false };
        axios.post('http://localhost:3001/tasks', newTask)
            .then(response => setTasks([...tasks, response.data]))
            .catch(error => console.error('Error', error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/tasks/${id}`)
            .then(() => setTasks(tasks.filter(task => task.id !== id)))
            .catch(error => console.error('Error', error));
    };


    const handleEdit = (id, updatedTitle) => {
        const updatedTask = tasks.find(task => task.id === id);
        updatedTask.title = updatedTitle;

        axios.put(`http://localhost:3001/tasks/${id}`, updatedTask)
            .then(response => setTasks(tasks.map(task => task.id === id ? response.data : task))) // busco la task que no esta actualisada en tasks y la actualizo
            .catch(error => console.error('Error', error));
    };

    const handleComplete = (id) => {
        const updatedTask = tasks.find(task => task.id === id);
        updatedTask.completed = !updatedTask.completed;

        axios.put(`http://localhost:3001/tasks/${id}`, updatedTask)
            .then(response => setTasks(tasks.map(task => task.id === id ? response.data : task)))
            .catch(error => console.error('Error', error));
    };

    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Ver Tareas</Link>
                    </li>
                    <li>
                        <Link to="/add">Agregar Tarea</Link>
                    </li>
                </ul>
            </nav>


            <Routes>
                <Route
                    path="/"
                    element={
                        <TaskListView
                            tasks={tasks}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            handleComplete={handleComplete}
                        />
                    }
                />
                <Route path="/add" element={<TaskFormView addTask={addTask} />} />
            </Routes>
        </Router>
    );
};

const TaskListView = ({ tasks, handleEdit, handleDelete, handleComplete }) => {
    return (
        <div>
            <h2>Lista de Tareas</h2>
            <TaskList
                tasks={tasks}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleComplete={handleComplete}
            />
        </div>
    );
};

const TaskFormView = ({ addTask }) => {
    return (
        <div>
            <h2>Agregar Nueva Tarea</h2>
            <TaskForm addTask={addTask} />
        </div>
    );
};

export default App;
