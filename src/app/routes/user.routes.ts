import { Router } from 'express';
import { authUser } from "../../config/auth.config";
import * as UserController from '../controller/user.controller';

const router = Router();

router.route("/authorize")
.post(UserController.authorize);

router.route("/")
.get(authUser, UserController.getUsers)
.post(authUser, UserController.postUser)
.delete(authUser, UserController.deleteUsers);

router.route("/user/:id")
.get(authUser, UserController.getUserByID)
.delete(authUser, UserController.deleteUserByID);

router.route("/saves/")
.put(authUser, UserController.putSave)
.delete(authUser, UserController.deleteSave);

export default router;