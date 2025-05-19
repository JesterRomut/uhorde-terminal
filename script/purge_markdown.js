import { Glob } from "glob";
import fs from "fs";
import path from "path";

const config = {
    match: "**/*.sectioned/",
    ignore: "node_modules/**",
};

async function deleteFiles() {
    let count = 0;
    await (async () => {
        for await (const entry of new Glob(config.match, {
            ignore: config.ignore,
        })) {
            fs.rm(entry, { recursive: true }, () => {
                count++;
                console.log(`已删除 ${entry}`);
            });
        }
    })();
    return count;
}

if (process.argv[1] === import.meta.filename) {
    deleteFiles();
}
