import * as db from "../database/queries.js";

async function getAllUsers(req,res,next){
    try {
        const users = await db.getUsers();
        return res.json(users);
    } catch (error) {
        next(error);
    }
}

async function getUserById(req,res,next){
    try {
        const userId = req.params.id;

        const users = await db.getUserById(userId);
        return res.json(users);
    } catch (error) {
        next(error);
    }
}

async function editProfile(req,res,next){
    try {
        const userId = req.params.id;
        const { name, bio, avatar } = req.body;

        const updates = {};
        if(name !== undefined){
            updates.name = name;
        }
        if(bio !== undefined){
            updates.bio = bio;
        }
        if(avatar !== undefined){
            updates.avatar = avatar;
        }

        const updatedProfile = await db.editUserProfile(userId, updates);
        res.json(updatedProfile);
    } catch (error) {
        next(error);
    }
}

async function deleteProfile(req,res,next){
    try {
        const userId = req.params.id;
        await db.deleteProfileById(userId);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

export { getAllUsers, getUserById, editProfile, deleteProfile };