import { build } from "bun";
import {Hono} from "hono";
import {serveStatic} from "hono/bun";
import { buildMarkdownFiles } from "./macros/build-markdown-files.tsx" with {type: 'macro'};
import { getNodeModuleSizes } from "./macros//get-node-modules-size.ts" with {type: 'macro'};

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
      <button hx-target="#module-sizes" hx-get="/node-module-sizes" hx-trigger="click">
          Get Module Sizes
      </button>
      <div id="module-sizes"></div>
    </div>
    )
  )
);

app.get("/node-module-sizes", async (c) => 
    c.html((
      <div class="max-w-lg">
        {(await getNodeModuleSizes()).map(({size, module, percent}) => (
          <div class="flex text-xs gap-2 my-1">
            <div class="flex-[0-5]">{module}</div> 
            <div class="flex-[0-3] w-full bg-gray-200 rounded-full dark:bg-gray-700">
              <div class="bg-blue-600 font-medium text-blue-100 text-center p-0.5 leading-none">
                {/* You might want to display the 'percent' or some other value here */}
                {size}
              </div>
              <div class="flex-[0-2]">
                {size}
              </div>
            </div>
          </div>
        ))}
      </div>
    ))
);



export default app;