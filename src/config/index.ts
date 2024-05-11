import {createConfig} from "express-zod-api";
import yaml from "yaml";
import { readFileSync } from "node:fs";
import ui from "swagger-ui-express";
import {generateDocumentation} from "../utils/generate-documentation";
import helmet from "helmet";

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
        listen: 8090, // port, UNIX socket or options
        beforeRouting: ({ app, logger }) => {
            void generateDocumentation()
            console.log('\x1Bc', bunny);

            app.use(helmet());
            app.get("/", (_, res) => res.json({message: "Welcome", status: 200}));
            app.use("/docs", ui.serve, ui.setup(documentation));
        },
    },
    cors: true,
    logger: { level: "debug", color: true },
});
