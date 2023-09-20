const fs = require('fs');
const fsPromises = require('fs/promises');

import {parse} from "marked";

export async function buildMarkdownFiles() {
  const docsDir = `${process.cwd()}/docs`;
  console.log("docsDir: ", docsDir);
  
  // create directory for html
  const docsHtmlDir = `${process.cwd()}/docs-html`;
  if (!fs.existsSync(docsHtmlDir)) {
    fs.mkdirSync(docsHtmlDir);
  }
  
  const pages = [];
  
  for (const file of fs.readdirSync(docsDir)) {
    console.log(`Processing ${file}...`);
    if (file.endsWith(".md")) {
      const baseName = file.replace(".md", "");
      pages.push(baseName);
  
      // Read the md file
      try {
        const md = await fsPromises.readFile(`${docsDir}/${file}`, 'utf8');
        console.log("FILE CONTENT: ", md);
        const content = parse(md);
        await fsPromises.writeFile(`${docsHtmlDir}/${baseName}.html`, content);
      } catch(e) {
        console.error("ERROR CATCH: ", e);
      }
    } else {
      // Non md file (images etc)
      fs.copyFileSync(`${docsDir}/${file}`, `${docsHtmlDir}/${file}`);
    }
  }
  return pages;
}


