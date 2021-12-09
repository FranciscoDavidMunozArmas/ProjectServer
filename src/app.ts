import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import config from './lib/utils';

import userRouter from './app/routes/user.routes';
import recipesRouter from './app/routes/recipe.routes';


const app = express();

//settings
app.set("port", config.PORT);

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

//routes
app.use("/users", userRouter);
app.use("/recipes", recipesRouter);

export default app;