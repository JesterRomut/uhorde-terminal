import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import { Glob } from "glob";

const config = {
    pattern: /^#####\s+(.+)$/gm,
    match: "**/*.sectioned.md",
    ignore: "node_modules/**",
};

/**@type {Set<string>} */
//const entries = new Set();
/**
 * @param {string} content
 */
function splitContent(content) {
    /**@type {{content: string, title: string | null }[]} */
    const sections = [];

    // 提取YAML front matter
    let frontMatter = "";
    const frontMatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (frontMatterMatch) {
        frontMatter = frontMatterMatch[0];
        content = content.slice(frontMatterMatch[0].length);
    }

    /**@type {{start: number, end: number, title: string | null }[]} */
    const headings = [];
    let match;

    while ((match = config.pattern.exec(content)) !== null) {
        const titleStart = match.index;
        const titleEnd = titleStart + match[0].length;
        /**@type {string | null} */
        let title = match[1].trim();
        if (title.startsWith("+")) {
            title = title.slice(1);
            if (title.length < 1) {
                title = null;
            }
        }
        title = title?.trim() || null;
        headings.push({ start: titleStart, end: titleEnd, title: title });
    }

    // 处理标题前的内容（如果有）
    if (headings.length > 0 && headings[0].start > 0) {
        const preContent = content.slice(0, headings[0].start).trim();
        if (preContent) {
            sections.push({
                content: preContent,
                title: null,
            });
        }
    } else if (headings.length === 0 && content.trim()) {
        sections.push({
            content: content.trim(),
            title: null,
        });
    }
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

    // 在所有内容片段前添加front matter
    return sections.map((section) => ({
        ...section,
        content: frontMatter + section.content,
    }));
}

/**
 * @param {string} [filePath]
 * @returns {Promise<Set<string>>}
 */
async function processFile(filePath) {
    let count = 0;
    const entries = new Set();
    //try {
    try {
        for await (const entry of new Glob(config.match, {
            ignore: config.ignore,
        })) {
            if (filePath && entry !== filePath) continue;

            const content = fs.readFileSync(entry, "utf-8");
            const sections = splitContent(content);

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
            try {
                fs.accessSync(outputDir + path.sep);
            } catch {
                fs.mkdirSync(outputDir + path.sep, { recursive: true });
            }
            /**@type {Object.<string, number>}*/
            const titleCounters = {};
            sections.forEach((section, index) => {
                let filename;
                if (section.title) {
                    const count_1 = titleCounters[section.title] || 0;
                    const total = titleStats[section.title];

                    filename =
                        total > 1
                            ? `${section.title}${count_1}.md`
                            : `${section.title}.md`;

                    titleCounters[section.title] = count_1 + 1;
                } else {
                    filename = `${index}.md`;
                }

                fs.writeFileSync(
                    path.join(outputDir, filename),
                    section.content
                );
            });
            console.log(`✅ ${basename}: 生成 ${sections.length} 个章节文件`);
            count++;
            entries.add(entry);
        }
        console.log(
            filePath ? `✅ 已处理 ${filePath}` : `✅ 已处理 ${count} 个文件`
        );
        return entries;
    } catch (error) {
        console.error("处理文件失败:", error);
        return new Set();
    }
}

// /**
//  * @param {string} pattern
//  */
// function toAbsolutePath(pattern) {
//     return path.resolve(process.cwd(), pattern);
// }

(async () => {
    // 首次全量处理
    let entries = await processFile();

    if (process.env.NODE_ENV === "development") {
        entries.forEach((entry) => {
            const watcher = chokidar.watch(entry, {
                ignored: config.ignore,
                ignoreInitial: true,
            });
            watcher
                .on("add", (path) => {
                    processFile(path);
                })
                .on("change", (path) => {
                    console.log("检测到文件修改：", path);
                    processFile(path);
                })
                .on("unlink", (path) => {
                    console.log("源文件被删除:", path);
                    // 这里可以添加删除对应生成文件的逻辑
                });
        });
    }
})();
