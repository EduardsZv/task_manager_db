import express from 'express';

import { login, register, getAllUsers, deleteUser, updateUserInfo, getUserfromId, updateUserRole } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.get('/api/users', getAllUsers);
    router.delete('/api/users/:id', deleteUser);
    router.patch('/api/users/:id', updateUserInfo);
    router.get('/api/users/:id', getUserfromId);
    router.patch('/api/users/role/:id', updateUserRole);
}