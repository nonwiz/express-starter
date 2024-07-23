import {defaultEndpointsFactory, ez} from "express-zod-api";
import {z} from "zod";

export const uploadEndpoints = defaultEndpointsFactory
    .build({
        shortDescription: "example",
        description: "Description",
        method: "post", // or methods: ["get", "post", ...]
        input: z.object({
            files: z.union([z.array(ez.upload()), ez.upload()]).transform(files => Array.isArray(files) ? files : [files]),
            details: z.string().default("{}").transform(i => {
                console.log("test", i)
                return JSON.parse(i)
            })
        }),
        output: z.object({
            greetings: z.string().toUpperCase(),
        }),
        handler: async ({input, options, logger}) => {
            const detailsArray = JSON.parse(input.details);

            console.log({input: input, detailsArray})
            return {greetings: "hi"}
        },
    });
