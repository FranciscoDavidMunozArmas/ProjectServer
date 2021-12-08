import { Request, Response } from 'express';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { database } from '../../config/firestore.config';
import { tokenize } from '../../lib/token';
import { User } from '../interfaces/user';

export const authorize = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        return res.status(200).json({ token: tokenize(user) });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const querySnapshot = await getDocs(collection(database, "user"));
        const users: any[] = [];
        querySnapshot.forEach(doc => {
            users.push(doc.data());
        });
        return res.status(200).json(users);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
 }

export const postUser = async (req: Request, res: Response) => {
    try {
        const user:User = req.body;
        const docRef = await addDoc(collection(database, "user"), user);
        return res.status(200).json({
            message: "User created",
            id: docRef.id
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
 }

export const deleteUsers = async (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
 }

export const getUserByID = async (req: Request, res: Response) => { 
    try {
        
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteUserByID = async (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
 }

export const postRecipe = async (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
 }

export const postSave = async (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
 }
