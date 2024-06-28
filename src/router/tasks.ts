import express from 'express';

import { getAllTasks, deleteTask, getATask, updateTask } from '../controllers/tasks';


export default (router: express.Router) => {
    router.get('/api/tasks', getAllTasks);
    router.get('/api/tasks/:id', getATask);
    router.delete('/api/tasks/:id', deleteTask);
    router.patch('/api/tasks/:id', updateTask);
}