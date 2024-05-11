import {createConfig} from "express-zod-api";
import yaml from "yaml";
import { readFileSync } from "node:fs";
import ui from "swagger-ui-express";
import {generateDocumentation} from "../generate-documentation";

const documentation = yaml.parse(
    readFileSync("documentation/endpoints.yaml", "utf-8"),
);

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

export const config = createConfig({
    server: {
        listen: 8090, // port, UNIX socket or options
        beforeRouting: ({ app, logger }) => {
            console.clear();
            console.log(bunny)
            logger.info("Serving the API documentation at http://localhost:8090/docs");
            void generateDocumentation().then(r => {
                logger.info("Generated documentation.")
            }).catch(e => {
                logger.error("Error generating documentation.");
            });
            app.use("/docs", ui.serve, ui.setup(documentation));
        },
    },
    cors: true,
    logger: { level: "debug", color: true },
});
