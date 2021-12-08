import dotenv from 'dotenv';

dotenv.config();

export default {
    APIKEY: process.env.APIKEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY || "secretKey",
}