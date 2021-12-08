import { Request, Response } from 'express';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../../config/firestore.config';
import { tokenize } from '../../lib/token';

export const authorize = (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        return res.status(200).json({ token: tokenize(user)});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

/* --------- Recipes --------- */

export const getRecipesByID = async (req: Request, res: Response) => {
    try {
        const querySnapshot = await getDocs(collection(database, "user"));
        const data: any[] = [];
        querySnapshot.forEach(doc => {
            data.push(doc.data());
        });
        return res.status(200).json(data);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const postRecipeByID = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Post"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteRecipesByID = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Delete All"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getRecipeByID = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Get by ID"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const putRecipeByID = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Put"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteRecipeByID = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Delete by ID"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

/* --------- Saves --------- */

export const getSavesByID = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Get All"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const postSaveByID = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Post"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteSavesByID = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Delete All"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getSaveByID = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Get by ID"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const putSaveByID = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Put"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteSaveByID = (req: Request, res: Response) => {
    try {
        return res.status(200).json({ message: "Delete by ID"});
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}