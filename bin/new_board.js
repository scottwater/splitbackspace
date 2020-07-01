const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const argv = process.argv;
const board = argv[2];

const frontMatter = `
---
title:
date: ${new Date().toISOString()}
uuid: ${uuidv4()}
keywords: Mechanical Keyboard,
image: /assets/images/gordons/${board}/1.jpeg
`.trim();

const jsonData = `{
  "images": [
    {
      "img": "1.jpeg",
      "alt": "The Board",
      "desc": "Money shot"
    }
  ]
}`;

const jsonFilePath = `site/keeb/${board}.json`;
fs.writeFile(jsonFilePath, `${jsonData}`, (err) => {
  if (err) {
    console.log(err);
  }
});

const filePath = `site/keeb/${board}.md`;
fs.writeFile(filePath, `${frontMatter}\n---\n`, (err) => {
  if (err) {
    console.log(err);
  } else {
    var spawn = require("child_process").spawn;
    spawn("code", [filePath]);
  }
});
