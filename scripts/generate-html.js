import fs from "node:fs";
import path from "node:path";

const clientDir = path.resolve("dist/client");
const assetsDir = path.join(clientDir, "assets");

if (fs.existsSync(clientDir) && fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  
  const cssLinks = files
    .filter((f) => f.endsWith(".css"))
    .map((f) => `    <link rel="stylesheet" href="/assets/${f}">`)
    .join("\n");
    
  const jsScripts = files
    .filter((f) => f.endsWith(".js") && (f.startsWith("index") || f.startsWith("routes") || f.startsWith("router") || f.startsWith("start")))
    .map((f) => `    <script type="module" src="/assets/${f}"></script>`)
    .join("\n");

  const htmlContent = `<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MSAR — Maritime Search & Rescue Intelligence</title>
    <link rel="icon" href="/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
${cssLinks}
  </head>
  <body class="dark bg-abyss text-foreground min-h-screen">
    <div id="root"></div>
${jsScripts}
  </body>
</html>
`;

  fs.writeFileSync(path.join(clientDir, "index.html"), htmlContent);
  console.log("Successfully generated dist/client/index.html for Vercel deployment!");
} else {
  console.error("dist/client or dist/client/assets directory does not exist.");
}
