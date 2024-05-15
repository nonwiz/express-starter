import {Documentation} from "express-zod-api";
import {config, env} from "@/config";
import {routing} from "@/routes";
import {writeFile} from "node:fs/promises";
import {formatDateToYYMM} from "@/utils/formatter";

const generateDocumentation = async () => {
    return writeFile(
        env.DOC_PATH,
        new Documentation({
            routing,
            config,
            version: formatDateToYYMM(new Date()),
            title: `${env.APP_NAME} API`,
            serverUrl: `${env.BASE_URL}/api/`,
        }).getSpecAsYaml(),
        "utf-8",
    )
}

void generateDocumentation().then(_ => {
    console.log("Generated documentation successfully.")
});
