import express from 'express';
import idk from './idk';
import tasks from './tasks';


const router = express.Router();

export default (): express.Router => {
    idk(router);
    tasks(router);

    return router;
}