import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import { Glob, glob } from "glob";

// 配置参数
const config = {
    // sourceFile: path.resolve("src/lib/novels/original.md"), // 源文件路径
    // outputDir: path.resolve("src/lib/content/novel"), // 输出目录
    //sectionPattern: /^##\s+(.+)$/gm,
    pattern: /^#####\s+(.+)$/gm,
    //sectionPattern: /^#####\s+\+(.*)$/gm,
    match: "**/*.sectioned.md",
    ignore: "node_modules/**",
};

const entries = new Set();

/**
 * @param {string} content
 */
function splitContent(content) {
    const sections = [];
    //const pattern = /^##\s+.+$/gm;
    let lastEnd = 0;

    // 查找所有章节标题位置
    let match;
    while ((match = config.pattern.exec(content)) !== null) {
        const titleStart = match.index;
        const titleEnd = titleStart + match[0].length;

        // 提取前一章节内容（从上次结束到本次标题开始）
        if (titleStart > lastEnd) {
            sections.push({
                content: content.slice(lastEnd, titleStart).trim(),
            });
        }

        // 记录当前标题结束位置
        lastEnd = titleEnd;
    }

    // 添加最后一章内容
    const finalContent = content.slice(lastEnd).trim();
    if (finalContent) {
        sections.push({ content: finalContent });
    }

    return sections;
}

// 处理文件
function processFile() {
    // glob(config.match, {
    //     ignore: config.ignore,
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.error("处理文件失败:", error);
    // });
    let count = 0;
    //try {
    (async () => {
        for await (const entry of new Glob(config.match, {
            ignore: config.ignore,
        })) {
            const content = fs.readFileSync(entry, "utf-8");
            const sections = splitContent(content);

            const basename = path.basename(entry, ".md");
            const dirname = path.dirname(entry);

            const outputDir = path.join(dirname, basename);
            //console.log(outputDir + path.sep);
            try {
                fs.accessSync(outputDir + path.sep);
            } catch {
                fs.mkdirSync(outputDir + path.sep, { recursive: true });
            }
            if (!fs.existsSync(outputDir + path.sep)) {
            }

            sections.forEach((section, index) => {
                const filename = path.join(outputDir, `${index}.md`);
                fs.writeFileSync(filename, section.content); // 不再写入标题
            });

            console.log(`✅ 生成 ${sections.length} 个章节文件`);
            count++;
            entries.add(entry);

            // // 开发环境监听模式
            // if (process.env.NODE_ENV === "development") {
            //     chokidar
            //         .watch(entry)
            //         .on("add", processFile)
            //         .on("change", processFile)
            //         .on("unlink", () => console.log("源文件被删除"));
            // }
        }
    })()
        .then(() => {
            console.log(`✅ 已处理 ${count} 个文件`);
        })
        .catch((error) => {
            console.error("处理文件失败:", error);
        });
    // } catch (error) {
    //     console.error("处理文件失败:", error);
    // }
}

// 立即执行一次
processFile();

// 开发环境监听模式
if (process.env.NODE_ENV === "development") {
    entries.forEach((entry) => {
        chokidar
            .watch(entry)
            .on("add", processFile)
            .on("change", processFile)
            .on("unlink", () => console.log("源文件被删除"));
    });
}
