import express from 'express';

import { create_task } from '../controllers/idk';

export default (router: express.Router) => {
    router.post('/api/createTask', create_task);
}