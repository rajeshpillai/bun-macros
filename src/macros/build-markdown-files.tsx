const fs = require('fs');
const fsPromises = require('fs/promises');

import {parse} from "marked";

import pageTemplate from "../page-template.tsx";

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
        console.log(`About to read file ${docsDir}/${file} begins...`);
        const md = await fsPromises.readFile(`${docsDir}/${file}`, 'utf8');
        console.log(`Parsing file ${docsDir}/${file} begins...`);
        const content = parse(md);
        const parsedHTML = pageTemplate(
          <div class="mx-auto prose prose-invert"
            dangerouslySetInnerHTML={{__html: content}}>
          </div>
        );

        await fsPromises.writeFile(`${docsHtmlDir}/${baseName}.html`, 
          parsedHTML.toString()
        );
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


