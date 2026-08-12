import { Router } from "express";
import * as userController from "../controllers/userController.js";
import passport from "passport";
import requireOwnership from "../middleware/requireOwnership.js";

const userRouter = Router();

userRouter.get("/users", passport.authenticate("jwt", { session: false }), userController.getAllUsers); // list of all users
userRouter.get("/users/:id", passport.authenticate("jwt", { session: false }), userController.getUserById); // view a specific users profile
userRouter.patch("/users/:id", passport.authenticate("jwt", { session: false }), requireOwnership ,userController.editProfile); // edit a profile (ownership check) only owner can edit their profile
userRouter.delete("/users/:id", passport.authenticate("jwt", { session: false}), requireOwnership, userController.deleteProfile); // Delete account (same ownership check)

export default userRouter;