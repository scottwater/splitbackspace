const { removeTrailingSlash } = require("./filters");

module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode("tweet", doc => createTweet(doc));

  function createTweet(doc) {
    const baseContent = `${doc.data.title} - ${doc.data["excerpt"] ||
      doc.templateContent}`;

    const contentWithNoTags = removeTags(baseContent);

    const truncatedContent = truncate(contentWithNoTags, 260);

    const baseUrl = process.env.URL || "https://scottw.com";

    const url = removeTrailingSlash(`${baseUrl}${doc.url}`);
    return `${truncatedContent} ${url}`;
  }

  function truncate(content, numberOfChars) {
    if (content.length <= numberOfChars) {
      return content.replace(/(\r\n|\n|\r)/gm, "");
    }
    var subString = content
      .replace(/(\r\n|\n|\r)/gm, "")
      .substr(0, numberOfChars - 4);
    return `${subString.substr(0, subString.lastIndexOf(" "))}...`;
  }

  function removeTags(content) {
    if (content === "") {
      return "";
    }

    return content.replace(
      /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi,
      ""
    );
  }
};
