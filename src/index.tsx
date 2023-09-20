import { build } from "bun";
import { buildMarkdownFiles } from "./macros/build-markdown-files.tsx" with {type: 'macro'};
import {Hono} from "hono";
import {serveStatic} from "hono/bun";

import pageTemplate from "./page-template.tsx";

const app = new Hono();

app.use("/public/*", serveStatic({root: "./"}));

app.use(
  "/docs/*",
  serveStatic({
    rewriteRequestPath: (p) => {
      return `${p.replace("/docs", "/docs-html")}${p.includes(".") ? "" :  ".html"}`
    }
  })
)

app.get("/", async (c) =>
  c.html(
    pageTemplate(
    <div>
      <ul>
          {(await buildMarkdownFiles()).map((f) => (
            <li> 
              <a href={`/docs/${f}`}>{f}</a>
            </li>
          ))}
      </ul>
    </div>
    )
  )
);


export default app;