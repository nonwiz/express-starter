import {createConfig} from "express-zod-api";
import yaml from "yaml";
import { readFileSync } from "node:fs";
import ui from "swagger-ui-express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import 'dotenv/config';

const bunny = `         
                /|      __
               / |   ,-~ /
              Y :|  //  /
              | jj /( .^
              >-"~"-v"
             /       Y
            jo  o    |
           ( ~T~     j
            >._-' _./
           /   "~"  |
          Y     _,  |
         /| ;-"~ _  l
        / l/ ,-"~    \\
        \\//\\/      .- \\
         Y        /    Y    - ExpressJS - Boilerplate #1
         l       I     !
         ]\\      _\\    /"\\
        (" ~----( ~   Y.  )
        
        `;

const documentation = yaml.parse(
    readFileSync("documentation/endpoints.yaml", "utf-8"),
);


export const config = createConfig({
    server: {
        listen: process.env.PORT ?? 8090, // port, UNIX socket or options
        beforeRouting: ({ app, logger }) => {
            console.log('\x1Bc', bunny);
            app.use(helmet());
            app.use(cookieParser())
            app.use("/docs", ui.serve, ui.setup(documentation));
            app.get("/", (_, res) => res.json({message: "Welcome", status: 200}));
        },
    },
    cors: true,
    logger: { level: "debug", color: true },
});
