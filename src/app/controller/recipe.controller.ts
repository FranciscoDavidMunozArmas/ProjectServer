import { Request, Response } from 'express';
import { database } from '../../config/firestore.config';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { recipeConverter } from '../interfaces/recipe';
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
            const data = recipeConverter.fromJSON(doc.data());
            recipeDocs.push(recipeConverter.toJSON(data));
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
        const recipe = recipeConverter.fromJSON(req.body);
        recipe.author = req.payload;
        recipe.date = new Date();
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
        const recipe = recipeConverter.fromJSON(recipeDoc.data());
        return res.status(200).json({
            message: "User found",
            item: recipeConverter.toJSON(recipe)
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
        const recipe = recipeConverter.fromJSON(req.body);
        await updateDoc(documentRef(id), recipeConverter.toJSON(recipe));
        return res.status(200).json({
            message: "Recipe updated",
            item: recipeConverter.toJSON(recipe)
        });
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

        const oldData = recipeConverter.fromJSON((await getDoc(recipeRef)).data());
        if (oldData.scores) {
            oldData.scores.push(score);
        } else {
            oldData.scores = [score];
        }
        await updateDoc(recipeRef, recipeConverter.toJSON(oldData));
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

        const oldData = recipeConverter.fromJSON((await getDoc(recipeRef)).data());
        if (oldData.scores) {
            oldData.scores = oldData.scores.filter((item: Score) => item.author !== req.payload);
        }
        await updateDoc(recipeRef, recipeConverter.toJSON(oldData));
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
        const recipeDocs: any[] = [];
        querySnapshot.forEach(doc => {
            const data = recipeConverter.fromJSON(doc.data());
            recipeDocs.push(recipeConverter.toJSON(data));
        });
        return res.status(200).json({
            message: "Get by Category",
            item: recipeDocs
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
        const recipeDocs: any[] = [];
        querySnapshot.forEach((doc) => {
            const data = recipeConverter.fromJSON(doc.data());
            recipeDocs.push(recipeConverter.toJSON(data));
        });
        return res.status(200).json({
            message: "Get by Category Count",
            item: recipeDocs.slice(0, count)
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getNewestRecipes = async (req: Request, res: Response) => {
    try {
        const querySnapshot = await getDocs(collectionRef);
        let recipeDocs: any[] = [];
        querySnapshot.forEach(doc => {
            const data = recipeConverter.fromJSON(doc.data());
            recipeDocs.push(recipeConverter.toJSON(data));
        });
        recipeDocs = recipeDocs.sort((a: any, b: any) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        return res.status(200).json({
            message: "Newest recipes",
            item: recipeDocs
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getNewestRecipesCount = async (req: Request, res: Response) => {
    try {
        const { count }: any = req.params;
        const querySnapshot = await getDocs(collectionRef);
        let recipeDocs: any[] = [];
        querySnapshot.forEach(doc => {
            const data = recipeConverter.fromJSON(doc.data());
            recipeDocs.push(recipeConverter.toJSON(data));
        });
        recipeDocs = recipeDocs.sort((a: any, b: any) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        return res.status(200).json({
            message: "Newest recipes",
            item: recipeDocs.slice(0, count)
        });
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
            const data = recipeConverter.fromJSON(doc.data());
            recipeDocs.push(recipeConverter.toJSON(data));
        });
        recipeDocs.sort((a: any, b: any) => {
            return b.score - a.score;
        });
        return res.status(200).json({ message: "Most Popular", item: recipeDocs });
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
        let recipeDocs: any[] = [];
        querySnapshot.forEach(doc => {
            const data = recipeConverter.fromJSON(doc.data());
            recipeDocs.push(recipeConverter.toJSON(data));
        });
        recipeDocs = recipeDocs.sort((a: any, b: any) => {
            return b.score - a.score;
        });
        return res.status(200).json({ message: `${count} most popular`, item: recipeDocs.slice(0, count) });
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
            const data = recipeConverter.fromJSON(doc.data());
            recipeDocs.push(recipeConverter.toJSON(data));
        });
        recipeDocs.sort((a: any, b: any) => {
            return b.score - a.score;
        });
        recipeDocs = recipeDocs.filter((doc: any) => doc.category === category);
        return res.status(200).json({
            message: `Most popular by ${category}`,
            item: recipeDocs
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}