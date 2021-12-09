import { Request, Response } from 'express';
import { addDoc, collection, deleteDoc, doc, FieldValue, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import 'firebase/firestore';
import { app, database } from '../../config/firestore.config';
import { tokenize } from '../../lib/token';
import { User } from '../interfaces/user';

const collectionRef = () => {
    return collection(database, 'users');
}

const documentRef = (docId: string) => {
    return doc(database, 'users', docId);
}

export const authorize = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        const docQuery = query(collectionRef(), where('log', '==', user));
        const querySnapshot = await getDocs(docQuery);
        return res.status(200).json({ token: tokenize(querySnapshot.docs[0].id) });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const querySnapshot = await getDocs(collectionRef());
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
        const user: User = req.body;
        const docRef = await addDoc(collectionRef(), user);
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
        const querySnapshot = await getDocs(collectionRef());
        let documents: number = 0;
        querySnapshot.forEach(doc => {
            documents++;
            deleteDoc(doc.ref);
        });
        return res.status(200).json({
            message: "All users have been deleted",
            items: documents
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getUserByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userDoc = await getDoc(documentRef(id));
        const user = userDoc.data();
        return res.status(200).json({
            message: "User found",
            item: user
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}


export const deleteUserByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await deleteDoc(documentRef(id));
        return res.status(200).json({
            message: "User deleted",
            item: id
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const putSave = async (req: Request | any, res: Response) => {
    try {
        const { payload } = req;
        const { recipe } = req.body;
        const oldData: User | any = (await getDoc(documentRef(payload))).data();
        if (oldData.saves) {
            oldData.saves.push(recipe);
        } else {
            oldData.saves = [recipe];
        }
        await updateDoc(documentRef(payload), oldData);
        return res.status(200).json({
            message: "Saved recipe",
            item: recipe
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteSave = async (req: Request | any, res: Response) => {
    try {
        const { payload } = req;
        const { recipe } = req.body;
        const oldData: User | any = (await getDoc(documentRef(payload))).data();
        if (oldData.saves) {
            oldData.saves = oldData.saves.filter((item: string) => item !== recipe);
        }
        await updateDoc(documentRef(payload), oldData);
        return res.status(200).json({
            message: "Saved recipe deleted",
            item: recipe
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}
