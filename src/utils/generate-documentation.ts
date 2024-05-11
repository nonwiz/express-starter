import { Documentation } from "express-zod-api";
import {config} from "../config";
import {routing} from "../routes";
import { writeFile } from "node:fs/promises";

export const generateDocumentation = async () => {
    return writeFile(
        "documentation/endpoints.yaml",
        new Documentation({
            routing,
            config,
            version: "0",
            title: "Example API",
            serverUrl: "https://example.com",
        }).getSpecAsYaml(),
        "utf-8",
    )
}

