import * as db from "../database/queries.js";
import { body, validationResult } from "express-validator";

export const validateMessage = [
    body("content").trim().notEmpty().withMessage("Cannot send empty message.").escape(),
]

async function getConversation(req,res,next){
    try {
        const myId = req.user.id;
        const otherUserId = req.params.id;
        const messages = await db.getMessages(myId, otherUserId);
        res.status(200).json(messages);
    } catch (error) {
         next(error);
    }
}

async function sendMessage(req,res,next){
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const myId = req.user.id;
        const otherUserId = req.params.id;
        const { content } = req.body;

        const message = await db.createMessage(myId, otherUserId, content);
        res.status(201).json(message);
    } catch (error) {
        next(error);
    }
}

export { getConversation, sendMessage };