import { Commentary } from "./commentary";
import { Score } from "./score";

export interface Recipe {
    _id?: string,
    name: string,
    description?: string,
    image: string,
    calories?: number,
    category: string,
    time: number,
    score?: Score[],
    plates: number,
    ingredients: string[],
    steps: string[],
    commentaries?: Commentary[],
    author: string,
}