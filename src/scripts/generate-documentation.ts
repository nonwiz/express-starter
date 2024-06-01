import {createConfig, Documentation} from "express-zod-api";
import { writeFile } from "node:fs/promises";
import {env} from "@/config";
import {routing} from "@/routes";

const config = createConfig({
    startupLogo: false,
    server: {
        listen: env.PORT
    },
    cors: true,
    logger: { level: "debug", color: true },
});

export const generateDocumentation = async () => {
    return writeFile(
        "documentation/endpoints.yaml",
        new Documentation({
            routing,
            config,
            version: "1",
            title: "Example API",
            serverUrl: "https://example.com", // @ts-ignore
        }).getSpecAsYaml(),
        "utf-8",
    )
}

void generateDocumentation().then(_ => {
    console.log("Generated documentation successfully.")
});
