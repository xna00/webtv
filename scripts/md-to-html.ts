import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

function mdToHtml(markdown: string): string {
  // 将Markdown按行分割进行处理
  const lines = markdown.split('\n');
  let html = '';
  let inList = false; // 用于跟踪无序列表
  let inOrderedList = false; // 用于跟踪有序列表
  let currentParagraph = '';
  
  // 处理每一行
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // 如果是空行，处理当前段落
    if (trimmedLine === '') {
      if (currentParagraph !== '') {
        html += `<p>${currentParagraph}</p>`;
        currentParagraph = '';
      }
      continue;
    }
    
    // 处理标题
    if (trimmedLine.startsWith('# ')) {
      // 处理未闭合的段落
      if (currentParagraph !== '') {
        html += `<p>${currentParagraph}</p>`;
        currentParagraph = '';
      }
      // 结束未闭合的列表
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      if (inOrderedList) {
        html += '</ol>';
        inOrderedList = false;
      }
      html += `<h1>${trimmedLine.substring(2)}</h1>`;
      continue;
    }
    if (trimmedLine.startsWith('## ')) {
      if (currentParagraph !== '') {
        html += `<p>${currentParagraph}</p>`;
        currentParagraph = '';
      }
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      if (inOrderedList) {
        html += '</ol>';
        inOrderedList = false;
      }
      html += `<h2>${trimmedLine.substring(3)}</h2>`;
      continue;
    }
    if (trimmedLine.startsWith('### ')) {
      if (currentParagraph !== '') {
        html += `<p>${currentParagraph}</p>`;
        currentParagraph = '';
      }
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      if (inOrderedList) {
        html += '</ol>';
        inOrderedList = false;
      }
      html += `<h3>${trimmedLine.substring(4)}</h3>`;
      continue;
    }
    
    // 处理列表项
    // 处理无序列表 (- 开头)
    if (trimmedLine.startsWith('- ')) {
      // 处理未闭合的段落
      if (currentParagraph !== '') {
        html += `<p>${currentParagraph}</p>`;
        currentParagraph = '';
      }
      // 结束有序列表
      if (inOrderedList) {
        html += '</ol>';
        inOrderedList = false;
      }
      // 开始新列表
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      // 提取列表项内容并处理格式
      let listContent = trimmedLine.substring(2);
      // 处理粗体
      listContent = listContent.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // 处理斜体
      listContent = listContent.replace(/\*(.+?)\*/g, '<em>$1</em>');
      // 处理链接
      listContent = listContent.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
      
      html += `<li>${listContent}</li>`;
      continue;
    }
    
    // 处理有序列表 (数字+点+空格 开头)
    const orderedListMatch = trimmedLine.match(/^(\d+)\.\s+(.*)$/);
    if (orderedListMatch) {
      // 处理未闭合的段落
      if (currentParagraph !== '') {
        html += `<p>${currentParagraph}</p>`;
        currentParagraph = '';
      }
      // 结束无序列表
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      // 开始新有序列表
      if (!inOrderedList) {
        html += '<ol>';
        inOrderedList = true;
      }
      // 提取列表项内容并处理格式
      let listContent = orderedListMatch[2];
      // 处理粗体
      listContent = listContent.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // 处理斜体
      listContent = listContent.replace(/\*(.+?)\*/g, '<em>$1</em>');
      // 处理链接
      listContent = listContent.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
      
      html += `<li>${listContent}</li>`;
      continue;
    }
    
    // 处理普通文本行（添加到当前段落）
    if (currentParagraph !== '') {
      currentParagraph += ' ';
    }
    // 处理行内格式
    let lineContent = trimmedLine;
    // 处理粗体
    lineContent = lineContent.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // 处理斜体
    lineContent = lineContent.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // 处理链接
    lineContent = lineContent.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
    
    currentParagraph += lineContent;
  }
  
  // 处理最后一个段落
  if (currentParagraph !== '') {
    html += `<p>${currentParagraph}</p>`;
  }
  
  // 确保关闭最后一个列表
    if (inList) {
      html += '</ul>';
    }
    if (inOrderedList) {
      html += '</ol>';
    }
  
  // 使用HTML自带样式为主，保留少量必要的基本样式
  let styledHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0">
    <title>WebTV 应用使用说明</title>
    <style>
        /* 基本样式设置，尽量使用浏览器默认样式 */
        body {
            max-width: 800px;
            margin: 0 auto;
            padding: 2em 1.5em; /* 增加上下边距，提高页面整体舒适度 */
            line-height: 1.6; /* 增加行高，提高可读性 */
        }
        
        /* 保留少量必要的样式以保证可读性 */
        h1 {
            margin-top: 2em; /* 增加大标题上边距 */
            margin-bottom: 0.8em; /* 增加大标题下边距 */
            font-size: 1.8em; /* 适当增大标题字号 */
        }
        
        h2 {
            margin-top: 1.8em; /* 增加二级标题上边距 */
            margin-bottom: 0.7em; /* 增加二级标题下边距 */
            font-size: 1.5em; /* 适当增大标题字号 */
        }
        
        h3 {
            margin-top: 1.6em; /* 增加三级标题上边距 */
            margin-bottom: 0.6em; /* 增加三级标题下边距 */
            font-size: 1.3em; /* 适当增大标题字号 */
        }
        
        p {
            margin-bottom: 1.2em; /* 增加段落之间的间距 */
            text-align: justify; /* 段落文本两端对齐，提高可读性 */
        }
        
        ul,
ol {
            margin: 1.2em 0 1.2em 1.5em; /* 增加列表与前后内容的间距，并设置左边缩进 */
        }
        
        li {
            margin-bottom: 0.5em; /* 增加列表项之间的间距 */
        }
        
        /* 链接样式 */
        a {
            color: #0366d6; /* 使用蓝色作为链接颜色，符合常见网页设计 */
            text-decoration: none; /* 移除默认下划线 */
        }
        
        a:hover {
            text-decoration: underline; /* 鼠标悬停时显示下划线 */
        }
        
        /* 响应式调整 */
        @media (max-width: 768px) {
            body {
                padding: 1.5em 1em; /* 在移动设备上适当调整边距 */
            }
            
            h1 {
                font-size: 1.6em; /* 在移动设备上适当减小标题字号 */
            }
            
            h2 {
                font-size: 1.4em;
            }
            
            h3 {
                font-size: 1.2em;
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