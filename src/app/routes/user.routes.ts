import { Router } from 'express';
import { authUser } from "../../config/auth.config";
import * as UserController from '../controller/user.controller';

const router = Router();

router.route("/authorize")
.post(UserController.authorize);

router.route("/")
.get(authUser, UserController.getRecipesByID)
.post(authUser, UserController.postRecipeByID)
.delete(authUser, UserController.deleteRecipesByID);

router.route("/user/:id")
.get(authUser, UserController.getRecipeByID)
.put(authUser, UserController.putRecipeByID)
.delete(authUser, UserController.deleteRecipeByID);

export default router;