import { z } from "zod";
import {defaultEndpointsFactory} from "express-zod-api";
import {authMiddleware} from "@/middlewares/authentication";


export const helloEndpoints = defaultEndpointsFactory.build({
    shortDescription: "Hello - API",
    description: "Testing.",
    method: "get", // or methods: ["get", "post", ...]
    input: z.object({
        // for empty input use z.object({})
        name: z.string().optional(),
    }),
    output: z.object({
        greetings: z.string().toUpperCase(),
    }),
    handler: async ({ input: { name }, options, logger }) => {
        logger.debug("Options:", options); // middlewares provide options
        return { greetings: `Hello, ${name || "World"}. Happy coding!` };
    },
});


export const helloWithAuthEndpoints = defaultEndpointsFactory
    .addMiddleware(authMiddleware)
    .build({
    method: "get", // or methods: ["get", "post", ...]
    input: z.object({
    }),
    output: z.object({
        greetings: z.string().toUpperCase(),
    }),
    handler: async ({ input: { }, options, logger }) => {
        const name = options.user.name as string;
        logger.debug("Options:", options); // middlewares provide options
        return { greetings: `Hello, ${name || "World"}. Happy coding!` };
    },
});
