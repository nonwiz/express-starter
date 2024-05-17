import { z } from "zod";
import {defaultEndpointsFactory} from "express-zod-api";
import {authMiddleware} from "@/middlewares/authentication";

export const meEndpoint = defaultEndpointsFactory
    .addMiddleware(authMiddleware)
    .build({
    shortDescription: "Get logged in user profile",
    description: "When signed in, this return user profile information.",
    method: "get",
    input: z.object({}),
    output: z.object({
        name: z.string().optional(),
        email: z.string(),
        phone: z.string().optional(),
        role: z.string().optional().default("user")
    }),
    handler: async ({ options: {user} }) => {
        return user;
    },
});
