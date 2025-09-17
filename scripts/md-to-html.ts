import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

function mdToHtml(markdown: string): string {
  let html = markdown;
  
  // 转换标题
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  
  // 转换粗体
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // 转换斜体
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // 转换链接
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
  
  // 转换列表项
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  
  // 转换段落
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/^(.+)$/gm, '<p>$1</p>');
  
  // 处理列表
  html = html.replace(/<li>(.+)<\/li>/g, (match, content) => {
    if (html.includes('<li>') && !html.includes('<ul>')) {
      return `<ul><li>${content}</li></ul>`;
    }
    return match;
  });
  
  // 清理多余的段落标签
  html = html.replace(/<p><h/g, '<h');
  html = html.replace(/<\/h(\d)><\/p>/g, '</h$1>');
  html = html.replace(/<p><ul>/g, '<ul>');
  html = html.replace(/<\/ul><\/p>/g, '</ul>');
  html = html.replace(/<p><li>/g, '<li>');
  html = html.replace(/<\/li><\/p>/g, '</li>');
  
  // 修改HTML结构以适应新样式
  let styledHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0">
    <title>WebTV 应用使用说明</title>
    <style>
        /* 全局样式重置 */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        /* 基础样式 */
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
        }
        
        /* 标题样式 */
        h1 {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 30px;
        }
        
        h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #333;
            margin: 30px 0 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e0e0e0;
        }
        
        h3 {
            font-size: 1.2rem;
            font-weight: 600;
            color: #555;
            margin: 20px 0 12px;
        }
        
        /* 文本和段落样式 */
        p {
            margin-bottom: 16px;
            font-size: 1rem;
            color: #333;
            line-height: 1.6;
        }
        
        /* 列表样式 */
        ul {
            margin: 16px 0;
            padding-left: 24px;
        }
        
        li {
            margin-bottom: 8px;
        }
        
        /* 强调和链接 */
        strong {
            font-weight: 600;
        }
        
        a {
            color: #0366d6;
            text-decoration: underline;
        }
        
        a:hover {
            color: #0256cc;
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
            body {
                padding: 15px;
            }
            
            h1 {
                font-size: 1.8rem;
            }
            
            h2 {
                font-size: 1.4rem;
            }
            
            h3 {
                font-size: 1.1rem;
            }
        }
    </style>
</head>
<body>
${html}
</body>
</html>`;

  return styledHtml;
}

function main() {
  try {
    // @ts-expect-error
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const inputPath = join(__dirname, '..', 'usage.md');
    const outputPath = join(__dirname, '..', 'ota', 'index.html');
    
    console.log('读取 Markdown 文件:', inputPath);
    const markdown = readFileSync(inputPath, 'utf8');
    
    console.log('转换为 HTML...');
    const html = mdToHtml(markdown);
    
    console.log('写入 HTML 文件:', outputPath);
    writeFileSync(outputPath, html, 'utf8');
    
    console.log('转换完成！');
  } catch (error) {
    console.error('转换失败:', error);
    process.exit(1);
  }
}

main();