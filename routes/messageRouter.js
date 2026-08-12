import { Router } from "express";
import * as messageController from "../controllers/messageController.js";
import passport from "passport";

const messageRouter = Router();

messageRouter.get("/messages/:id", passport.authenticate("jwt", { session: false }), messageController.getConversation);
messageRouter.post("/messages/:id", passport.authenticate("jwt", { session: false }), messageController.validateMessage, messageController.sendMessage);

export default messageRouter;