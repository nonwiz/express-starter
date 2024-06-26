import jwt from "jsonwebtoken";
import {User} from "@/interfaces/user";
import * as msal from "@azure/msal-node";
import {env} from "@/config";

export const createToken = (user: User) => {
    return jwt.sign(user, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRED });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, env.JWT_SECRET);
}

export const decodeToken = (token: string) => {
    return jwt.decode(token);
}

const clientConfig = {
    auth: {
        clientId: env.MS_CLIENT_ID,
        authority: env.MS_AUTHORITY,
        clientSecret:env.MS_CLIENT_SECRET,
    },
};

export const authCodeUrlParameters = {
    scopes: ["profile"],
    redirectUri: env.MS_REDIRECT_URI,
};
export const cca = new msal.ConfidentialClientApplication(clientConfig);
