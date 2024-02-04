// 使用ES模块导入
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src','pages', 'posts');
const outputDirectory = path.join(process.cwd(), 'public');

const posts = fs.readdirSync(postsDirectory).map(filename => {
  const filePath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContents);

  return {
    title: data.title,
    date: data.date,
    summary: data.summary,
    category: data.category,
    image: data.image,
    slug: filename.replace(/\.md$/, '')
  };
});

fs.writeFileSync(path.join(outputDirectory, 'posts-metadata.json'), JSON.stringify(posts, null, 2));
