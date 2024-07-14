import express from 'express';
import tasks from './tasks';
import users from './users';


const router = express.Router();

export default (): express.Router => {
    tasks(router);
    users(router);

    return router;
}