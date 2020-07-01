const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const debugging = require("./src/utils/debugging");
const seo = require("./src/utils/seo");
const excerpts = require("./src/utils/excerpts");
const markdown = require("./src/utils/markdown");
const tweet = require("./src/utils/tweet");
const { loadFilters } = require("./src/utils/filters");
const htmlMinTransform = require("./src/utils/html-min-transform.js");
const embedYouTube = require("eleventy-plugin-youtube-embed");

module.exports = function (eleventyConfig) {
  // we need site/includes/packs.njk to be ignored in git
  // however, we still need it to watched for changes.
  // the .eleventyignore is used to tell Eleventy what to ignore
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy("jpeg");
  eleventyConfig.addPassthroughCopy("jpg");
  eleventyConfig.addPassthroughCopy("png");

  const markdownIt = require("markdown-it");
  const markdownItEmoji = require("markdown-it-emoji");
  const markdownItFootnotes = require("markdown-it-footnote");
  const options = {
    html: true,
    breaks: true,
    linkify: false,
  };

  eleventyConfig.addPlugin(embedYouTube);

  const md = markdownIt(options).use(markdownItEmoji).use(markdownItFootnotes);

  eleventyConfig.setLibrary("md", md);

  markdown(eleventyConfig, md);
  debugging(eleventyConfig);
  seo(eleventyConfig);
  tweet(eleventyConfig);
  // excerptMinimumLength = 1 ensures just the first paragraph
  excerpts(eleventyConfig, { excerptMinimumLength: 1 });
  loadFilters(eleventyConfig);

  eleventyConfig.addTransform("twitter-names", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      return content.replace(
        /(^|\s)@(\w+)(|'\W|$)/g,
        " <a href='https://twitter.com/$2'>@$2</a>"
      );
    }

    return content;
  });

  eleventyConfig.addTransform("move-footnotes", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      const footnoteRegex = /(<hr class="footnotes-sep">\n<section class="footnotes">[\s\S]+<\/section>)/m;
      const newFootnoteLocationRegex = /<!--FOOTNOTES-->/;
      let newLocation = content.match(newFootnoteLocationRegex);
      let footnote = content.match(footnoteRegex);
      if (newLocation && footnote) {
        return content
          .replace(footnoteRegex, "")
          .replace(newFootnoteLocationRegex, footnote[0]);
      }
    }

    return content;
  });

  if (process.env.ELEVENTY_ENV === "production") {
    eleventyConfig.addTransform("htmlmin", htmlMinTransform);
  }

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("default", "layouts/default.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");

  eleventyConfig.addCollection("feed", (collection) => {
    return collection
      .getFilteredByTag("post")
      .reverse()
      .filter((post) => post.data.draft !== true)
      .slice(0, 20);
  });

  eleventyConfig.addCollection("links", (collection) => {
    return collection.getFilteredByTag("link").reverse();
  });

  eleventyConfig.addCollection("publishedPosts", (collection) => {
    return collection
      .getFilteredByTag("post")
      .reverse()
      .filter((post) => post.data.draft !== true);
  });

  eleventyConfig.addCollection("keyboards", (collection) => {
    return collection
      .getFilteredByTag("keeb")
      .reverse()
      .filter((post) => post.data.draft !== true);
  });

  // move to head so that it does not interfere
  // with turbolinks in development
  eleventyConfig.setBrowserSyncConfig({
    // show 404s in dev. Borrowed from eleventy blog starter
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("dist/404.html");

        browserSync.addMiddleware("*", (_, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    // scripts in body conflict with Turbolinks
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return snippet + match;
        },
      },
    },
  });

  return {
    dir: { input: "site", output: "dist", data: "_data", includes: "includes" },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "css", "html", "yml", "png", "jpeg", "jpg"],
    htmlTemplateEngine: "njk",
  };
};
