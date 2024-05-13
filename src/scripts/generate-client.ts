import { Integration } from "express-zod-api";
import {routing} from "@/routes";
import {writeFile} from "node:fs/promises";

const client = new Integration({
    routing,
    variant: "client", // <— optional, see also "types" for a DIY solution
    optionalPropStyle: { withQuestionMark: true, withUndefined: true }, // optional
    splitResponse: false, // optional, prints the positive and negative response types separately
});


const generateClient = async () => {
    const formated = await client.printFormatted();
    return writeFile(
        "documentation/client.ts",
       formated
    )
}

void generateClient().then(r => {
    console.log("Generated client successfully.")
});
