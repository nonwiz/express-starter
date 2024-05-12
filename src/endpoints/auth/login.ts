import { z } from "zod";
import {defaultEndpointsFactory} from "express-zod-api";
import {users} from "../../db/user";
import createHttpError from "http-errors";


export const loginEndpoint = defaultEndpointsFactory.build({
    shortDescription: "Login",
    description: "Login with user name or password",
    method: "post", // or methods: ["get", "post", ...]
    input: z.object({
        email: z.string({message: "Email is required."}).email("Should be a valid email address"),
        password: z.string({message: "Password is required."}),
    }),
    output: z.object({
        email: z.string(),
        name: z.string(),
    }),
    handler: async ({ input: { email, password } }) => {
        const user = users.find(user => user.email === email);
        if (!user) {
            throw createHttpError(404, 'User not found');
        }
        return user;
    },
});
