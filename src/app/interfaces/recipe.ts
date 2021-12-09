import { Commentary } from "./commentary";
import { Score } from "./score";

class Recipe {
    id: string;
    title: string;
    image: string;
    category: string;
    time: number;
    plates: number;
    ingredients: string[];
    steps: string[];
    author: string;
    date: Date;
    score: number;
    commentaries?: Commentary[];
    scores?: Score[];
    calories?: number;
    description?: string;

    constructor(id:string, name:string, image:string, category:string, time:number, plates:number, ingredients:string[], steps:string[], author:string, date:Date, commentaries: Commentary[], description?:string, calories?:number, scores?:Score[]) {
        this.id = id;
        this.title = name;
        this.image = image;
        this.category = category;
        this.time = time;
        this.plates = plates;
        this.ingredients = ingredients;
        this.steps = steps;
        this.author = author;
        this.date = date;
        this.commentaries = commentaries;
        this.description = description;
        this.calories = calories;
        this.scores = scores;
        this.score = this.scores ? this.scores.reduce((a, b) => a + b.score, 0) / this.scores.length : 0;
    }
}

export const recipeConverter = {
    toJSON(recipe: Recipe): any {
        return {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            category: recipe.category,
            time: recipe.time,
            plates: recipe.plates,
            ingredients: recipe.ingredients,
            steps: recipe.steps,
            author: recipe.author,
            date: recipe.date,
            commentaries: recipe.commentaries,
            calories: recipe.calories,
            description: recipe.description,
            score: recipe.score
        };
    },
    fromJSON(data: any): Recipe {
        const recipe = new Recipe(
            data.id,
            data.title,
            data.image,
            data.category,
            data.time,
            data.plates,
            data.ingredients,
            data.steps,
            data.author,
            data.date,
            data.commentaries,
            data.description,
            data.calories,
            data.scores
        );
        return recipe;
    }
}