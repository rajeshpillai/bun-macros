import { build } from "bun";
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
)

app.get("/", async (c) =>
  c.html(
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
);


export default app;