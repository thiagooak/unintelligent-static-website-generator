import {
  readFileStrSync,
  walkSync,
  writeFileStrSync,
} from "https://deno.land/std/fs/mod.ts";
import { Marked } from "https://deno.land/x/markdown/mod.ts";

let header = readFileStrSync("./templates/header.html");
const footer = readFileStrSync("./templates/footer.html");

const notesPath = "./notes/";
const distPath = "./dist/";

for (
  const sourceFile of walkSync(notesPath, { maxDepth: 1, includeDirs: false })
) {
  console.log(sourceFile.name);

  const targetFilePath = distPath + sourceFile.name.replace(".md", ".html");

  const html = header + Marked.parse(readFileStrSync(sourceFile.path)) + footer;

  writeFileStrSync(targetFilePath, html);
}
