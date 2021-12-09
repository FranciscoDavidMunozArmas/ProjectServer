import { Request, Response } from 'express';
import { database } from '../../config/firestore.config';
import { addDoc, collection, deleteDoc, doc, FieldValue, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Recipe } from '../interfaces/recipe';
import { Score } from '../interfaces/score';

const collectionRef = collection(database, 'recipes');

const documentRef = (id: string) => {
    return doc(database, "recipes", id);
}

export const getRecipes = async (req: Request, res: Response) => {
    try {
        const querySnapshot = await getDocs(collectionRef);
        const recipeDocs: any[] = [];
        querySnapshot.forEach(doc => {
            recipeDocs.push(doc.data());
        });
        return res.status(200).json({
            message: 'Recipes retrieved successfully',
            item: recipeDocs
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const postRecipe = async (req: Request | any, res: Response) => {
    try {
        const recipe: Recipe = req.body;
        recipe.author = req.payload;
        const docRef = await addDoc(collectionRef, recipe);
        return res.status(200).json({
            message: "Recipe created",
            id: docRef.id
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteRecipes = async (req: Request, res: Response) => {
    try {
        const querySnapshot = await getDocs(collectionRef);
        let documents: number = 0;
        querySnapshot.forEach(doc => {
            documents++;
            deleteDoc(doc.ref);
        });
        return res.status(200).json({
            message: "All recipes have been deleted",
            items: documents
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getRecipeByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const recipeDoc = await getDoc(documentRef(id));
        const recipe = recipeDoc.data();
        return res.status(200).json({
            message: "User found",
            item: recipe
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const putRecipeByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const recipe: Recipe | any = req.body;
        await updateDoc(documentRef(id), recipe);
        return res.status(200).json({ message: "Post" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteRecipeByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteDoc(documentRef(id));
        return res.status(200).json({
            message: "Item deleted",
            item: id
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const postScoreByID = async (req: Request | any, res: Response) => {
    try {
        const { id } = req.params;
        const recipeRef = documentRef(id);
        const score: Score = req.body;
        score.author = req.payload;

        const oldData: Recipe | any = (await getDoc(recipeRef)).data();
        if (oldData.score) {
            oldData.score.push(score);
        } else {
            oldData.score = [score];
        }
        await updateDoc(recipeRef, oldData);
        return res.status(200).json({ message: "Recipe scored" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteScoreByID = async (req: Request | any, res: Response) => {
    try {
        const { id } = req.params;
        const recipeRef = documentRef(id);
        const score: Score = req.body;

        const oldData: Recipe | any = (await getDoc(recipeRef)).data();
        if (oldData.score) {
            oldData.score = oldData.score.filter((item: Score) => item.author !== req.payload);
        }
        await updateDoc(recipeRef, oldData);
        return res.status(200).json({ message: "Recipe scored" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getRecipesByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.params;
        const queryDatabase = query(collectionRef, where('category', '==', category));
        const querySnapshot = await getDocs(queryDatabase);
        const data: any[] = [];
        querySnapshot.forEach(doc => {
            data.push(doc.data());
        });
        return res.status(200).json({
            message: "Get by Category",
            item: data
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getRecipesByCategoryCount = async (req: Request, res: Response) => {
    try {
        const { category, count }: any = req.params;
        const queryDatabase = query(collectionRef, where('category', '==', category));
        const querySnapshot = await getDocs(queryDatabase);
        const data: any[] = [];
        let index = 0;
        querySnapshot.forEach((doc) => {
            if (index > count - 1) {
                return;
            }
            data.push(doc.data());
            index++;
        });
        return res.status(200).json({
            message: "Get by Category Count",
            item: data
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getNewestRecipes = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Get Newest" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getNewestRecipesCount = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Get Newest Count" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getPopularRecipes = async (req: Request, res: Response) => {
    try {
        const querySnapshot = await getDocs(collectionRef);
        const recipeDocs: any[] = [];
        querySnapshot.forEach(doc => {
            const recipe = doc.data();
            if(recipe.score){
                recipe.score = 0;
            } else {
                recipe.score = recipe.score?.reduce((acc: Score, curr: Score) => {acc.score + curr.score});
            }
            recipeDocs.push(recipe);
        });
        recipeDocs.sort((a: any, b: any) => {
            return b.score - a.score;
        });
        return res.status(200).json({ message: "Popular", item: recipeDocs });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getPopularRecipesCount = async (req: Request, res: Response) => {
    try {
        const { count }: any = req.params;
        const querySnapshot = await getDocs(collectionRef);
        const recipeDocs: any[] = [];
        querySnapshot.forEach(doc => {
            const recipe = doc.data();
            recipe.score = recipe.score?.reduce((acc: Score, curr: Score) => acc.score + curr.score);
            recipeDocs.push(recipe);
        });
        recipeDocs.sort((a: any, b: any) => {
            return b.score - a.score;
        });
        const data: any[] = [];
        let index = 0;
        recipeDocs.forEach((doc) => {
            if (index > count - 1) {
                return;
            }
            data.push(doc);
            index++;
        });
        return res.status(200).json({ message: "Popular", item: data });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getPopularRecipesByCategory = async (req: Request, res: Response) => {
    try {
        const { category }: any = req.params;
        const querySnapshot = await getDocs(collectionRef);
        let recipeDocs: any[] = [];
        querySnapshot.forEach(doc => {
            const recipe = doc.data();
            recipe.score = recipe.score?.reduce((acc: Score, curr: Score) => acc.score + curr.score);
            recipeDocs.push(recipe);
        });
        recipeDocs.sort((a: any, b: any) => {
            return b.score - a.score;
        });
        recipeDocs = recipeDocs.filter((doc: any) => doc.category === category);
        return res.status(200).json({ message: "Popular", item: recipeDocs });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}