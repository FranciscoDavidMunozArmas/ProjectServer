import { Router } from 'express';
import { authUser } from "../../config/auth.config";
import * as UserController from '../controller/user.controller';

const router = Router();

router.route("/authorize")
.post(UserController.authorize);

router.route("/recipe")
.get(authUser, UserController.getRecipesByID)
.post(authUser, UserController.postRecipeByID)
.delete(authUser, UserController.deleteRecipesByID);

router.route("/recipe/:id")
.get(authUser, UserController.getRecipeByID)
.put(authUser, UserController.putRecipeByID)
.delete(authUser, UserController.deleteRecipeByID);

router.route("/saves")
.get(authUser, UserController.getSavesByID)
.post(authUser, UserController.postSaveByID)
.delete(authUser, UserController.deleteSavesByID);

router.route("/saves/:id")
.get(authUser, UserController.getSaveByID)
.put(authUser, UserController.putSaveByID)
.delete(authUser, UserController.deleteSaveByID);

export default router;