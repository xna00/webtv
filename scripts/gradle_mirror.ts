import {readdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const gradleNewRepositories = `
repositories {
    maven { url 'https://maven.aliyun.com/repository/public/' } 
    maven { url 'https://maven.aliyun.com/repository/google' } 
    maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
    mavenCentral()
    google()
    gradlePluginPortal()
}`;

const kotlinNewRepositories = `
repositories {
    maven { url = uri("https://maven.aliyun.com/repository/public") } 
    maven { url = uri("https://maven.aliyun.com/repository/google") } 
    maven { url = uri("https://maven.aliyun.com/repository/gradle-plugin") }
    mavenCentral()
    google()
    gradlePluginPortal()
}`;

function replaceRepositoriesBlocks(content: string, replacement: string): string {
  let result = '';
  let pos = 0;
  const searchStr = 'repositories {';
  
  while (pos < content.length) {
    // 找到下一个 repositories { 的位置
    const startIndex = content.indexOf(searchStr, pos);
    if (startIndex === -1) {
      // 没有找到更多的 repositories 块，添加剩余内容并退出循环
      result += content.slice(pos);
      break;
    }
    
    // 添加从当前位置到 repositories { 开始前的内容
    result += content.slice(pos, startIndex);
    
    // 找到对应的结束大括号 }
    let braceCount = 1;
    let endIndex = startIndex + searchStr.length;
    
    while (endIndex < content.length && braceCount > 0) {
      if (content[endIndex] === '{') {
        braceCount++;
      } else if (content[endIndex] === '}') {
        braceCount--;
      }
      endIndex++;
    }
    
    // 添加替换内容
    result += replacement;
    
    // 更新位置为结束大括号之后
    pos = endIndex;
  }
  
  return result;
}

function runDir(dir: string) {
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      runDir(filePath);
    } else if (file.endsWith('.gradle')) {
      const content = readFileSync(filePath, 'utf-8');
      const updatedContent = replaceRepositoriesBlocks(content, gradleNewRepositories);
      writeFileSync(filePath, updatedContent);
    } else if (file.endsWith('gradle.kts')) {
      const content = readFileSync(filePath, 'utf-8');
      const updatedContent = replaceRepositoriesBlocks(content, kotlinNewRepositories);
      writeFileSync(filePath, updatedContent);
    }
  }
}

runDir('node_modules');