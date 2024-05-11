import { z } from "zod";
import {defaultEndpointsFactory} from "express-zod-api";


export const helloEndpoints = defaultEndpointsFactory.build({
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
