import {HtmlEscapedString} from "hono/utils/html";

export default (content: HtmlEscapedString) => {
  return (
    <html>
      <head>
        <title>Docs</title> 
        <link rel="stylesheet" href="/public/styles.css" />
        <script src="/public/htmx.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
        <meta name="view-transition" content="same-origin" />
      </head>
      <body class="mx-auto max-w-5xl bg-black text-white text-3xl" htmx-boost="true">
        <div class="mb-4 border-gray-700 border-b-2">
          <a href="/">Home</a>
        </div>
        <div>
          {content}
        </div>
      </body>
    </html>
  );
}