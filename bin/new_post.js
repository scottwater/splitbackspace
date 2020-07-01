const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const argv = process.argv;
const type = argv[2];
const fileName = argv[3];

if (type && fileName && ["post", "short", "link"].includes(type)) {
  const frontMatter = `
---
title:
date: ${new Date().toISOString()}
uuid: ${uuidv4()}
${type === "link" ? "source_url:" : ""}
`.trim();
  const filePath = `site/${type}/${fileName}.md`;
  fs.writeFile(filePath, `${frontMatter}\n---\n`, (err) => {
    if (err) {
      console.log(err);
    } else {
      var spawn = require("child_process").spawn;
      spawn("code", [filePath]);
    }
  });
} else {
  console.log(
    "You must specify a type and file name. Type must be post, short, or link"
  );
}
