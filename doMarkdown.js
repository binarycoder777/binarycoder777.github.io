import fs from 'fs';
import path from 'path';

// 指定Markdown文件所在的目录
const directoryPath = '/Users/weitao/Desktop/js_project/site/src/pages/posts';

// 读取并处理目录下的所有Markdown文件
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading the directory:', err);
        return;
    }

    files.forEach(file => {
        // 确保只处理.md文件
        if (path.extname(file) === '.md') {
            const filePath = path.join(directoryPath, file);
            processMarkdownFile(filePath);
        }
    });
});

function processMarkdownFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading the Markdown file (${filePath}):`, err);
            return;
        }

        // 使用正则表达式查找并替换date字段
        const updatedData = data.replace(
            /(---[\s\S]*?date:\s*)([^\n]*)([\s\S]*?---)/,
            (match, p1, p2, p3) => {
                // 检查日期是否已经被引号包围
                if (!p2.startsWith('"') && !p2.endsWith('"')) {
                    return `${p1}"${p2}"${p3}`;
                }
                return match; // 如果已经有引号，则不修改
            }
        );

        // 如果内容被修改了，写回文件
        if (data !== updatedData) {
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                if (err) {
                    console.error(`Error writing the updated Markdown file (${filePath}):`, err);
                    return;
                }
                console.log(`The Markdown file (${filePath}) has been updated successfully.`);
            });
        }
    });
}
