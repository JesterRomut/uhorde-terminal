import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import { Glob } from "glob";

const config = {
    pattern: /^#####\s+(.+)$/gm,
    //pattern: /^#####\s+\+(.+)$/gm,
    match: "**/*.sectioned.md",
    ignore: "node_modules/**",
};

//const entries = new Set();

/**
 * @param {string} content
 */
function splitContent(content) {
    /**@type {{content: string, title: string | null }[]} */
    const sections = [];
    /**@type {{start: number, end: number, title: string | null }[]} */
    const headings = [];
    let match;

    // 收集所有标题信息
    while ((match = config.pattern.exec(content)) !== null) {
        const titleStart = match.index;
        const titleEnd = titleStart + match[0].length;
        /**@type {string | null} */
        let title = match[1].trim(); // 直接提取+号后的内容
        if (title.startsWith("+")) {
            title = title.slice(1);
            if (title.length < 1) {
                title = null;
            }
        }
        headings.push({ start: titleStart, end: titleEnd, title: title });
    }

    // 处理第一个标题前的内容
    if (headings.length > 0 && headings[0].start > 0) {
        sections.push({
            content: content.slice(0, headings[0].start).trim(),
            title: null,
        });
    }

    // 处理每个标题后的内容
    headings.forEach((heading, index) => {
        const nextStart = headings[index + 1]?.start || content.length;
        const sectionContent = content.slice(heading.end, nextStart).trim();
        if (sectionContent) {
            sections.push({
                content: sectionContent,
                title: heading.title,
            });
        }
    });

    return sections;
}

function processFile() {
    let count = 0;
    //try {
    (async () => {
        for await (const entry of new Glob(config.match, {
            ignore: config.ignore,
        })) {
            const content = fs.readFileSync(entry, "utf-8");
            const sections = splitContent(content);

            // 统计标题出现次数
            const titleStats = sections.reduce(
                (/**@type {Object.<string, number>}*/ acc, { title }) => {
                    if (title) acc[title] = (acc[title] || 0) + 1;
                    return acc;
                },
                {}
            );

            const basename = path.basename(entry, ".md");
            const dirname = path.dirname(entry);

            const outputDir = path.join(dirname, basename);
            //console.log(outputDir + path.sep);
            try {
                fs.accessSync(outputDir + path.sep);
            } catch {
                fs.mkdirSync(outputDir + path.sep, { recursive: true });
            }
            // if (!fs.existsSync(outputDir + path.sep)) {
            // }
            // 生成文件名计数器
            /**@type {Object.<string, number>}*/
            const titleCounters = {};
            sections.forEach((section, index) => {
                let filename;
                //console.log(section.title);
                if (section.title) {
                    //console.log(section.title);
                    const count = titleCounters[section.title] || 0;
                    const total = titleStats[section.title];

                    filename =
                        total > 1
                            ? `${section.title}${count}.md`
                            : `${section.title}.md`;

                    titleCounters[section.title] = count + 1;
                } else {
                    filename = `${index}.md`;
                    //console.log(filename);
                }

                fs.writeFileSync(
                    path.join(outputDir, filename),
                    section.content
                );
            });

            // sections.forEach((section, index) => {
            //     const filename = path.join(outputDir, `${index}.md`);
            //     fs.writeFileSync(filename, section.content); // 不再写入标题
            // });

            console.log(`✅ ${basename}: 生成 ${sections.length} 个章节文件`);
            count++;
            // entries.add(entry);
        }
    })()
        .then(() => {
            console.log(`✅ 已处理 ${count} 个文件`);
        })
        .catch((error) => {
            console.error("处理文件失败:", error);
        });
}

processFile();
if (process.env.NODE_ENV === "development") {
    chokidar
        .watch(config.match)
        .on("add", processFile)
        .on("change", processFile)
        .on("unlink", (path) => console.log(`源文件被删除: ${path}`));
}

// if (process.env.NODE_ENV === "development") {
//     entries.forEach((entry) => {
//         chokidar
//             .watch(entry)
//             .on("add", processFile)
//             .on("change", processFile)
//             .on("unlink", () => console.log("源文件被删除"));
//     });
// }
