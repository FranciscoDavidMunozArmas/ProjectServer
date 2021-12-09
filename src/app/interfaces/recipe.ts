import { Commentary } from "./commentary";
import { Score } from "./score";

class Recipe {
    id?: string;
    title: string;
    image: string;
    category: string;
    time: number;
    plates: number;
    ingredients: string[];
    steps: string[];
    author: string;
    date: string;
    score: number;
    commentaries?: Commentary[];
    scores?: Score[];
    calories?: number;
    description?: string;

    constructor(title:string, image:string, category:string, time:number, plates:number, ingredients:string[], steps:string[], author:string, date:string, commentaries: Commentary[], description?:string, calories?:number, scores?:Score[], id?:string) {
        this.title = title;
        this.image = image;
        this.category = category;
        this.time = time;
        this.plates = plates;
        this.ingredients = ingredients;
        this.steps = steps;
        this.author = author;
        this.date = date;
        this.commentaries = (commentaries) ? commentaries : [];
        this.description = (description) ? description : "";
        this.calories = (calories) ? calories : 0;
        this.scores = (scores) ? scores : [];
        this.id = (id) ? id : "";
        if (this.scores.length !== 0) {
            const aux = this.scores.map(element => element.score);
            this.score = aux.reduce((a, b) => a + b) / aux.length;
        } else {
            this.score = 0;
        }
    }
}

export const recipeConverter = {
    toFirestore: function(recipe: Recipe) {
        return {
            title: recipe.title,
            image: recipe.image,
            category: recipe.category,
            time: recipe.time,
            plates: recipe.plates,
            ingredients: recipe.ingredients,
            steps: recipe.steps,
            author: recipe.author,
            calories: recipe.calories,
            scores: recipe.scores,
            description: recipe.description,
            id: recipe.id,
        };
    },
    toJSON(recipe: Recipe): any {
        return {
            title: recipe.title,
            image: recipe.image,
            category: recipe.category,
            time: recipe.time,
            plates: recipe.plates,
            ingredients: recipe.ingredients,
            steps: recipe.steps,
            author: recipe.author,
            date: recipe.date,
            score: recipe.score,
            commentaries: recipe.commentaries,
            calories: recipe.calories,
            description: recipe.description,
            id: recipe.id,
        };
    },
    fromJSON(data: any): Recipe {
        const recipe = new Recipe(
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
            data.scores,
            data.id
        );
        return recipe;
    }
}