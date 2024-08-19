import express from 'express';
import { createUser, deleteUserById, getUserById, getUserByUsername, getUsers } from '../db/users';
import { authentication, random } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { first_name, last_name, role, password, username } = req.body;

        if (!username || !password || !role || !first_name || !last_name) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByUsername(username);

        if (existingUser) {
            return res.sendStatus(400);
        }

        if (role != "Admin" && role != "Manager" && role != "User") {
            return res.sendStatus(401);
        }

        const salt = random();
        const user = await createUser({
            username,
            first_name,
            last_name,
            role,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        });

        return res.status(200).json(user).end();


    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const login = async (req: express.Request, res: express.Response) => {
    try {

        const { username, password } = req.body;

        if ( !username || !password ) {
            return res.sendStatus(400);
        }

        const user = await getUserByUsername(username).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('SESSION-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/'});
        return res.status(200).json(user).end();

    } catch (error) {   
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {

        const users = await getUsers();

        return res.status(200).json(users);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {

        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUserInfo = async (req: express.Request, res: express.Response) => {
    try {

        const {id} = req.params;
        const {username, first_name, last_name} = req.body;

        if (!username || !first_name || !last_name) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByUsername(username);

        if (existingUser) {
            return res.sendStatus(403);
        }

        const user = await getUserById(id);
        user.username = username;
        user.first_name = first_name;
        user.last_name = last_name;

        

        await user.save();

        return res.status(200).json(user).end();


    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateUserRole = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const {role} = req.body;

        if (!role) {
            return res.sendStatus(400);
        }

        if (role != "Admin" && role != "Manager" && role != "User") {
            return res.sendStatus(401);
        }

        const user = await getUserById(id);
        user.role = role;

        user.save();

        return res.status(200).json(user).end();


    } catch (error) {

    }
}

export const getUserfromId = async (req: express.Request, res: express.Response) => {
    try {

        const {id} = req.params;

        const user = await getUserById(id);

        if (!user) {
            return res.sendStatus(400);
        }

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

