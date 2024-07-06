import express from 'express';

import { GetTaskById, deleteTaskById, getTasks, createTask } from '../db/tasks';

export const getAllTasks = async(req: express.Request, res: express.Response) => {
    try {
        const tasks = await getTasks();

        return res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getATask = async(req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;

        const task = await GetTaskById(id);

        return res.json(task);


    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const create_task  = async(req: express.Request, res: express.Response) => {
    try {
        const { title, description, type, created_on, status, assigned_to} = req.body;

        if (!title || !description || !type || !created_on || !status) {
            return res.sendStatus(400);
        }
        
        const task = await createTask({
            title,
            description,
            type,
            created_on,
            status,
            assigned_to
        });

        return res.status(200).json(task).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteTask = async(req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        
        const deletedTask = await deleteTaskById(id);

        return res.json(deletedTask);
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateTask = async(req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const { title, description, type, created_on, status, assigned_to} = req.body;

        const task = await GetTaskById(id);
        task.title = title;
        task.description = description;
        task.type = type;
        task.created_on = created_on;
        task.status = status;
        task.assigned_to = assigned_to;

        await task.save();

        return res.status(200).json(task).end();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}