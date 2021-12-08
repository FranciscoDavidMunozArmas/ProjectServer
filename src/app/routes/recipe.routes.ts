import { Router } from 'express';
import { authUser } from '../../config/auth.config';
import * as RecipeController from '../controller/recipe.controller';

const router = Router();

router.route("/")
.get(authUser, RecipeController.getRecipesByID)
.post(authUser, RecipeController.postRecipeByID)
.delete(authUser, RecipeController.deleteRecipesByID);

router.route("/:id")
.get(authUser, RecipeController.getRecipeByID)
.put(authUser, RecipeController.putRecipeByID)
.delete(authUser, RecipeController.deleteRecipeByID);

export default router;