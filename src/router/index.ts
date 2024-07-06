import express from 'express';
import tasks from './tasks';


const router = express.Router();

export default (): express.Router => {
    tasks(router);

    return router;
}