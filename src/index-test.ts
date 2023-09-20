
const docsDir = `${process.cwd()}/docs`;
const fd = await Bun.file(`${docsDir}/hello.md`);
const content = await fd.text();

console.log(content);