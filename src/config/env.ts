import 'dotenv/config';
import {z} from "zod";

const environmentSchema = z.object({
    PORT: z.coerce.number({message: "Port should be a number."}).optional().default(8090),
    JWT_SECRET: z.string({message: "Secret should not be empty."}),
    JWT_EXPIRED: z.string().optional().default("1h"),
    MS_AUTHORITY: z.string().optional().default("https://login.microsoftonline.com/common"),
    MS_CLIENT_ID: z.string({message: "CLIENT_ID should not be empty."}),
    MS_CLIENT_SECRET: z.string({message: "CLIENT_SECRET should not be empty."}),
    MS_REDIRECT_URI: z.string().optional().default("http://localhost:8090/v1/auth/microsoft/callback"),
})

export const env = environmentSchema.parse(process.env);
