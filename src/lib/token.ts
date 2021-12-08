import jwt from "jsonwebtoken";
import config from "./utils";

export const tokenize = (token: any) => {
  return jwt.sign(token, config.SECRET_KEY as string);
};

export const decode = (token: any) => {
  return jwt.decode(token);
};