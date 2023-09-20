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
      <button hx-target="#module-sizes" hx-get="/node-module-sizes" hx-trigger="click" class ="btn btn-primary">
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
          <div class="flex items-center text-xs gap-2 my-2">
            {/* Module Name */}
            <div class="flex-none w-1/4 truncate">{module}</div> 
            
            {/* Progress Bar */}
            <div class="flex-grow bg-gray-200 rounded-full dark:bg-gray-700 relative h-5">
                <div 
                    class="absolute left-0 top-0 h-full bg-blue-600 rounded-full" 
                    style={{width: `${percent}%`}}
                ></div>
            </div>
            
            {/* Percentage */}
            <div class="flex-none w-1/6 pl-2">
                {percent}%
            </div>

            {/* Size */}
            <div class="flex-none w-1/4 pl-2">
                {size}
            </div>
          </div>
        ))}
      </div>
    ))
);


export default app;