import {z} from "zod";
import {defaultEndpointsFactory, ez} from "express-zod-api";

export const uploadEndpoints = defaultEndpointsFactory
    .build({
        shortDescription: "Protected route - example",
        description: "You can't access this endpoint without valid Bearer token in Header - authorization.",
        method: "post", // or methods: ["get", "post", ...]
        input: z.object({
            files: z.array(ez.upload()),
            details: z.string()
        }),
        output: z.object({
            greetings: z.string().toUpperCase(),
        }),
        handler: async ({ input, options, logger }) => {
            console.log({input: input})
            return { greetings: "Yo"}
        },
});
