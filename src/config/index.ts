import { createConfig } from "express-zod-api";

export const config = createConfig({
    server: {
        listen: 8090, // port, UNIX socket or options
    },
    cors: true,
    logger: { level: "debug", color: true },
});
