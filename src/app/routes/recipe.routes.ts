import { Router } from 'express';
import { authUser } from '../../config/auth.config';
import * as RecipeController from '../controller/recipe.controller';

const router = Router();

router.route("/")
.get(authUser, RecipeController.getRecipes)
.post(authUser, RecipeController.postRecipe)
.delete(authUser, RecipeController.deleteRecipes);

router.route("/recipe/:id")
.get(authUser, RecipeController.getRecipeByID)
.put(authUser, RecipeController.putRecipeByID)
.delete(authUser, RecipeController.deleteRecipeByID);


router.route("/score/:id")
.post(authUser, RecipeController.postScoreByID)
.delete(authUser, RecipeController.deleteScoreByID);

router.route("/category/:category")
.get(authUser, RecipeController.getRecipesByCategory);

router.route("/category/:category/:count")
.get(authUser, RecipeController.getRecipesByCategoryCount);

router.route("/newest")
.get(authUser, RecipeController.getNewestRecipes);

router.route("/newest/:count")
.get(authUser, RecipeController.getNewestRecipesCount);

router.route("/popular")
.get(authUser, RecipeController.getPopularRecipes);

router.route("/popular/count/:count")
.get(authUser, RecipeController.getPopularRecipesCount);

router.route("/popular/category/:category")
.get(authUser, RecipeController.getPopularRecipesByCategory);



export default router;