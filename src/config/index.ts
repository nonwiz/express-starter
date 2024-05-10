import { createConfig } from "express-zod-api";
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
            logger.info("Serving the API documentation at https://example.com/docs");
            // app.use("/docs", ui.serve, ui.setup(documentation));
        },
    },
    cors: true,
    logger: { level: "debug", color: true },
});
