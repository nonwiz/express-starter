import {createConfig} from "express-zod-api";
import yaml from "yaml";
import { readFileSync } from "node:fs";
import ui from "swagger-ui-express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import {env} from "@/config/env";

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
    readFileSync(env.DOC_PATH, "utf-8"),
);
export const config = createConfig({
    server: {
        listen: env.PORT, // port, UNIX socket or options
        beforeRouting: ({ app}) => {
            console.log('\x1Bc', bunny);
            app.use(helmet());
            app.use(cookieParser())
            app.get("/", (_, res) => res.json({status: 200}));
            app.use("/docs", ui.serve, ui.setup(documentation));
        },
    },
    cors: true,
    logger: { level: "debug", color: true },
});
