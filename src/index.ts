import { buildMarkdownFiles } from "./macros/build-markdown-files.ts" with {type: 'macro'};
import {Hono} from "hono";
import {serveStatic} from "hono/bun";

const app = new Hono();

app.use(
  "/docs/*",
  serveStatic({
    rewriteRequestPath: (p) => {
      return `${p.replace("/docs", "/docs-html")}${p.includes(".") ? "" :  ".html"}`
    }
  })
);

export default app;