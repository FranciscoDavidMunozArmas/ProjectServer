import multer from 'multer';
import path from 'path';
import { v4 } from 'uuid';

const typesStorage = multer.diskStorage({
    destination: 'uploads/recipes',
    filename: (req, file, callback) => {
        callback(null, v4() + path.extname(file.originalname));
    }
});

export const multerRecipe = multer({ storage: typesStorage });