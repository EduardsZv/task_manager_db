import express from "express";
import { createTask } from "../db/tasks";


export const create_task  = async(req: express.Request, res: express.Response) => {
    try {
        const { title, description, type, created_on, status} = req.body;

        if (!title || !description || !type || !created_on || !status) {
            return res.sendStatus(400);
        }
        
        const task = await createTask({
            title,
            description,
            type,
            created_on,
            status
        });

        return res.status(200).json(task).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}