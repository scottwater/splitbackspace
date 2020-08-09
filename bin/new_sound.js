const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const argv = process.argv;
const board = argv[2];

const frontMatter = `
---
title:
date: ${new Date().toISOString()}
uuid: ${uuidv4()}
keywords: Mechanical Keyboard, Sound Test, Sound Profile
layout: layouts/playlist
previewImage: /assets/images/posts/undraw_sound.png
`.trim();

const jsonData = `{
  "tracks": [
    {
      "src": "https://d3aa8b1gak9v1d.cloudfront.net/sounds/",
      "message": "Track 1"
    },
    {
      "src": "https://d3aa8b1gak9v1d.cloudfront.net/sounds/",
      "message": "Track 2"
    }
  ]
}`;

const jsonFilePath = `site/posts/${board}.json`;
fs.writeFile(jsonFilePath, `${jsonData}`, (err) => {
  if (err) {
    console.log(err);
  }
});

const filePath = `site/posts/${board}.md`;
fs.writeFile(filePath, `${frontMatter}\n---\n`, (err) => {
  if (err) {
    console.log(err);
  } else {
    var spawn = require("child_process").spawn;
    spawn("code", [filePath]);
  }
});
