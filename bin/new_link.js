const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const argv = process.argv;
const fileName = argv[2];
const link = argv[3] || "";

const frontMatter = `
---
title:
date: ${new Date().toISOString()}
uuid: ${uuidv4()}
source_url: ${link}
`.trim();
const filePath = `site/link/${fileName}.md`;
fs.writeFile(filePath, `${frontMatter}\n---\n`, (err) => {
  if (err) {
    console.log(err);
  } else {
    var spawn = require("child_process").spawn;
    spawn("code", [filePath]);
  }
});
