import jwt from "jsonwebtoken";
import {User} from "@/interfaces/user";

const secretKey = process.env.SECRET ?? "DEFAULT_SECRET";

export const createToken = (user: User) => {
    return jwt.sign(user, secretKey, { expiresIn: "1h" });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, secretKey);
}

export const decodeToken = (token: string) => {
    return jwt.decode(token);
}
